// Google Cloud Vision OCR 서비스
import AsyncStorage from '@react-native-async-storage/async-storage';

const OCR_CONFIG_KEY = '@golf_diary_ocr_config';

// OCR 설정 저장
export const saveOCRConfig = async (config) => {
  try {
    await AsyncStorage.setItem(OCR_CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('OCR 설정 저장 실패:', error);
    return false;
  }
};

// OCR 설정 불러오기
export const loadOCRConfig = async () => {
  try {
    const config = await AsyncStorage.getItem(OCR_CONFIG_KEY);
    return config ? JSON.parse(config) : null;
  } catch (error) {
    console.error('OCR 설정 불러오기 실패:', error);
    return null;
  }
};

// 이미지를 Base64로 변환
const imageToBase64 = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('이미지 변환 실패:', error);
    throw error;
  }
};

// Google Cloud Vision OCR API 호출
export const recognizeScorecard = async (imageUri) => {
  const config = await loadOCRConfig();

  if (!config || !config.apiKey) {
    throw new Error('OCR API 설정이 필요합니다. 설정에서 Google API 키를 입력해주세요.');
  }

  try {
    const base64Image = await imageToBase64(imageUri);

    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    };

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OCR API 오류: ${errorData.error?.message || response.status}`);
    }

    const result = await response.json();
    return parseGoogleVisionResult(result);
  } catch (error) {
    console.error('OCR 인식 실패:', error);
    throw error;
  }
};

// Google Vision OCR 결과에서 골프 스코어 추출
const parseGoogleVisionResult = (visionResult) => {
  // 기본 파 설정
  const defaultPars = [4, 5, 4, 3, 4, 4, 4, 3, 5, 4, 4, 3, 4, 3, 5, 4, 4, 5];
  const scores = Array(18).fill(null);
  const pars = [...defaultPars];

  if (!visionResult.responses || !visionResult.responses[0]) {
    return { scores, pars, rawText: '' };
  }

  const textAnnotations = visionResult.responses[0].textAnnotations;
  if (!textAnnotations || textAnnotations.length === 0) {
    return { scores, pars, rawText: '' };
  }

  // 전체 텍스트 (첫 번째 항목)
  const fullText = textAnnotations[0].description || '';
  console.log('OCR 전체 텍스트:', fullText);

  // 개별 단어들에서 숫자 추출
  const numbers = [];
  for (let i = 1; i < textAnnotations.length; i++) {
    const text = textAnnotations[i].description.trim();
    // -1, -2 같은 음수나 일반 숫자 인식
    if (/^-?\d+$/.test(text)) {
      numbers.push(parseInt(text));
    }
    // 체크 표시는 0으로 처리 (파)
    if (text === '✓' || text === '√' || text === 'v' || text === 'V' || text === '0') {
      numbers.push(0);
    }
  }

  console.log('인식된 숫자들:', numbers);

  // 골프존 스코어카드 패턴 분석
  // 파 대비 숫자: -3(알바) ~ +10 범위
  let scoreNumbers = numbers.filter(n => n >= -3 && n <= 10);

  // Par 값들 (3, 4, 5) 찾기
  let parNumbers = numbers.filter(n => n >= 3 && n <= 5);

  // 연속된 9개의 파 값이 있으면 파 배열로 사용
  if (parNumbers.length >= 9) {
    for (let i = 0; i < Math.min(parNumbers.length, 18); i++) {
      if (parNumbers[i] >= 3 && parNumbers[i] <= 5) {
        pars[i] = parNumbers[i];
      }
    }
  }

  // 파 대비 스코어를 실제 타수로 변환
  let scoreIndex = 0;
  for (let i = 0; i < scoreNumbers.length && scoreIndex < 18; i++) {
    const diff = scoreNumbers[i];
    // 파 대비 숫자가 유효한 범위면
    if (diff >= -3 && diff <= 10) {
      scores[scoreIndex] = pars[scoreIndex] + diff;
      scoreIndex++;
    }
  }

  return {
    scores,
    pars,
    rawText: fullText,
    recognizedCount: scores.filter(s => s !== null).length
  };
};
