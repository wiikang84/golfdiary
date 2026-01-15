// 골프 프리미엄 테마 - 럭셔리하고 세련된 디자인
export const COLORS = {
  // 메인 컬러 (클래식 골프 그린 계열)
  primary: '#1B5E20',      // 마스터스 그린
  primaryLight: '#2E7D32', // 페어웨이 그린
  primaryDark: '#0D3B11',  // 딥 포레스트

  // 세컨더리 (네이비 계열 - 고급스러움)
  secondary: '#1A237E',    // 딥 네이비
  secondaryLight: '#3949AB',

  // 배경 (아이보리/크림 계열 - 고급스러운 느낌)
  background: '#FAFAFA',
  backgroundGray: '#F5F5F5',
  backgroundCream: '#FFFEF7',
  cardBg: '#FFFFFF',

  // 텍스트
  textPrimary: '#212121',
  textSecondary: '#616161',
  textMuted: '#9E9E9E',
  textWhite: '#FFFFFF',

  // 프리미엄 악센트
  gold: '#C9A227',         // 클래식 골드
  goldLight: '#FFD54F',    // 밝은 골드
  bronze: '#CD7F32',       // 브론즈
  silver: '#A8A9AD',       // 실버

  // 스코어 색상 (골프 전용)
  scoreEagle: '#7B1FA2',   // 이글 (퍼플)
  scoreBirdie: '#1565C0',  // 버디 (블루)
  scorePar: '#2E7D32',     // 파 (그린)
  scoreBogey: '#F9A825',   // 보기 (옐로우/골드)
  scoreDouble: '#EF6C00',  // 더블보기 (오렌지)
  scoreTriple: '#C62828',  // 트리플+ (레드)

  // 상태 색상
  success: '#43A047',
  warning: '#FFA000',
  error: '#E53935',
  info: '#1E88E5',

  // 기타
  border: '#E0E0E0',
  shadow: 'rgba(0,0,0,0.12)',
  divider: '#EEEEEE',
  overlay: 'rgba(0,0,0,0.5)',
};

// 스코어별 스타일 가져오기 헬퍼
export const getScoreColor = (score, par) => {
  const diff = score - par;
  if (diff <= -2) return { bg: COLORS.scoreEagle, text: '#FFF', label: '이글' };
  if (diff === -1) return { bg: COLORS.scoreBirdie, text: '#FFF', label: '버디' };
  if (diff === 0) return { bg: COLORS.scorePar, text: '#FFF', label: '파' };
  if (diff === 1) return { bg: COLORS.scoreBogey, text: '#FFF', label: '보기' };
  if (diff === 2) return { bg: COLORS.scoreDouble, text: '#FFF', label: '더블' };
  return { bg: COLORS.scoreTriple, text: '#FFF', label: '트리플+' };
};

export const FONTS = {
  // 큰 제목
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  // 중간 제목
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  // 본문
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  // 작은 텍스트
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  // 아주 작은 텍스트
  small: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textMuted,
  },
  // 숫자 (스코어 등)
  number: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

// 그라데이션 프리셋 (react-native-linear-gradient 사용시)
export const GRADIENTS = {
  primary: ['#1B5E20', '#2E7D32'],
  gold: ['#C9A227', '#FFD54F'],
  premium: ['#1A237E', '#3949AB'],
  sunset: ['#FF6B35', '#F9A825'],
  dark: ['#212121', '#424242'],
};
