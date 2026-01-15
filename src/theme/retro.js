// 슈퍼마리오 스타일 레트로 테마
export const COLORS = {
  // 메인 색상
  sky: '#5C94FC',        // 하늘색 배경
  grass: '#00A800',      // 잔디 녹색
  darkGrass: '#008000',  // 진한 녹색
  brick: '#C84C0C',      // 벽돌 갈색
  block: '#FAC000',      // ? 블록 노랑
  coin: '#FFD700',       // 코인 골드
  pipe: '#00A800',       // 파이프 녹색

  // UI 색상
  white: '#FCFCFC',
  black: '#000000',
  red: '#F83800',
  blue: '#0078F8',
  darkBlue: '#0058A8',

  // 배경
  bgDark: '#000000',
  bgLight: '#5C94FC',

  // 텍스트
  textLight: '#FCFCFC',
  textDark: '#000000',
  textGold: '#FAC000',

  // 상태 색상
  success: '#00A800',
  warning: '#FAC000',
  error: '#F83800',
  info: '#0078F8',
};

export const PIXEL_BORDER = {
  // 픽셀 느낌 테두리 (그림자로 구현)
  boxShadow: `
    4px 0 0 0 #000,
    -4px 0 0 0 #000,
    0 4px 0 0 #000,
    0 -4px 0 0 #000
  `,
};

export const RETRO_STYLES = {
  // 픽셀 박스 스타일
  pixelBox: {
    backgroundColor: COLORS.block,
    borderWidth: 4,
    borderColor: COLORS.black,
    borderRadius: 0,
  },

  // 벽돌 박스
  brickBox: {
    backgroundColor: COLORS.brick,
    borderWidth: 4,
    borderColor: COLORS.black,
    borderRadius: 0,
  },

  // 파이프 스타일 버튼
  pipeButton: {
    backgroundColor: COLORS.grass,
    borderWidth: 4,
    borderColor: COLORS.black,
    borderRadius: 0,
  },

  // 코인 박스
  coinBox: {
    backgroundColor: COLORS.coin,
    borderWidth: 4,
    borderColor: COLORS.black,
    borderRadius: 0,
  },
};

// 도트 아이콘 (이모지로 대체)
export const PIXEL_ICONS = {
  home: '🏠',
  practice: '⛳',
  round: '🏌️',
  stats: '📊',
  settings: '⚙️',
  star: '⭐',
  coin: '🪙',
  flag: '🚩',
  trophy: '🏆',
  golf: '⛳',
  ball: '🏐',
  club: '🏒',
  sun: '☀️',
  cloud: '☁️',
  rain: '🌧️',
};
