import AsyncStorage from '@react-native-async-storage/async-storage';

// 저장소 키
const STORAGE_KEYS = {
  PRACTICES: '@golf_diary_practices',
  SCREEN_ROUNDS: '@golf_diary_screen_rounds',
  FIELD_ROUNDS: '@golf_diary_field_rounds',
  USER_PROFILE: '@golf_diary_user_profile',
};

// 연습 기록 저장/불러오기
export const savePractices = async (practices) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PRACTICES, JSON.stringify(practices));
    return true;
  } catch (error) {
    console.error('연습 기록 저장 실패:', error);
    return false;
  }
};

export const loadPractices = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PRACTICES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('연습 기록 불러오기 실패:', error);
    return [];
  }
};

// 스크린 라운드 저장/불러오기
export const saveScreenRounds = async (rounds) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SCREEN_ROUNDS, JSON.stringify(rounds));
    return true;
  } catch (error) {
    console.error('스크린 라운드 저장 실패:', error);
    return false;
  }
};

export const loadScreenRounds = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SCREEN_ROUNDS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('스크린 라운드 불러오기 실패:', error);
    return [];
  }
};

// 필드 라운드 저장/불러오기
export const saveFieldRounds = async (rounds) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FIELD_ROUNDS, JSON.stringify(rounds));
    return true;
  } catch (error) {
    console.error('필드 라운드 저장 실패:', error);
    return false;
  }
};

export const loadFieldRounds = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FIELD_ROUNDS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('필드 라운드 불러오기 실패:', error);
    return [];
  }
};

// 모든 데이터 삭제 (초기화용)
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch (error) {
    console.error('데이터 삭제 실패:', error);
    return false;
  }
};

// 통계 계산
export const calculateStats = async () => {
  const practices = await loadPractices();
  const screenRounds = await loadScreenRounds();
  const fieldRounds = await loadFieldRounds();

  const allRounds = [...screenRounds, ...fieldRounds];
  const scores = allRounds.map(r => parseInt(r.score)).filter(s => !isNaN(s));
  const totalPracticeTime = practices.reduce((sum, p) => sum + (parseInt(p.practiceTime) || 0), 0);

  return {
    totalPractices: practices.length,
    totalPracticeTime,
    totalPracticeHours: Math.floor(totalPracticeTime / 60),
    totalScreenRounds: screenRounds.length,
    totalFieldRounds: fieldRounds.length,
    avgScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    bestScore: scores.length > 0 ? Math.min(...scores) : null,
  };
};

// 레벨 계산 (20시간 = 1200분당 레벨 1 상승)
export const calculateLevel = async () => {
  const practices = await loadPractices();
  const totalMinutes = practices.reduce((sum, p) => sum + (parseInt(p.practiceTime) || 0), 0);
  const totalHours = totalMinutes / 60;
  const level = Math.floor(totalHours / 20) + 1; // 20시간당 1레벨, 최소 1레벨
  const hoursInCurrentLevel = totalHours % 20;
  const progressPercent = (hoursInCurrentLevel / 20) * 100;

  return {
    level,
    totalHours: Math.floor(totalHours),
    totalMinutes,
    hoursInCurrentLevel: Math.floor(hoursInCurrentLevel),
    hoursToNextLevel: 20 - Math.floor(hoursInCurrentLevel),
    progressPercent: Math.round(progressPercent),
  };
};

// 레벨 타이틀 가져오기
export const getLevelTitle = (level) => {
  if (level <= 1) return '초보 골퍼';
  if (level <= 3) return '입문 골퍼';
  if (level <= 5) return '아마추어';
  if (level <= 10) return '중급 골퍼';
  if (level <= 15) return '상급 골퍼';
  if (level <= 20) return '세미프로';
  if (level <= 30) return '프로 골퍼';
  if (level <= 50) return '마스터';
  return '레전드';
};

// 월별 연습 데이터 가져오기 (캘린더용)
export const getMonthlyPractices = async (year, month) => {
  const practices = await loadPractices();

  // 해당 월의 연습 데이터 필터링
  const monthlyData = {};

  practices.forEach(practice => {
    // 날짜 파싱 (예: "2025. 1. 15." 형식)
    const dateParts = practice.date.replace(/\./g, '').trim().split(' ').filter(p => p);
    if (dateParts.length >= 3) {
      const pYear = parseInt(dateParts[0]);
      const pMonth = parseInt(dateParts[1]);
      const pDay = parseInt(dateParts[2]);

      if (pYear === year && pMonth === month) {
        if (!monthlyData[pDay]) {
          monthlyData[pDay] = { totalTime: 0, count: 0 };
        }
        monthlyData[pDay].totalTime += parseInt(practice.practiceTime) || 0;
        monthlyData[pDay].count += 1;
      }
    }
  });

  return monthlyData;
};

// 이번 주 통계
export const getWeeklyStats = async () => {
  const practices = await loadPractices();
  const screenRounds = await loadScreenRounds();
  const fieldRounds = await loadFieldRounds();

  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const isThisWeek = (dateStr) => {
    const dateParts = dateStr.replace(/\./g, '').trim().split(' ').filter(p => p);
    if (dateParts.length >= 3) {
      const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
      return date >= weekAgo && date <= today;
    }
    return false;
  };

  const weekPractices = practices.filter(p => isThisWeek(p.date));
  const weekScreenRounds = screenRounds.filter(r => isThisWeek(r.date));
  const weekFieldRounds = fieldRounds.filter(r => isThisWeek(r.date));

  return {
    practiceCount: weekPractices.length,
    practiceTime: weekPractices.reduce((sum, p) => sum + (parseInt(p.practiceTime) || 0), 0),
    screenRoundCount: weekScreenRounds.length,
    fieldRoundCount: weekFieldRounds.length,
  };
};
