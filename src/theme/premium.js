// 골프 프리미엄 테마 - 고급스럽고 가독성 좋은 디자인
export const COLORS = {
  // 메인 컬러
  primary: '#1B5E20',      // 진한 골프 그린
  primaryLight: '#4CAF50', // 밝은 그린
  primaryDark: '#0D3B11',  // 더 진한 그린

  // 배경
  background: '#FFFFFF',
  backgroundGray: '#F8F9FA',
  cardBg: '#FFFFFF',

  // 텍스트
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textMuted: '#999999',
  textWhite: '#FFFFFF',

  // 악센트
  gold: '#D4AF37',         // 골드 (프리미엄 느낌)
  accent: '#FF6B35',       // 포인트 오렌지

  // 상태 색상
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // 기타
  border: '#E0E0E0',
  shadow: 'rgba(0,0,0,0.1)',
  divider: '#EEEEEE',
};

export const FONTS = {
  // 큰 제목
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  // 중간 제목
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  // 본문
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textPrimary,
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};
