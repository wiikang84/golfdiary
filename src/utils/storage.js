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

  return {
    totalPractices: practices.length,
    totalPracticeTime: practices.reduce((sum, p) => sum + (parseInt(p.practiceTime) || 0), 0),
    totalScreenRounds: screenRounds.length,
    totalFieldRounds: fieldRounds.length,
    avgScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    bestScore: scores.length > 0 ? Math.min(...scores) : null,
  };
};
