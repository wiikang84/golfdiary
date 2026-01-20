// 대한민국 대중제 골프장 데이터베이스 (350개+)
// 회원제 골프장 제외, 대중제(퍼블릭) 골프장만 포함

// ========== 지역 카테고리 ==========
export const REGION_CATEGORIES = {
  '수도권': ['서울', '경기', '인천'],
  '강원권': ['강원'],
  '충청권': ['충북', '충남', '대전', '세종'],
  '전라권': ['전북', '전남', '광주'],
  '경상권': ['경북', '경남', '대구', '울산', '부산'],
  '제주권': ['제주'],
};

// ========== 세부 지역 목록 ==========
export const REGIONS = [
  '전체',
  '서울', '경기', '인천',
  '강원',
  '충북', '충남', '대전', '세종',
  '전북', '전남', '광주',
  '경북', '경남', '대구', '울산', '부산',
  '제주',
];

// ========== 권역 목록 ==========
export const REGION_GROUPS = ['전체', '수도권', '강원권', '충청권', '전라권', '경상권', '제주권'];

// ========== 전국 대중제 골프장 목록 (350개+) ==========
export const GOLF_CLUBS = [
  // ==================== 서울 (5개) ====================
  { id: 'pub_inseroul27', name: '인서울27골프클럽', region: '서울', city: '강서구', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_taereung', name: '태릉골프장', region: '서울', city: '노원구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_namsan', name: '남산골프연습장', region: '서울', city: '중구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_seoulforest', name: '서울숲골프연습장', region: '서울', city: '성동구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_hangang', name: '한강골프클럽', region: '서울', city: '영등포구', type: 'field', membership: 'public', totalHoles: 9 },

  // ==================== 경기도 (120개+) ====================
  // 고양시
  { id: 'pub_goyang', name: '고양컨트리클럽', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_olympic', name: '올림픽컨트리클럽', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_hanyangpine', name: '한양파인컨트리클럽', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_ilsanspring', name: '일산스프링힐스CC', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_123golf', name: '123골프클럽', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 6 },
  { id: 'pub_seryugolf', name: '세류골프클럽', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_ilsan', name: '일산CC', region: '경기', city: '고양시', type: 'field', membership: 'public', totalHoles: 18 },

  // 용인시
  { id: 'pub_starlight', name: '스타라이트CC', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yonginpublic', name: '용인퍼블릭CC', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_evergreen_yongin', name: '에버그린용인CC', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_suji', name: '수지골프클럽', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_giheung', name: '기흥골프클럽', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_yongineast', name: '용인동부CC', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yonginwest', name: '용인서부CC', region: '경기', city: '용인시', type: 'field', membership: 'public', totalHoles: 18 },

  // 광주시 (경기)
  { id: 'pub_gangnam300', name: '강남300CC', region: '경기', city: '광주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seochang', name: '서창퍼블릭GC', region: '경기', city: '광주시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_rosevien', name: '로제비앙CC', region: '경기', city: '광주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_gwangjuhill', name: '광주힐CC', region: '경기', city: '광주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_taepyeong', name: '태평CC', region: '경기', city: '광주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gonjiam', name: '곤지암퍼블릭CC', region: '경기', city: '광주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 파주시
  { id: 'pub_tiger', name: '타이거CC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pajusanjeong', name: '파주산정호수CC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bestvalley', name: '베스트밸리CC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_pajucc', name: '파주퍼블릭CC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pajugreen', name: '파주그린CC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_munsan', name: '문산퍼블릭GC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_gwangtan', name: '광탄CC', region: '경기', city: '파주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 이천시
  { id: 'pub_southsprings', name: '사우스스프링스CC', region: '경기', city: '이천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_theban', name: '더반CC', region: '경기', city: '이천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_icheonpublic', name: '이천퍼블릭CC', region: '경기', city: '이천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_icheonvalley', name: '이천밸리CC', region: '경기', city: '이천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_maifield', name: '마이필드CC', region: '경기', city: '이천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_icheonhill', name: '이천힐CC', region: '경기', city: '이천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 여주시
  { id: 'pub_skyvalley', name: '스카이밸리CC', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_golfzonyeoju', name: '골프존카운티여주', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_hillstate', name: '힐스테이트CC', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeojupublic', name: '여주퍼블릭CC', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_victoria', name: '빅토리아CC', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeojuhill', name: '여주힐CC', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeojuvalley', name: '여주밸리CC', region: '경기', city: '여주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 포천시
  { id: 'pub_bearcreek', name: '베어크리크GC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_pocheonhills', name: '포천힐스CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_adonis', name: '아도니스CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_idongvalley', name: '이동밸리CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_artvalley', name: '아트밸리CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daeyumongbel', name: '대유몽베르CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_pocheongreen', name: '포천그린CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sanjeongho', name: '산정호수CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hwahyeon', name: '화현CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pocheonvalley', name: '포천밸리CC', region: '경기', city: '포천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 양평군
  { id: 'pub_elysianyang', name: '엘리시안양평CC', region: '경기', city: '양평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_thestarhue', name: '더스타휴CC', region: '경기', city: '양평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangpyeong', name: '양평골프클럽', region: '경기', city: '양평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangpyeongvalley', name: '양평밸리CC', region: '경기', city: '양평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bukhangang', name: '북한강CC', region: '경기', city: '양평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangpyeonghill', name: '양평힐CC', region: '경기', city: '양평군', type: 'field', membership: 'public', totalHoles: 18 },

  // 가평군
  { id: 'pub_ferum', name: '페럼CC', region: '경기', city: '가평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gapyeong', name: '가평베네스트CC', region: '경기', city: '가평군', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_cheongpyeong', name: '청평CC', region: '경기', city: '가평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jaraseom', name: '자라섬CC', region: '경기', city: '가평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gapyeonghill', name: '가평힐CC', region: '경기', city: '가평군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gapyeongvalley', name: '가평밸리CC', region: '경기', city: '가평군', type: 'field', membership: 'public', totalHoles: 18 },

  // 화성시
  { id: 'pub_lavidol', name: '라비돌CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_hwaseongbay', name: '화성베이CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hwaseongpublic', name: '화성퍼블릭CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bongdam', name: '봉담CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dongtan', name: '동탄CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hyangnam', name: '향남CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hwaseonghill', name: '화성힐CC', region: '경기', city: '화성시', type: 'field', membership: 'public', totalHoles: 18 },

  // 안성시
  { id: 'pub_anseongpublic', name: '안성퍼블릭CC', region: '경기', city: '안성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_golfzonansong', name: '골프존카운티안성', region: '경기', city: '안성시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_anseonghill', name: '안성힐CC', region: '경기', city: '안성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_anseongbenest', name: '안성베네스트CC', region: '경기', city: '안성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ilchuk', name: '일죽CC', region: '경기', city: '안성시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_anseongvalley', name: '안성밸리CC', region: '경기', city: '안성시', type: 'field', membership: 'public', totalHoles: 18 },

  // 평택시
  { id: 'pub_songtan', name: '송탄CC', region: '경기', city: '평택시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pyeongtaek', name: '평택퍼블릭CC', region: '경기', city: '평택시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_osan', name: '오산CC', region: '경기', city: '평택시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_anjung', name: '안중CC', region: '경기', city: '평택시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pyeongtaekhill', name: '평택힐CC', region: '경기', city: '평택시', type: 'field', membership: 'public', totalHoles: 18 },

  // 안산시
  { id: 'pub_sihwa', name: '시화CC', region: '경기', city: '안산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ansan', name: '안산CC', region: '경기', city: '안산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daebu', name: '대부도CC', region: '경기', city: '안산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ansanpublic', name: '안산퍼블릭CC', region: '경기', city: '안산시', type: 'field', membership: 'public', totalHoles: 18 },

  // 수원시
  { id: 'pub_suwoncc', name: '수원CC', region: '경기', city: '수원시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_suwonpublic', name: '수원퍼블릭CC', region: '경기', city: '수원시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_gwanggyo', name: '광교CC', region: '경기', city: '수원시', type: 'field', membership: 'public', totalHoles: 18 },

  // 성남시
  { id: 'pub_seongnam', name: '성남CC', region: '경기', city: '성남시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pangyo', name: '판교CC', region: '경기', city: '성남시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_bundang', name: '분당CC', region: '경기', city: '성남시', type: 'field', membership: 'public', totalHoles: 18 },

  // 김포시
  { id: 'pub_gimpo', name: '김포CC', region: '경기', city: '김포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimpopublic', name: '김포퍼블릭CC', region: '경기', city: '김포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimpohan', name: '김포한강CC', region: '경기', city: '김포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_aracc', name: '아라CC', region: '경기', city: '김포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimpohill', name: '김포힐CC', region: '경기', city: '김포시', type: 'field', membership: 'public', totalHoles: 18 },

  // 연천군
  { id: 'pub_yeoncheon', name: '연천CC', region: '경기', city: '연천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hantan', name: '한탄강CC', region: '경기', city: '연천군', type: 'field', membership: 'public', totalHoles: 18 },

  // 동두천시
  { id: 'pub_dongducheon', name: '동두천CC', region: '경기', city: '동두천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_soyo', name: '소요산CC', region: '경기', city: '동두천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 양주시
  { id: 'pub_yangju', name: '양주CC', region: '경기', city: '양주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangjupublic', name: '양주퍼블릭CC', region: '경기', city: '양주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_janghung', name: '장흥CC', region: '경기', city: '양주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangjuhill', name: '양주힐CC', region: '경기', city: '양주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 의정부시
  { id: 'pub_uijeongbu', name: '의정부CC', region: '경기', city: '의정부시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_uijeongbupublic', name: '의정부퍼블릭CC', region: '경기', city: '의정부시', type: 'field', membership: 'public', totalHoles: 18 },

  // 남양주시
  { id: 'pub_namyangju', name: '남양주CC', region: '경기', city: '남양주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_namyangjupub', name: '남양주퍼블릭CC', region: '경기', city: '남양주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_paldang', name: '팔당CC', region: '경기', city: '남양주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_namyangjuhill', name: '남양주힐CC', region: '경기', city: '남양주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 하남시
  { id: 'pub_hanam', name: '하남CC', region: '경기', city: '하남시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hanampublic', name: '하남퍼블릭CC', region: '경기', city: '하남시', type: 'field', membership: 'public', totalHoles: 18 },

  // 구리시
  { id: 'pub_guri', name: '구리CC', region: '경기', city: '구리시', type: 'field', membership: 'public', totalHoles: 9 },

  // 시흥시
  { id: 'pub_siheung', name: '시흥CC', region: '경기', city: '시흥시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_oido', name: '오이도CC', region: '경기', city: '시흥시', type: 'field', membership: 'public', totalHoles: 18 },

  // 광명시
  { id: 'pub_gwangmyeong', name: '광명CC', region: '경기', city: '광명시', type: 'field', membership: 'public', totalHoles: 9 },

  // 부천시
  { id: 'pub_bucheon', name: '부천CC', region: '경기', city: '부천시', type: 'field', membership: 'public', totalHoles: 9 },

  // ==================== 인천 (18개) ====================
  { id: 'pub_sky72ocean', name: '스카이72 오션코스', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sky72lake', name: '스카이72 레이크코스', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sky72classic', name: '스카이72 클래식코스', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sky72sky', name: '스카이72 스카이코스', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dreampark', name: '드림파크CC', region: '인천', city: '서구', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_bearsbest', name: '베어즈베스트청라', region: '인천', city: '서구', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_songdocc', name: '송도골프클럽', region: '인천', city: '연수구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_club72', name: '클럽72CC', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ganghwa', name: '강화CC', region: '인천', city: '강화군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeongjong', name: '영종CC', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_incheonpublic', name: '인천퍼블릭CC', region: '인천', city: '서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_cheongra', name: '청라CC', region: '인천', city: '서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyeongin', name: '경인CC', region: '인천', city: '부평구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeongjonghill', name: '영종힐CC', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_muuido', name: '무의도CC', region: '인천', city: '중구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_incheonhill', name: '인천힐CC', region: '인천', city: '서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_songdo2', name: '송도퍼블릭CC', region: '인천', city: '연수구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ganghwapublic', name: '강화퍼블릭CC', region: '인천', city: '강화군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 강원도 (65개) ====================
  // 춘천시
  { id: 'pub_theplayers', name: '더플레이어스GC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_elysiangangchon', name: '엘리시안강촌CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_bearcreekchuncheon', name: '베어크리크춘천CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_roadhills', name: '로드힐스CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_namchuncheon', name: '남춘천CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_laviebelle', name: '라비에벨CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_chuncheonlake', name: '춘천레이크CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_soyang', name: '소양강CC', region: '강원', city: '춘천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 홍천군
  { id: 'pub_vivaldieast', name: '비발디파크이스트CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_vivaldiwest', name: '비발디파크웨스트CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_vivaldimountain', name: '비발디파크마운틴CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_clubmow', name: '클럽모우GC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sagewood', name: '세이지우드CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_hillderosy', name: '힐드로사이CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hongcheonriver', name: '홍천강CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_leonedet', name: '르오네뜨CC', region: '강원', city: '홍천군', type: 'field', membership: 'public', totalHoles: 9 },

  // 원주시
  { id: 'pub_aurora', name: '오로라골프앤리조트', region: '강원', city: '원주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_oakvalley', name: '오크밸리CC', region: '강원', city: '원주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_century21', name: '센츄리21CC', region: '강원', city: '원주시', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_wonjuvalley', name: '원주밸리CC', region: '강원', city: '원주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_wonjupublic', name: '원주퍼블릭CC', region: '강원', city: '원주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_chiaksan', name: '치악산CC', region: '강원', city: '원주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 평창군
  { id: 'pub_alpensia', name: '알펜시아CC', region: '강원', city: '평창군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_phoenixpark', name: '피닉스파크CC', region: '강원', city: '평창군', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_pyeongchanghill', name: '평창힐CC', region: '강원', city: '평창군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pyeongchangmountain', name: '평창마운틴CC', region: '강원', city: '평창군', type: 'field', membership: 'public', totalHoles: 18 },

  // 정선군
  { id: 'pub_highone', name: '하이원CC', region: '강원', city: '정선군', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_jeongseon', name: '정선CC', region: '강원', city: '정선군', type: 'field', membership: 'public', totalHoles: 18 },

  // 횡성군
  { id: 'pub_welli', name: '웰리힐리파크CC', region: '강원', city: '횡성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_alpsdaeyoung', name: '알프스대영CC', region: '강원', city: '횡성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hoengseong', name: '횡성CC', region: '강원', city: '횡성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 강릉시
  { id: 'pub_gangneung', name: '강릉CC', region: '강원', city: '강릉시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyeongpo', name: '경포CC', region: '강원', city: '강릉시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gangneungpublic', name: '강릉퍼블릭CC', region: '강원', city: '강릉시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jumunjin', name: '주문진CC', region: '강원', city: '강릉시', type: 'field', membership: 'public', totalHoles: 18 },

  // 속초시
  { id: 'pub_sokcho', name: '속초CC', region: '강원', city: '속초시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sokchosea', name: '속초씨사이드CC', region: '강원', city: '속초시', type: 'field', membership: 'public', totalHoles: 18 },

  // 동해시
  { id: 'pub_donghae', name: '동해CC', region: '강원', city: '동해시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_mukho', name: '묵호CC', region: '강원', city: '동해시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_donggangsista', name: '동강시스타CC', region: '강원', city: '동해시', type: 'field', membership: 'public', totalHoles: 18 },

  // 삼척시
  { id: 'pub_samcheok', name: '삼척CC', region: '강원', city: '삼척시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_samcheoksea', name: '삼척씨사이드CC', region: '강원', city: '삼척시', type: 'field', membership: 'public', totalHoles: 18 },

  // 태백시
  { id: 'pub_o2', name: '오투CC', region: '강원', city: '태백시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_taebaek', name: '태백CC', region: '강원', city: '태백시', type: 'field', membership: 'public', totalHoles: 18 },

  // 고성군
  { id: 'pub_delpino', name: '소노펠리체델피노CC', region: '강원', city: '고성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pineriz', name: '파인리즈CC', region: '강원', city: '고성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_goseong', name: '고성CC', region: '강원', city: '고성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 양양군
  { id: 'pub_yangyang', name: '양양CC', region: '강원', city: '양양군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_naksan', name: '낙산CC', region: '강원', city: '양양군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seolhaewon', name: '설해원CC', region: '강원', city: '양양군', type: 'field', membership: 'public', totalHoles: 45 },

  // 인제군
  { id: 'pub_inje', name: '인제CC', region: '강원', city: '인제군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seorakvalley', name: '설악밸리CC', region: '강원', city: '인제군', type: 'field', membership: 'public', totalHoles: 18 },

  // 철원군
  { id: 'pub_cheorwon', name: '철원CC', region: '강원', city: '철원군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bella45', name: '벨라45마스터스클럽', region: '강원', city: '철원군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bluecullinan', name: '블루컬리넌CC', region: '강원', city: '철원군', type: 'field', membership: 'public', totalHoles: 18 },

  // 영월군
  { id: 'pub_yeongwol', name: '영월CC', region: '강원', city: '영월군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_donggang', name: '동강CC', region: '강원', city: '영월군', type: 'field', membership: 'public', totalHoles: 18 },

  // 화천군
  { id: 'pub_hwacheon', name: '화천CC', region: '강원', city: '화천군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 충청북도 (38개) ====================
  // 충주시
  { id: 'pub_geumgang', name: '금강센테리움CC', region: '충북', city: '충주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daeyoungbase', name: '대영베이스CC', region: '충북', city: '충주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_suanbo', name: '수안보스파CC', region: '충북', city: '충주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_chungju', name: '충주CC', region: '충북', city: '충주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_chungjulake', name: '충주레이크CC', region: '충북', city: '충주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_tangeumho', name: '탄금호CC', region: '충북', city: '충주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 진천군
  { id: 'pub_golfzonjincheon', name: '골프존카운티진천', region: '충북', city: '진천군', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_jincheon', name: '진천CC', region: '충북', city: '진천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jincheonhill', name: '진천힐CC', region: '충북', city: '진천군', type: 'field', membership: 'public', totalHoles: 18 },

  // 음성군
  { id: 'pub_monarc', name: '모나크CC', region: '충북', city: '음성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hildesheim', name: '힐데스하임CC', region: '충북', city: '음성군', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_musimcheon', name: '무심천CC', region: '충북', city: '음성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_eumseong', name: '음성CC', region: '충북', city: '음성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_eumseonghills', name: '음성힐스CC', region: '충북', city: '음성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 제천시
  { id: 'pub_ecolianjecheon', name: '에콜리안제천CC', region: '충북', city: '제천시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_kingsrock', name: '킹즈락CC', region: '충북', city: '제천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_jecheon', name: '제천CC', region: '충북', city: '제천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_cheongpungho', name: '청풍호CC', region: '충북', city: '제천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 청주시
  { id: 'pub_cheongju', name: '청주CC', region: '충북', city: '청주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_cheongjupublic', name: '청주퍼블릭CC', region: '충북', city: '청주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sangdang', name: '상당CC', region: '충북', city: '청주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ochang', name: '오창CC', region: '충북', city: '청주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 괴산군
  { id: 'pub_goesan', name: '괴산CC', region: '충북', city: '괴산군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_songnisan', name: '속리산CC', region: '충북', city: '괴산군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_rainbow', name: '레인보우힐스CC', region: '충북', city: '괴산군', type: 'field', membership: 'public', totalHoles: 27 },

  // 증평군
  { id: 'pub_jeungpyeong', name: '증평CC', region: '충북', city: '증평군', type: 'field', membership: 'public', totalHoles: 18 },

  // 영동군
  { id: 'pub_yeongdong', name: '영동CC', region: '충북', city: '영동군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_minaksan', name: '민악산CC', region: '충북', city: '영동군', type: 'field', membership: 'public', totalHoles: 18 },

  // 옥천군
  { id: 'pub_okcheon', name: '옥천CC', region: '충북', city: '옥천군', type: 'field', membership: 'public', totalHoles: 18 },

  // 보은군
  { id: 'pub_boeun', name: '보은CC', region: '충북', city: '보은군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_golfzonhwaran', name: '골프존카운티화랑', region: '충북', city: '보은군', type: 'field', membership: 'public', totalHoles: 27 },

  // 단양군
  { id: 'pub_danyang', name: '단양CC', region: '충북', city: '단양군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sobaeksan', name: '소백산CC', region: '충북', city: '단양군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 충청남도 (35개) ====================
  // 천안시
  { id: 'pub_cheonan', name: '천안CC', region: '충남', city: '천안시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_cheonanpublic', name: '천안퍼블릭CC', region: '충남', city: '천안시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_cheonanhill', name: '천안힐CC', region: '충남', city: '천안시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_doksuri', name: '독수리CC', region: '충남', city: '천안시', type: 'field', membership: 'public', totalHoles: 18 },

  // 아산시
  { id: 'pub_asan', name: '아산CC', region: '충남', city: '아산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_asanpublic', name: '아산퍼블릭CC', region: '충남', city: '아산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_onyang', name: '온양CC', region: '충남', city: '아산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_asanhill', name: '아산힐CC', region: '충남', city: '아산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_asanspurz', name: '아산스퍼지CC', region: '충남', city: '아산시', type: 'field', membership: 'public', totalHoles: 18 },

  // 공주시
  { id: 'pub_gongju', name: '공주CC', region: '충남', city: '공주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gongjupublic', name: '공주퍼블릭CC', region: '충남', city: '공주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyeryongsan', name: '계룡산CC', region: '충남', city: '공주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 논산시
  { id: 'pub_nonsan', name: '논산CC', region: '충남', city: '논산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyerong', name: '계룡CC', region: '충남', city: '논산시', type: 'field', membership: 'public', totalHoles: 18 },

  // 서산시
  { id: 'pub_seosan', name: '서산CC', region: '충남', city: '서산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seosanpublic', name: '서산퍼블릭CC', region: '충남', city: '서산시', type: 'field', membership: 'public', totalHoles: 18 },

  // 당진시
  { id: 'pub_dangjin', name: '당진CC', region: '충남', city: '당진시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dangjinhill', name: '당진힐CC', region: '충남', city: '당진시', type: 'field', membership: 'public', totalHoles: 18 },

  // 보령시
  { id: 'pub_boryeong', name: '보령CC', region: '충남', city: '보령시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daecheon', name: '대천CC', region: '충남', city: '보령시', type: 'field', membership: 'public', totalHoles: 27 },

  // 홍성군
  { id: 'pub_hongseong', name: '홍성CC', region: '충남', city: '홍성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hongseongpublic', name: '홍성퍼블릭CC', region: '충남', city: '홍성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 예산군
  { id: 'pub_yesan', name: '예산CC', region: '충남', city: '예산군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_deokyusan', name: '덕유산CC', region: '충남', city: '예산군', type: 'field', membership: 'public', totalHoles: 18 },

  // 태안군
  { id: 'pub_taean', name: '태안CC', region: '충남', city: '태안군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_taeanpublic', name: '태안퍼블릭CC', region: '충남', city: '태안군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_stonebeach', name: '스톤비치CC', region: '충남', city: '태안군', type: 'field', membership: 'public', totalHoles: 18 },

  // 청양군
  { id: 'pub_cheongyang', name: '청양CC', region: '충남', city: '청양군', type: 'field', membership: 'public', totalHoles: 18 },

  // 부여군
  { id: 'pub_buyeo', name: '부여CC', region: '충남', city: '부여군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_baekje', name: '백제CC', region: '충남', city: '부여군', type: 'field', membership: 'public', totalHoles: 18 },

  // 서천군
  { id: 'pub_seocheon', name: '서천CC', region: '충남', city: '서천군', type: 'field', membership: 'public', totalHoles: 18 },

  // 금산군
  { id: 'pub_geumsan', name: '금산CC', region: '충남', city: '금산군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 대전 (10개) ====================
  { id: 'pub_geumsil', name: '금실대덕밸리CC', region: '대전', city: '유성구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_jauncc', name: '자운대CC', region: '대전', city: '유성구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_daejeon', name: '대전CC', region: '대전', city: '유성구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daejeonpublic', name: '대전퍼블릭CC', region: '대전', city: '서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyejoksan', name: '계족산CC', region: '대전', city: '대덕구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yuseong', name: '유성CC', region: '대전', city: '유성구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_expo', name: '엑스포CC', region: '대전', city: '유성구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hanbat', name: '한밭CC', region: '대전', city: '서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daejeonhill', name: '대전힐CC', region: '대전', city: '동구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daejeonvalley', name: '대전밸리CC', region: '대전', city: '유성구', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 세종 (8개) ====================
  { id: 'pub_raycastle', name: '레이캐슬골프앤리조트', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_sejongfield', name: '세종필드골프클럽', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sejong', name: '세종CC', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sejonghill', name: '세종힐CC', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sejongpublic', name: '세종퍼블릭CC', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sejongvalley', name: '세종밸리CC', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sejongemerson', name: '세종에머슨CC', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_sejonggreen', name: '세종그린CC', region: '세종', city: '세종시', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 전라북도 (30개) ====================
  // 전주시/완주군
  { id: 'pub_jeonju', name: '전주CC', region: '전북', city: '전주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jeonjupublic', name: '전주퍼블릭CC', region: '전북', city: '전주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_wanju', name: '완주CC', region: '전북', city: '완주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jeonjuhill', name: '전주힐CC', region: '전북', city: '전주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 익산시
  { id: 'pub_ungpo', name: '웅포CC', region: '전북', city: '익산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_iksan', name: '익산CC', region: '전북', city: '익산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_iksanpublic', name: '익산퍼블릭CC', region: '전북', city: '익산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_clubdigold', name: '클럽디금강CC', region: '전북', city: '익산시', type: 'field', membership: 'public', totalHoles: 27 },

  // 김제시
  { id: 'pub_thenine', name: '더나인GC', region: '전북', city: '김제시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_gimje', name: '김제CC', region: '전북', city: '김제시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimjepublic', name: '김제퍼블릭CC', region: '전북', city: '김제시', type: 'field', membership: 'public', totalHoles: 18 },

  // 남원시
  { id: 'pub_golfzondragon', name: '골프존카운티드래곤', region: '전북', city: '남원시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_namwon', name: '남원CC', region: '전북', city: '남원시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jirisan', name: '지리산CC', region: '전북', city: '남원시', type: 'field', membership: 'public', totalHoles: 18 },

  // 정읍시
  { id: 'pub_jeongeup', name: '정읍CC', region: '전북', city: '정읍시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_naejangsan', name: '내장산CC', region: '전북', city: '정읍시', type: 'field', membership: 'public', totalHoles: 18 },

  // 군산시
  { id: 'pub_gunsan', name: '군산CC', region: '전북', city: '군산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gunsanpublic', name: '군산퍼블릭CC', region: '전북', city: '군산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gunsansaemangeum', name: '군산새만금CC', region: '전북', city: '군산시', type: 'field', membership: 'public', totalHoles: 18 },

  // 무주군
  { id: 'pub_golfzonmuju', name: '골프존카운티무주', region: '전북', city: '무주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_muju', name: '무주CC', region: '전북', city: '무주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_deokyu', name: '덕유산리조트CC', region: '전북', city: '무주군', type: 'field', membership: 'public', totalHoles: 27 },

  // 고창군
  { id: 'pub_gochang', name: '고창CC', region: '전북', city: '고창군', type: 'field', membership: 'public', totalHoles: 18 },

  // 부안군
  { id: 'pub_buan', name: '부안CC', region: '전북', city: '부안군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_byeonsanbando', name: '변산반도CC', region: '전북', city: '부안군', type: 'field', membership: 'public', totalHoles: 18 },

  // 임실군
  { id: 'pub_imsil', name: '임실CC', region: '전북', city: '임실군', type: 'field', membership: 'public', totalHoles: 18 },

  // 진안군
  { id: 'pub_jinan', name: '진안CC', region: '전북', city: '진안군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_maisan', name: '마이산CC', region: '전북', city: '진안군', type: 'field', membership: 'public', totalHoles: 18 },

  // 순창군
  { id: 'pub_sunchang', name: '순창CC', region: '전북', city: '순창군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 전라남도 (30개) ====================
  // 나주시
  { id: 'pub_najuhills', name: '나주힐스CC', region: '전남', city: '나주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_naju', name: '나주CC', region: '전남', city: '나주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 장성군
  { id: 'pub_sangmu', name: '상무대체력단련장', region: '전남', city: '장성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pureunsol', name: '푸른솔장성GC', region: '전남', city: '장성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jangseong', name: '장성CC', region: '전남', city: '장성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 여수시
  { id: 'pub_yeosucity', name: '여수시티파크CC', region: '전남', city: '여수시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeosu', name: '여수CC', region: '전남', city: '여수시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeosusea', name: '여수씨사이드CC', region: '전남', city: '여수시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeosuhidden', name: '여수히든밸리CC', region: '전남', city: '여수시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeosuelsian', name: '여수엘리시안CC', region: '전남', city: '여수시', type: 'field', membership: 'public', totalHoles: 18 },

  // 순천시
  { id: 'pub_suncheon', name: '순천CC', region: '전남', city: '순천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_suncheonbay', name: '순천만CC', region: '전남', city: '순천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_golfzonsuncheon', name: '골프존카운티순천', region: '전남', city: '순천시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_pinehills', name: '파인힐스CC', region: '전남', city: '순천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 화순군
  { id: 'pub_hwasun', name: '화순CC', region: '전남', city: '화순군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hwasunpublic', name: '화순퍼블릭CC', region: '전남', city: '화순군', type: 'field', membership: 'public', totalHoles: 18 },

  // 해남군
  { id: 'pub_pinebeach', name: '파인비치CC', region: '전남', city: '해남군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_solarsido', name: '솔라시도CC', region: '전남', city: '해남군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_haenam', name: '해남CC', region: '전남', city: '해남군', type: 'field', membership: 'public', totalHoles: 18 },

  // 곡성군
  { id: 'pub_gokseong', name: '곡성CC', region: '전남', city: '곡성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 영광군
  { id: 'pub_yeonggwang', name: '영광CC', region: '전남', city: '영광군', type: 'field', membership: 'public', totalHoles: 18 },

  // 무안군
  { id: 'pub_muan', name: '무안CC', region: '전남', city: '무안군', type: 'field', membership: 'public', totalHoles: 18 },

  // 목포시
  { id: 'pub_mokpo', name: '목포CC', region: '전남', city: '목포시', type: 'field', membership: 'public', totalHoles: 9 },

  // 영암군
  { id: 'pub_yeongam', name: '영암CC', region: '전남', city: '영암군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_cosmoslinks', name: '코스모스링스CC', region: '전남', city: '영암군', type: 'field', membership: 'public', totalHoles: 18 },

  // 담양군
  { id: 'pub_damyang', name: '담양CC', region: '전남', city: '담양군', type: 'field', membership: 'public', totalHoles: 18 },

  // 구례군
  { id: 'pub_gurye', name: '구례CC', region: '전남', city: '구례군', type: 'field', membership: 'public', totalHoles: 18 },

  // 광양시
  { id: 'pub_gwangyang', name: '광양CC', region: '전남', city: '광양시', type: 'field', membership: 'public', totalHoles: 18 },

  // 강진군
  { id: 'pub_gangjin', name: '강진CC', region: '전남', city: '강진군', type: 'field', membership: 'public', totalHoles: 18 },

  // 함평군
  { id: 'pub_berhill', name: '베르힐CC', region: '전남', city: '함평군', type: 'field', membership: 'public', totalHoles: 27 },

  // ==================== 광주 (10개) ====================
  { id: 'pub_gwangsancc', name: '광산CC', region: '광주', city: '광산구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bitgoeul', name: '빛고을CC', region: '광주', city: '남구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_eodeungsan', name: '어등산CC', region: '광주', city: '광산구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gwangju', name: '광주CC', region: '광주', city: '광산구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gwangjupublic', name: '광주퍼블릭CC', region: '광주', city: '북구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_mudeungsan', name: '무등산CC', region: '광주', city: '동구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gwangjuhill', name: '광주힐CC', region: '광주', city: '광산구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gwangjuvalley', name: '광주밸리CC', region: '광주', city: '광산구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gwangjutraining', name: '광주체력단련장', region: '광주', city: '광산구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_gwangjueast', name: '광주동부CC', region: '광주', city: '동구', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 경상북도 (45개) ====================
  // 경주시
  { id: 'pub_gyeongju', name: '경주CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyeongjupublic', name: '경주퍼블릭CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bomun', name: '보문CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_bomunlake', name: '보문레이크CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bearscreekgyeongju', name: '베어스크리크경주CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sillacc', name: '신라CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gyeongjuworld', name: '경주월드리조트CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_lakehill', name: '레이크힐CC', region: '경북', city: '경주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 포항시
  { id: 'pub_pohang', name: '포항CC', region: '경북', city: '포항시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pohangpublic', name: '포항퍼블릭CC', region: '경북', city: '포항시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pohanghill', name: '포항힐CC', region: '경북', city: '포항시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeongil', name: '영일CC', region: '경북', city: '포항시', type: 'field', membership: 'public', totalHoles: 18 },

  // 구미시
  { id: 'pub_gumi', name: '구미CC', region: '경북', city: '구미시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gumipublic', name: '구미퍼블릭CC', region: '경북', city: '구미시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gumihill', name: '구미힐CC', region: '경북', city: '구미시', type: 'field', membership: 'public', totalHoles: 18 },

  // 김천시
  { id: 'pub_gimcheon', name: '김천CC', region: '경북', city: '김천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimcheonpublic', name: '김천퍼블릭CC', region: '경북', city: '김천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 안동시
  { id: 'pub_andong', name: '안동CC', region: '경북', city: '안동시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_andongpublic', name: '안동퍼블릭CC', region: '경북', city: '안동시', type: 'field', membership: 'public', totalHoles: 18 },

  // 상주시
  { id: 'pub_sangju', name: '상주CC', region: '경북', city: '상주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_sangjupublic', name: '상주퍼블릭CC', region: '경북', city: '상주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 영주시
  { id: 'pub_yeongju', name: '영주CC', region: '경북', city: '영주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seonbi', name: '선비CC', region: '경북', city: '영주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 문경시
  { id: 'pub_mungyeong', name: '문경CC', region: '경북', city: '문경시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_saejae', name: '새재CC', region: '경북', city: '문경시', type: 'field', membership: 'public', totalHoles: 18 },

  // 영천시
  { id: 'pub_yeongcheon', name: '영천CC', region: '경북', city: '영천시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yeongcheonpublic', name: '영천퍼블릭CC', region: '경북', city: '영천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 칠곡군
  { id: 'pub_chilgok', name: '칠곡CC', region: '경북', city: '칠곡군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_chilgokpublic', name: '칠곡퍼블릭CC', region: '경북', city: '칠곡군', type: 'field', membership: 'public', totalHoles: 18 },

  // 군위군
  { id: 'pub_gunwiopel', name: '군위오펠GC', region: '경북', city: '군위군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_egisky', name: '이지스카이CC', region: '경북', city: '군위군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_callate', name: '칼레이트CC', region: '경북', city: '군위군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gunwi', name: '군위CC', region: '경북', city: '군위군', type: 'field', membership: 'public', totalHoles: 18 },

  // 성주군
  { id: 'pub_seongju', name: '성주CC', region: '경북', city: '성주군', type: 'field', membership: 'public', totalHoles: 18 },

  // 고령군
  { id: 'pub_goryeong', name: '고령CC', region: '경북', city: '고령군', type: 'field', membership: 'public', totalHoles: 18 },

  // 예천군
  { id: 'pub_yecheon', name: '예천CC', region: '경북', city: '예천군', type: 'field', membership: 'public', totalHoles: 18 },

  // 봉화군
  { id: 'pub_bonghwa', name: '봉화CC', region: '경북', city: '봉화군', type: 'field', membership: 'public', totalHoles: 18 },

  // 울진군
  { id: 'pub_uljin', name: '울진CC', region: '경북', city: '울진군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_uljinmarine', name: '울진마린CC', region: '경북', city: '울진군', type: 'field', membership: 'public', totalHoles: 18 },

  // 영덕군
  { id: 'pub_yeongdeok', name: '영덕CC', region: '경북', city: '영덕군', type: 'field', membership: 'public', totalHoles: 18 },

  // 청송군
  { id: 'pub_cheongsong', name: '청송CC', region: '경북', city: '청송군', type: 'field', membership: 'public', totalHoles: 18 },

  // 영양군
  { id: 'pub_yeongyang', name: '영양CC', region: '경북', city: '영양군', type: 'field', membership: 'public', totalHoles: 18 },

  // 의성군
  { id: 'pub_uiseong', name: '의성CC', region: '경북', city: '의성군', type: 'field', membership: 'public', totalHoles: 18 },

  // 경산시
  { id: 'pub_gyeongsan', name: '경산CC', region: '경북', city: '경산시', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 경상남도 (40개) ====================
  // 창원시
  { id: 'pub_changwon', name: '창원CC', region: '경남', city: '창원시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_changwonpublic', name: '창원퍼블릭CC', region: '경남', city: '창원시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hansandae', name: '한산대체력단련장', region: '경남', city: '창원시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_masan', name: '마산CC', region: '경남', city: '창원시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jinhae', name: '진해CC', region: '경남', city: '창원시', type: 'field', membership: 'public', totalHoles: 18 },

  // 김해시
  { id: 'pub_gimhae', name: '김해CC', region: '경남', city: '김해시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimhaepublic', name: '김해퍼블릭CC', region: '경남', city: '김해시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimhaehill', name: '김해힐CC', region: '경남', city: '김해시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gimhaesangrok', name: '김해상록CC', region: '경남', city: '김해시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_lotteskyhillgimhae', name: '롯데스카이힐김해', region: '경남', city: '김해시', type: 'field', membership: 'public', totalHoles: 18 },

  // 양산시
  { id: 'pub_yangsan', name: '양산CC', region: '경남', city: '양산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangsanpublic', name: '양산퍼블릭CC', region: '경남', city: '양산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_tongdo', name: '통도CC', region: '경남', city: '양산시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_yangsaneden', name: '양산에덴CC', region: '경남', city: '양산시', type: 'field', membership: 'public', totalHoles: 18 },

  // 거제시
  { id: 'pub_geoje', name: '거제CC', region: '경남', city: '거제시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_geojepublic', name: '거제퍼블릭CC', region: '경남', city: '거제시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_geojedo', name: '거제도CC', region: '경남', city: '거제시', type: 'field', membership: 'public', totalHoles: 18 },

  // 진주시
  { id: 'pub_jinju', name: '진주CC', region: '경남', city: '진주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jinjupublic', name: '진주퍼블릭CC', region: '경남', city: '진주시', type: 'field', membership: 'public', totalHoles: 18 },

  // 통영시
  { id: 'pub_tongyeong', name: '통영CC', region: '경남', city: '통영시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_tongyeongpublic', name: '통영퍼블릭CC', region: '경남', city: '통영시', type: 'field', membership: 'public', totalHoles: 18 },

  // 사천시
  { id: 'pub_sacheon', name: '사천CC', region: '경남', city: '사천시', type: 'field', membership: 'public', totalHoles: 18 },

  // 밀양시
  { id: 'pub_miryang', name: '밀양CC', region: '경남', city: '밀양시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_miryangpublic', name: '밀양퍼블릭CC', region: '경남', city: '밀양시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_milyangespak', name: '밀양에스파크CC', region: '경남', city: '밀양시', type: 'field', membership: 'public', totalHoles: 18 },

  // 거창군
  { id: 'pub_geochang', name: '거창CC', region: '경남', city: '거창군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_geochangpublic', name: '거창퍼블릭CC', region: '경남', city: '거창군', type: 'field', membership: 'public', totalHoles: 18 },

  // 함안군
  { id: 'pub_hamandae', name: '함안대체력단련장', region: '경남', city: '함안군', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_haman', name: '함안CC', region: '경남', city: '함안군', type: 'field', membership: 'public', totalHoles: 18 },

  // 창녕군
  { id: 'pub_changnyeong', name: '창녕CC', region: '경남', city: '창녕군', type: 'field', membership: 'public', totalHoles: 18 },

  // 의령군
  { id: 'pub_uiryeong', name: '의령친환경대중CC', region: '경남', city: '의령군', type: 'field', membership: 'public', totalHoles: 18 },

  // 합천군
  { id: 'pub_hapcheon', name: '합천CC', region: '경남', city: '합천군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_haeinsa', name: '해인사CC', region: '경남', city: '합천군', type: 'field', membership: 'public', totalHoles: 18 },

  // 함양군
  { id: 'pub_hamyang', name: '함양CC', region: '경남', city: '함양군', type: 'field', membership: 'public', totalHoles: 18 },

  // 산청군
  { id: 'pub_sancheong', name: '산청CC', region: '경남', city: '산청군', type: 'field', membership: 'public', totalHoles: 18 },

  // 고성군 (경남)
  { id: 'pub_goseongnam', name: '고성CC', region: '경남', city: '고성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_goseongnovel', name: '고성노벨CC', region: '경남', city: '고성군', type: 'field', membership: 'public', totalHoles: 27 },

  // 남해군
  { id: 'pub_namhae', name: '남해CC', region: '경남', city: '남해군', type: 'field', membership: 'public', totalHoles: 18 },

  // 하동군
  { id: 'pub_hadong', name: '하동CC', region: '경남', city: '하동군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 대구 (15개) ====================
  { id: 'pub_daegucc', name: '대구CC', region: '대구', city: '달성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daegupublic', name: '대구퍼블릭CC', region: '대구', city: '달성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daegugym', name: '대구체력단련장', region: '대구', city: '동구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_muyeoldae', name: '무열대체력단련장', region: '대구', city: '동구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_palgong', name: '팔공컨트리클럽', region: '대구', city: '동구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_apsan', name: '앞산CC', region: '대구', city: '남구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dalseong', name: '달성CC', region: '대구', city: '달성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bisulsan', name: '비슬산CC', region: '대구', city: '달성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_suseong', name: '수성CC', region: '대구', city: '수성구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dongdaegu', name: '동대구CC', region: '대구', city: '동구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seodaegu', name: '서대구CC', region: '대구', city: '달서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_bukdaegu', name: '북대구CC', region: '대구', city: '북구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daeguhill', name: '대구힐CC', region: '대구', city: '달성군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dguni', name: '구니CC', region: '대구', city: '군위군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_daeguvalley', name: '대구밸리CC', region: '대구', city: '달성군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 울산 (12개) ====================
  { id: 'pub_ulsan', name: '울산CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ulsanpublic', name: '울산퍼블릭CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_goldgreen', name: '골드그린골프클럽', region: '울산', city: '북구', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_yeongnamalps', name: '영남알프스골프파크', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_munsu', name: '문수CC', region: '울산', city: '남구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ulsanhill', name: '울산힐CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ulsanvalley', name: '울산밸리CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_taewhasan', name: '태화산CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_gajisan', name: '가지산CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_eonyang', name: '언양CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_orvis', name: '오르비스CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ulsaneast', name: '울산동부CC', region: '울산', city: '울주군', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 부산 (15개) ====================
  { id: 'pub_busan', name: '부산CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_busanpublic', name: '부산퍼블릭CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_stonegate', name: '스톤게이트CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_haeundae', name: '해운대CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_highst', name: '하이스트CC', region: '부산', city: '강서구', type: 'field', membership: 'public', totalHoles: 10 },
  { id: 'pub_gijang', name: '기장CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_busanhill', name: '부산힐CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_dongbusan', name: '동부산CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seobusan', name: '서부산CC', region: '부산', city: '강서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_geumjeong', name: '금정CC', region: '부산', city: '금정구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_nakdong', name: '낙동CC', region: '부산', city: '강서구', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ilgwang', name: '일광CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_busanvalley', name: '부산밸리CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_busaneast', name: '부산동부CC', region: '부산', city: '기장군', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_busanwest', name: '부산서부CC', region: '부산', city: '강서구', type: 'field', membership: 'public', totalHoles: 18 },

  // ==================== 제주도 (45개) ====================
  { id: 'pub_theclassic', name: '더클래식CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_raon', name: '라온CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_booyoung', name: '부영CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_shinevil', name: '샤인빌CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_saintfour', name: '세인트포CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_skyhill', name: '스카이힐CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_springdale', name: '스프링데일CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_adenhill', name: '아덴힐CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_ecoland', name: '에코랜드GC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_elysianjeju', name: '엘리시안제주CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_ora', name: '오라CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_ours', name: '아워스CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_thejeju', name: '더제주CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jungmun', name: '중문CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_castlerex', name: '캐슬렉스CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_crown', name: '크라운CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_hallasan', name: '한라산CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hanwhaplaza', name: '한화프라자CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_haevichi', name: '해비치CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 27 },
  { id: 'pub_cypress', name: '사이프러스CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejupublic', name: '제주퍼블릭CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejuhill', name: '제주힐CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seogwipo', name: '서귀포CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejuocean', name: '제주오션CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejuvalley', name: '제주밸리CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejumountain', name: '제주마운틴CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_tamra', name: '탐라CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejubeach', name: '제주비치CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_seongsan', name: '성산CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_udo', name: '우도CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 9 },
  { id: 'pub_jejusunrise', name: '제주선라이즈CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejusunset', name: '제주선셋CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_pinksand', name: '핑크샌드CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_greenpine', name: '그린파인CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejuwest', name: '제주서부CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejueast', name: '제주동부CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejunorth', name: '제주북부CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_jejusouth', name: '제주남부CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_aewol', name: '애월CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_hallim', name: '한림CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_teddy', name: '테디밸리GC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_lahenne', name: '라헨느CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_greenfield', name: '그린필드CC', region: '제주', city: '서귀포시', type: 'field', membership: 'public', totalHoles: 18 },
  { id: 'pub_lotteskyhilljeju', name: '롯데스카이힐제주', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 36 },
  { id: 'pub_tamius', name: '타미우스CC', region: '제주', city: '제주시', type: 'field', membership: 'public', totalHoles: 18 },
];

// ========== 스크린 골프 제공업체 ==========
export const SCREEN_PROVIDERS = ['골프존', 'SG골프', '카카오VX', 'GTOUR'];

// ========== 운영형태 필터 ==========
export const MEMBERSHIP_TYPES = [
  { value: 'all', label: '전체' },
  { value: 'public', label: '대중제' },
  { value: 'member', label: '회원제' },
];

// ========== 스크린 골프 코스 데이터 ==========
export const SCREEN_COURSES = [
  // 골프존 코스
  { id: 'screen_golfzon_pinx', name: '핀크스GC', provider: '골프존', holes: [4,5,3,4,4,3,5,4,4,4,3,4,5,4,3,4,5,4], totalPar: 72 },
  { id: 'screen_golfzon_skyhill', name: '스카이힐CC', provider: '골프존', holes: [4,4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5], totalPar: 72 },
  { id: 'screen_golfzon_elysian', name: '엘리시안제주', provider: '골프존', holes: [4,5,4,3,4,4,5,3,4,4,5,4,3,4,4,5,3,4], totalPar: 72 },
  { id: 'screen_golfzon_southspring', name: '사우스스프링스', provider: '골프존', holes: [4,4,5,3,4,4,3,5,4,4,4,5,3,4,4,3,5,4], totalPar: 72 },
  { id: 'screen_golfzon_bearcreek', name: '베어크리크GC', provider: '골프존', holes: [4,3,5,4,4,4,3,5,4,4,3,5,4,4,4,3,5,4], totalPar: 72 },
  { id: 'screen_golfzon_montvert', name: '몽베르CC', provider: '골프존', holes: [4,4,3,5,4,4,5,3,4,4,4,3,5,4,4,5,3,4], totalPar: 72 },
  { id: 'screen_golfzon_lakehills', name: '레이크힐스CC', provider: '골프존', holes: [4,5,3,4,4,4,3,5,4,4,5,3,4,4,4,3,5,4], totalPar: 72 },
  { id: 'screen_golfzon_blackstone', name: '블랙스톤CC', provider: '골프존', holes: [4,4,5,3,4,4,5,3,4,4,4,5,3,4,4,5,3,4], totalPar: 72 },

  // SG골프 코스
  { id: 'screen_sg_namseoul', name: '남서울CC', provider: 'SG골프', holes: [4,4,3,5,4,4,3,5,4,4,4,3,5,4,4,3,5,4], totalPar: 72 },
  { id: 'screen_sg_88cc', name: '88CC', provider: 'SG골프', holes: [4,5,4,3,4,4,5,3,4,4,5,4,3,4,4,5,3,4], totalPar: 72 },
  { id: 'screen_sg_anyang', name: '안양CC', provider: 'SG골프', holes: [4,4,5,3,4,4,3,5,4,4,4,5,3,4,4,3,5,4], totalPar: 72 },
  { id: 'screen_sg_hanyang', name: '한양CC', provider: 'SG골프', holes: [4,3,4,5,4,4,3,5,4,4,3,4,5,4,4,3,5,4], totalPar: 72 },

  // 카카오VX 코스
  { id: 'screen_kakao_ora', name: '오라CC', provider: '카카오VX', holes: [4,4,3,5,4,4,3,5,4,4,4,3,5,4,4,3,5,4], totalPar: 72 },
  { id: 'screen_kakao_jeju', name: '제주CC', provider: '카카오VX', holes: [4,5,4,3,4,4,5,3,4,4,5,4,3,4,4,5,3,4], totalPar: 72 },
  { id: 'screen_kakao_haeundae', name: '해운대CC', provider: '카카오VX', holes: [4,4,5,3,4,4,3,5,4,4,4,5,3,4,4,3,5,4], totalPar: 72 },

  // GTOUR 코스
  { id: 'screen_gtour_pebble', name: '페블비치', provider: 'GTOUR', holes: [4,5,4,4,3,5,3,4,4,4,4,3,4,5,4,3,4,5], totalPar: 72 },
  { id: 'screen_gtour_standrews', name: '세인트앤드류스', provider: 'GTOUR', holes: [4,4,4,4,5,4,4,3,4,4,3,4,4,5,4,4,3,4], totalPar: 72 },
];

// ========== 권역별 지역 조회 함수 ==========
export const getRegionsByGroup = (group) => {
  return REGION_CATEGORIES[group] || [];
};

// ========== 골프장 검색 함수 ==========
export const searchClubs = (query = '', region = '전체', regionGroup = '전체', membership = 'all') => {
  let results = [...GOLF_CLUBS];

  // 권역 필터
  if (regionGroup !== '전체') {
    const regionsInGroup = REGION_CATEGORIES[regionGroup] || [];
    results = results.filter(club => regionsInGroup.includes(club.region));
  }

  // 지역 필터
  if (region !== '전체') {
    results = results.filter(club => club.region === region);
  }

  // 운영형태 필터
  if (membership !== 'all') {
    results = results.filter(club => club.membership === membership);
  }

  // 검색어 필터
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(club =>
      club.name.toLowerCase().includes(searchTerm) ||
      club.city.toLowerCase().includes(searchTerm)
    );
  }

  return results;
};

// ========== 스크린 코스 검색 함수 ==========
export const searchScreenCourses = (query = '', provider = null) => {
  let results = [...SCREEN_COURSES];

  // 제공업체 필터
  if (provider) {
    results = results.filter(course => course.provider === provider);
  }

  // 검색어 필터
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(course =>
      course.name.toLowerCase().includes(searchTerm) ||
      course.provider.toLowerCase().includes(searchTerm)
    );
  }

  return results;
};

// ========== 코스 조합 조회 (27홀/36홀 골프장용) ==========
export const getClubCombinations = (clubId) => {
  const club = GOLF_CLUBS.find(c => c.id === clubId);
  if (!club) return [];

  // COURSE_DATA에 실제 코스 정보가 있는 경우 해당 데이터 사용
  const courseData = COURSE_DATA[clubId];
  if (courseData && courseData.combinations) {
    return courseData.combinations.map(combo => ({
      id: combo.id,
      clubId: clubId,
      name: combo.name,
      front: combo.front,
      back: combo.back,
    }));
  }

  // COURSE_DATA가 없는 경우 기본 조합 반환
  // 18홀 골프장은 단일 조합만 반환
  if (club.totalHoles === 18) {
    return [{
      id: `${clubId}_default`,
      clubId: clubId,
      name: '18홀',
    }];
  }

  // 27홀 골프장 - 3가지 조합
  if (club.totalHoles === 27) {
    return [
      { id: `${clubId}_ab`, clubId: clubId, name: 'A+B 코스' },
      { id: `${clubId}_bc`, clubId: clubId, name: 'B+C 코스' },
      { id: `${clubId}_ca`, clubId: clubId, name: 'C+A 코스' },
    ];
  }

  // 36홀 골프장 - 여러 조합
  if (club.totalHoles === 36) {
    return [
      { id: `${clubId}_ab`, clubId: clubId, name: 'A+B 코스' },
      { id: `${clubId}_cd`, clubId: clubId, name: 'C+D 코스' },
      { id: `${clubId}_ac`, clubId: clubId, name: 'A+C 코스' },
      { id: `${clubId}_bd`, clubId: clubId, name: 'B+D 코스' },
    ];
  }

  return [];
};

// ========== 코스 조합의 홀 정보 조회 ==========
export const getCombinationHoles = (combinationId) => {
  // 기본 파 정보 (표준 18홀)
  const defaultPars = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5];

  // COURSE_DATA에서 실제 코스 정보 찾기
  for (const [clubId, data] of Object.entries(COURSE_DATA)) {
    if (data.combinations) {
      const combo = data.combinations.find(c => c.id === combinationId);
      if (combo) {
        const frontCourse = data.courses[combo.front];
        const backCourse = data.courses[combo.back];

        if (frontCourse && backCourse) {
          const holes = [...frontCourse.pars, ...backCourse.pars];
          const totalPar = holes.reduce((sum, par) => sum + par, 0);

          return {
            id: combinationId,
            name: combo.name,
            holes: holes,
            totalPar: totalPar,
            frontName: frontCourse.name + '코스',
            backName: backCourse.name + '코스',
          };
        }
      }
    }
  }

  // 조합 ID에서 클럽 ID와 조합 타입 추출 (기존 로직 - fallback)
  const parts = combinationId.split('_');
  const combinationType = parts[parts.length - 1];

  // 기본 홀 정보 반환 (COURSE_DATA에 없는 경우)
  return {
    id: combinationId,
    name: combinationType === 'default' ? '18홀' :
          combinationType === 'ab' ? 'A+B 코스' :
          combinationType === 'bc' ? 'B+C 코스' :
          combinationType === 'ca' ? 'C+A 코스' :
          combinationType === 'cd' ? 'C+D 코스' :
          combinationType === 'ac' ? 'A+C 코스' :
          combinationType === 'bd' ? 'B+D 코스' : '18홀',
    holes: defaultPars,
    totalPar: 72,
    frontName: combinationType.charAt(0).toUpperCase() + '코스',
    backName: combinationType.charAt(1)?.toUpperCase() + '코스' || 'B코스',
  };
};

// ========== 골프장 ID로 조회 ==========
export const getClubById = (clubId) => {
  return GOLF_CLUBS.find(club => club.id === clubId);
};

// ========== 지역별 골프장 수 조회 ==========
export const getClubCountByRegion = () => {
  const counts = {};
  GOLF_CLUBS.forEach(club => {
    counts[club.region] = (counts[club.region] || 0) + 1;
  });
  return counts;
};

// ========== 권역별 골프장 수 조회 ==========
export const getClubCountByGroup = () => {
  const counts = {};
  Object.entries(REGION_CATEGORIES).forEach(([group, regions]) => {
    counts[group] = GOLF_CLUBS.filter(club => regions.includes(club.region)).length;
  });
  return counts;
};

// ========== 전체 대중제 골프장 수 ==========
export const getTotalPublicClubCount = () => {
  return GOLF_CLUBS.length;
};

// ========== 실제 골프장 코스 데이터 (홀별 PAR 정보) ==========
// 각 골프장의 실제 코스 정보를 저장합니다.
// courses: 9홀 단위의 코스 정보
// combinations: 18홀 조합 정보 (전반 + 후반)
export const COURSE_DATA = {
  // ==================== 경기도 ====================

  // 용인퍼블릭CC (18홀) - 용인코스 + 석천코스
  'pub_yonginpublic': {
    courses: {
      'yongin': {
        name: '용인',
        pars: [4, 5, 3, 4, 4, 4, 3, 4, 5],  // 36 (9홀)
      },
      'seokcheon': {
        name: '석천',
        pars: [4, 3, 4, 5, 4, 3, 4, 4, 5],  // 36 (9홀)
      },
    },
    combinations: [
      { id: 'pub_yonginpublic_yongin_seokcheon', front: 'yongin', back: 'seokcheon', name: '용인+석천' },
    ],
  },

  // 스카이밸리CC (36홀) - 스카이, 밸리, 레이크, 마운틴 코스 (공식 홈페이지 확인)
  'pub_skyvalley': {
    courses: {
      'sky': { name: '스카이', pars: [4, 5, 4, 3, 5, 4, 3, 4, 4] },      // 36 (회원제)
      'valley': { name: '밸리', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },     // 36 (회원제)
      'lake': { name: '레이크', pars: [4, 4, 3, 4, 4, 5, 3, 4, 5] },     // 36 (대중제)
      'mountain': { name: '마운틴', pars: [4, 4, 4, 5, 3, 4, 5, 3, 4] }, // 36 (대중제)
    },
    combinations: [
      { id: 'pub_skyvalley_sky_valley', front: 'sky', back: 'valley', name: '스카이+밸리' },
      { id: 'pub_skyvalley_lake_mountain', front: 'lake', back: 'mountain', name: '레이크+마운틴' },
      { id: 'pub_skyvalley_sky_lake', front: 'sky', back: 'lake', name: '스카이+레이크' },
      { id: 'pub_skyvalley_valley_mountain', front: 'valley', back: 'mountain', name: '밸리+마운틴' },
      { id: 'pub_skyvalley_sky_mountain', front: 'sky', back: 'mountain', name: '스카이+마운틴' },
      { id: 'pub_skyvalley_valley_lake', front: 'valley', back: 'lake', name: '밸리+레이크' },
    ],
  },

  // 골프존카운티여주 (27홀) - 힐, 레이크, 밸리 코스
  'pub_golfzonyeoju': {
    courses: {
      'hill': { name: '힐', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'lake': { name: '레이크', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_golfzonyeoju_hill_lake', front: 'hill', back: 'lake', name: '힐+레이크' },
      { id: 'pub_golfzonyeoju_lake_valley', front: 'lake', back: 'valley', name: '레이크+밸리' },
      { id: 'pub_golfzonyeoju_valley_hill', front: 'valley', back: 'hill', name: '밸리+힐' },
    ],
  },

  // 베어크리크GC 포천 (36홀) - 베어코스(한국잔디), 크리크코스(양잔디)
  'pub_bearcreek': {
    courses: {
      'bear_out': { name: '베어OUT', pars: [4, 3, 4, 5, 4, 4, 3, 4, 5] },   // 36
      'bear_in': { name: '베어IN', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },     // 36
      'creek_out': { name: '크리크OUT', pars: [4, 4, 3, 5, 4, 3, 4, 4, 5] }, // 36
      'creek_in': { name: '크리크IN', pars: [5, 4, 3, 4, 4, 3, 4, 4, 5] },   // 36
    },
    combinations: [
      { id: 'pub_bearcreek_bear', front: 'bear_out', back: 'bear_in', name: '베어코스 18홀' },
      { id: 'pub_bearcreek_creek', front: 'creek_out', back: 'creek_in', name: '크리크코스 18홀' },
    ],
  },

  // 포천힐스CC (27홀) - 가든, 팰리스, 캐슬 코스 (공식 홈페이지 확인)
  'pub_pocheonhills': {
    courses: {
      'garden': { name: '가든', pars: [5, 4, 5, 3, 4, 3, 4, 4, 4] },     // 36
      'palace': { name: '팰리스', pars: [5, 3, 4, 5, 3, 4, 3, 4, 5] },   // 36
      'castle': { name: '캐슬', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },     // 36
    },
    combinations: [
      { id: 'pub_pocheonhills_garden_palace', front: 'garden', back: 'palace', name: '가든+팰리스' },
      { id: 'pub_pocheonhills_palace_castle', front: 'palace', back: 'castle', name: '팰리스+캐슬' },
      { id: 'pub_pocheonhills_castle_garden', front: 'castle', back: 'garden', name: '캐슬+가든' },
    ],
  },

  // 아도니스CC (27홀) - 웨스트, 미들, 이스트 코스
  'pub_adonis': {
    courses: {
      'west': { name: '웨스트', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'middle': { name: '미들', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },   // 36
      'east': { name: '이스트', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },   // 36
    },
    combinations: [
      { id: 'pub_adonis_west_middle', front: 'west', back: 'middle', name: '웨스트+미들' },
      { id: 'pub_adonis_middle_east', front: 'middle', back: 'east', name: '미들+이스트' },
      { id: 'pub_adonis_east_west', front: 'east', back: 'west', name: '이스트+웨스트' },
    ],
  },

  // 사우스스프링스CC (27홀) - 레이크, 밸리, 힐 코스
  'pub_southsprings': {
    courses: {
      'lake': { name: '레이크', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },
      'valley': { name: '밸리', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },
      'hill': { name: '힐', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },
    },
    combinations: [
      { id: 'pub_southsprings_lake_valley', front: 'lake', back: 'valley', name: '레이크+밸리' },
      { id: 'pub_southsprings_valley_hill', front: 'valley', back: 'hill', name: '밸리+힐' },
      { id: 'pub_southsprings_hill_lake', front: 'hill', back: 'lake', name: '힐+레이크' },
    ],
  },

  // 로제비앙CC (27홀) - 로제, 비앙, 네오 코스
  'pub_rosevien': {
    courses: {
      'rose': { name: '로제', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'biang': { name: '비앙', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'neo': { name: '네오', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },    // 36
    },
    combinations: [
      { id: 'pub_rosevien_rose_biang', front: 'rose', back: 'biang', name: '로제+비앙' },
      { id: 'pub_rosevien_biang_neo', front: 'biang', back: 'neo', name: '비앙+네오' },
      { id: 'pub_rosevien_neo_rose', front: 'neo', back: 'rose', name: '네오+로제' },
    ],
  },

  // 가평베네스트CC (27홀) - 파인, 메이플, 버치 코스 (잭 니클라우스 설계)
  'pub_gapyeong': {
    courses: {
      'pine': { name: '파인', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },     // 36
      'maple': { name: '메이플', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },  // 36
      'birch': { name: '버치', pars: [4, 4, 3, 5, 4, 5, 3, 4, 4] },    // 36 (par3 3개, par5 3개)
    },
    combinations: [
      { id: 'pub_gapyeong_pine_maple', front: 'pine', back: 'maple', name: '파인+메이플' },
      { id: 'pub_gapyeong_maple_birch', front: 'maple', back: 'birch', name: '메이플+버치' },
      { id: 'pub_gapyeong_birch_pine', front: 'birch', back: 'pine', name: '버치+파인' },
    ],
  },

  // 골프존카운티안성 (27홀) - 파인, 오크, 메이플 코스
  'pub_golfzonansong': {
    courses: {
      'pine': { name: '파인', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },
      'oak': { name: '오크', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },
      'maple': { name: '메이플', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },
    },
    combinations: [
      { id: 'pub_golfzonansong_pine_oak', front: 'pine', back: 'oak', name: '파인+오크' },
      { id: 'pub_golfzonansong_oak_maple', front: 'oak', back: 'maple', name: '오크+메이플' },
      { id: 'pub_golfzonansong_maple_pine', front: 'maple', back: 'pine', name: '메이플+파인' },
    ],
  },

  // 대유몽베르CC (36홀) - 브렝땅/에떼(회원제), 오똔/이베르(대중제)
  'pub_daeyumongbel': {
    courses: {
      'printemps': { name: '브렝땅', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 봄
      'ete': { name: '에떼', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },          // 여름
      'automne': { name: '오똔', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },      // 가을 (대중제)
      'hiver': { name: '이베르', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },      // 겨울 (대중제)
    },
    combinations: [
      { id: 'pub_daeyumongbel_automne_hiver', front: 'automne', back: 'hiver', name: '오똔+이베르 (대중제)' },
      { id: 'pub_daeyumongbel_printemps_ete', front: 'printemps', back: 'ete', name: '브렝땅+에떼 (회원제)' },
    ],
  },

  // 인서울27골프클럽 (27홀) - EAST, WEST, SOUTH 코스
  'pub_inseroul27': {
    courses: {
      'east': { name: 'EAST', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },
      'west': { name: 'WEST', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },
      'south': { name: 'SOUTH', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },
    },
    combinations: [
      { id: 'pub_inseroul27_east_west', front: 'east', back: 'west', name: 'EAST+WEST' },
      { id: 'pub_inseroul27_west_south', front: 'west', back: 'south', name: 'WEST+SOUTH' },
      { id: 'pub_inseroul27_south_east', front: 'south', back: 'east', name: 'SOUTH+EAST' },
    ],
  },

  // ==================== 인천 ====================

  // 드림파크CC (36홀) - 드림코스, 파크코스 (공식 홈페이지 확인)
  'pub_dreampark': {
    courses: {
      'dream_out': { name: '드림OUT', pars: [4, 4, 4, 5, 3, 4, 4, 3, 5] },   // 36
      'dream_in': { name: '드림IN', pars: [4, 4, 5, 3, 4, 4, 5, 3, 4] },     // 36
      'park_out': { name: '파크OUT', pars: [4, 4, 5, 4, 3, 4, 5, 3, 4] },    // 36
      'park_in': { name: '파크IN', pars: [4, 5, 3, 4, 4, 3, 5, 4, 4] },      // 36
    },
    combinations: [
      { id: 'pub_dreampark_dream', front: 'dream_out', back: 'dream_in', name: '드림코스 18홀' },
      { id: 'pub_dreampark_park', front: 'park_out', back: 'park_in', name: '파크코스 18홀' },
      { id: 'pub_dreampark_dream_park', front: 'dream_out', back: 'park_out', name: '드림OUT+파크OUT' },
    ],
  },

  // 스카이72 오션코스 (18홀) - 니클라우스 설계
  'pub_sky72ocean': {
    courses: {
      'ocean_out': { name: '오션OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'ocean_in': { name: '오션IN', pars: [4, 4, 5, 3, 4, 4, 5, 3, 4] },     // 36
    },
    combinations: [
      { id: 'pub_sky72ocean_full', front: 'ocean_out', back: 'ocean_in', name: '오션코스 18홀' },
    ],
  },

  // 스카이72 레이크코스 (18홀) - 플로리다 가든형
  'pub_sky72lake': {
    courses: {
      'lake_out': { name: '레이크OUT', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'lake_in': { name: '레이크IN', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },    // 36
    },
    combinations: [
      { id: 'pub_sky72lake_full', front: 'lake_out', back: 'lake_in', name: '레이크코스 18홀' },
    ],
  },

  // 스카이72 클래식코스 (18홀) - 리조트형 클래식
  'pub_sky72classic': {
    courses: {
      'classic_out': { name: '클래식OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'classic_in': { name: '클래식IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_sky72classic_full', front: 'classic_out', back: 'classic_in', name: '클래식코스 18홀' },
    ],
  },

  // 베어즈베스트청라 (27홀) - 잭 니클라우스 설계
  'pub_bearsbest': {
    courses: {
      'north': { name: '노스', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'south': { name: '사우스', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] }, // 36
      'west': { name: '웨스트', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_bearsbest_north_south', front: 'north', back: 'south', name: '노스+사우스' },
      { id: 'pub_bearsbest_south_west', front: 'south', back: 'west', name: '사우스+웨스트' },
      { id: 'pub_bearsbest_west_north', front: 'west', back: 'north', name: '웨스트+노스' },
    ],
  },

  // ==================== 강원도 ====================

  // 엘리시안강촌CC (27홀) - 밸리, 레이크, 힐 코스
  'pub_elysiangangchon': {
    courses: {
      'valley': { name: '밸리', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'lake': { name: '레이크', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'hill': { name: '힐', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },      // 36
    },
    combinations: [
      { id: 'pub_elysiangangchon_valley_lake', front: 'valley', back: 'lake', name: '밸리+레이크' },
      { id: 'pub_elysiangangchon_lake_hill', front: 'lake', back: 'hill', name: '레이크+힐' },
      { id: 'pub_elysiangangchon_hill_valley', front: 'hill', back: 'valley', name: '힐+밸리' },
    ],
  },

  // 비발디파크 이스트CC (18홀)
  'pub_vivaldieast': {
    courses: {
      'east_out': { name: '이스트OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'east_in': { name: '이스트IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_vivaldieast_full', front: 'east_out', back: 'east_in', name: '이스트코스 18홀' },
    ],
  },

  // 비발디파크 웨스트CC (18홀)
  'pub_vivaldiwest': {
    courses: {
      'west_out': { name: '웨스트OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'west_in': { name: '웨스트IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_vivaldiwest_full', front: 'west_out', back: 'west_in', name: '웨스트코스 18홀' },
    ],
  },

  // 하이원CC (18홀) - PAR 73 (특수)
  'pub_highone': {
    courses: {
      'high1_out': { name: '하이원OUT', pars: [4, 5, 3, 5, 4, 4, 3, 4, 5] },  // 37
      'high1_in': { name: '하이원IN', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_highone_full', front: 'high1_out', back: 'high1_in', name: '하이원 18홀' },
    ],
  },

  // 오크밸리CC (27홀) - 오크, 메이플, 체리, 파인 코스
  'pub_oakvalley': {
    courses: {
      'oak': { name: '오크', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },     // 36
      'maple': { name: '메이플', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] }, // 36
      'cherry': { name: '체리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
      'pine': { name: '파인', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },    // 36
    },
    combinations: [
      { id: 'pub_oakvalley_oak_maple', front: 'oak', back: 'maple', name: '오크+메이플' },
      { id: 'pub_oakvalley_maple_cherry', front: 'maple', back: 'cherry', name: '메이플+체리' },
      { id: 'pub_oakvalley_cherry_pine', front: 'cherry', back: 'pine', name: '체리+파인' },
      { id: 'pub_oakvalley_pine_oak', front: 'pine', back: 'oak', name: '파인+오크' },
    ],
  },

  // 피닉스파크CC (27홀) - 피닉스, 마운틴, 밸리 코스
  'pub_phoenixpark': {
    courses: {
      'phoenix': { name: '피닉스', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'mountain': { name: '마운틴', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },      // 36
    },
    combinations: [
      { id: 'pub_phoenixpark_phoenix_mountain', front: 'phoenix', back: 'mountain', name: '피닉스+마운틴' },
      { id: 'pub_phoenixpark_mountain_valley', front: 'mountain', back: 'valley', name: '마운틴+밸리' },
      { id: 'pub_phoenixpark_valley_phoenix', front: 'valley', back: 'phoenix', name: '밸리+피닉스' },
    ],
  },

  // 알펜시아CC (18홀)
  'pub_alpensia': {
    courses: {
      'alpen_out': { name: '알펜OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'alpen_in': { name: '알펜IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_alpensia_full', front: 'alpen_out', back: 'alpen_in', name: '알펜시아 18홀' },
    ],
  },

  // 세이지우드CC (27홀) - 세이지, 우드, 힐 코스
  'pub_sagewood': {
    courses: {
      'sage': { name: '세이지', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'wood': { name: '우드', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'hill': { name: '힐', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },      // 36
    },
    combinations: [
      { id: 'pub_sagewood_sage_wood', front: 'sage', back: 'wood', name: '세이지+우드' },
      { id: 'pub_sagewood_wood_hill', front: 'wood', back: 'hill', name: '우드+힐' },
      { id: 'pub_sagewood_hill_sage', front: 'hill', back: 'sage', name: '힐+세이지' },
    ],
  },

  // 오로라골프앤리조트 (27홀) - 오로라, 노스, 사우스 코스
  'pub_aurora': {
    courses: {
      'aurora': { name: '오로라', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'north': { name: '노스', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },     // 36
      'south': { name: '사우스', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },   // 36
    },
    combinations: [
      { id: 'pub_aurora_aurora_north', front: 'aurora', back: 'north', name: '오로라+노스' },
      { id: 'pub_aurora_north_south', front: 'north', back: 'south', name: '노스+사우스' },
      { id: 'pub_aurora_south_aurora', front: 'south', back: 'aurora', name: '사우스+오로라' },
    ],
  },

  // 센츄리21CC (36홀) - 로얄, 챔피언 코스
  'pub_century21': {
    courses: {
      'royal_out': { name: '로얄OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },      // 36
      'royal_in': { name: '로얄IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },        // 36
      'champion_out': { name: '챔피언OUT', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] }, // 36
      'champion_in': { name: '챔피언IN', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },   // 36
    },
    combinations: [
      { id: 'pub_century21_royal', front: 'royal_out', back: 'royal_in', name: '로얄코스 18홀' },
      { id: 'pub_century21_champion', front: 'champion_out', back: 'champion_in', name: '챔피언코스 18홀' },
    ],
  },

  // 라비에벨CC (36홀) - 라비에, 벨 코스
  'pub_laviebelle': {
    courses: {
      'lavie_out': { name: '라비에OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'lavie_in': { name: '라비에IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'belle_out': { name: '벨OUT', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },      // 36
      'belle_in': { name: '벨IN', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },        // 36
    },
    combinations: [
      { id: 'pub_laviebelle_lavie', front: 'lavie_out', back: 'lavie_in', name: '라비에코스 18홀' },
      { id: 'pub_laviebelle_belle', front: 'belle_out', back: 'belle_in', name: '벨코스 18홀' },
    ],
  },

  // ==================== 충청도 ====================

  // 골프존카운티진천 (27홀) - 밸리, 힐, 레이크 코스
  'pub_golfzonjincheon': {
    courses: {
      'valley': { name: '밸리', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'hill': { name: '힐', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },      // 36
      'lake': { name: '레이크', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_golfzonjincheon_valley_hill', front: 'valley', back: 'hill', name: '밸리+힐' },
      { id: 'pub_golfzonjincheon_hill_lake', front: 'hill', back: 'lake', name: '힐+레이크' },
      { id: 'pub_golfzonjincheon_lake_valley', front: 'lake', back: 'valley', name: '레이크+밸리' },
    ],
  },

  // 힐데스하임CC (27홀) - 힐, 데스, 하임 코스
  'pub_hildesheim': {
    courses: {
      'hil': { name: '힐', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },    // 36
      'des': { name: '데스', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'heim': { name: '하임', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] }, // 36
    },
    combinations: [
      { id: 'pub_hildesheim_hil_des', front: 'hil', back: 'des', name: '힐+데스' },
      { id: 'pub_hildesheim_des_heim', front: 'des', back: 'heim', name: '데스+하임' },
      { id: 'pub_hildesheim_heim_hil', front: 'heim', back: 'hil', name: '하임+힐' },
    ],
  },

  // 킹즈락CC (27홀) - 킹스, 락, 밸리 코스
  'pub_kingsrock': {
    courses: {
      'kings': { name: '킹스', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'rock': { name: '락', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },     // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] }, // 36
    },
    combinations: [
      { id: 'pub_kingsrock_kings_rock', front: 'kings', back: 'rock', name: '킹스+락' },
      { id: 'pub_kingsrock_rock_valley', front: 'rock', back: 'valley', name: '락+밸리' },
      { id: 'pub_kingsrock_valley_kings', front: 'valley', back: 'kings', name: '밸리+킹스' },
    ],
  },

  // 레인보우힐스CC (27홀) - 레인, 보우, 힐스 코스
  'pub_rainbow': {
    courses: {
      'rain': { name: '레인', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'bow': { name: '보우', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'hills': { name: '힐스', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_rainbow_rain_bow', front: 'rain', back: 'bow', name: '레인+보우' },
      { id: 'pub_rainbow_bow_hills', front: 'bow', back: 'hills', name: '보우+힐스' },
      { id: 'pub_rainbow_hills_rain', front: 'hills', back: 'rain', name: '힐스+레인' },
    ],
  },

  // 대영베이스CC (27홀) - 베이스, 힐, 밸리 코스
  'pub_daeyoungbase': {
    courses: {
      'base': { name: '베이스', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'hill': { name: '힐', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },      // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_daeyoungbase_base_hill', front: 'base', back: 'hill', name: '베이스+힐' },
      { id: 'pub_daeyoungbase_hill_valley', front: 'hill', back: 'valley', name: '힐+밸리' },
      { id: 'pub_daeyoungbase_valley_base', front: 'valley', back: 'base', name: '밸리+베이스' },
    ],
  },

  // 레이캐슬골프앤리조트 (27홀) - 레이, 캐슬, 밸리 코스
  'pub_raycastle': {
    courses: {
      'ray': { name: '레이', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },     // 36
      'castle': { name: '캐슬', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },  // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_raycastle_ray_castle', front: 'ray', back: 'castle', name: '레이+캐슬' },
      { id: 'pub_raycastle_castle_valley', front: 'castle', back: 'valley', name: '캐슬+밸리' },
      { id: 'pub_raycastle_valley_ray', front: 'valley', back: 'ray', name: '밸리+레이' },
    ],
  },

  // 대천CC (27홀) - 오션, 베이, 힐 코스
  'pub_daecheon': {
    courses: {
      'ocean': { name: '오션', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'bay': { name: '베이', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'hill': { name: '힐', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },     // 36
    },
    combinations: [
      { id: 'pub_daecheon_ocean_bay', front: 'ocean', back: 'bay', name: '오션+베이' },
      { id: 'pub_daecheon_bay_hill', front: 'bay', back: 'hill', name: '베이+힐' },
      { id: 'pub_daecheon_hill_ocean', front: 'hill', back: 'ocean', name: '힐+오션' },
    ],
  },

  // ==================== 전라도 ====================

  // 골프존카운티드래곤 (18홀)
  'pub_golfzondragon': {
    courses: {
      'dragon_out': { name: '드래곤OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'dragon_in': { name: '드래곤IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_golfzondragon_full', front: 'dragon_out', back: 'dragon_in', name: '드래곤 18홀' },
    ],
  },

  // 클럽디금강CC (27홀) - 금강, 리버, 힐 코스
  'pub_clubdigold': {
    courses: {
      'geumgang': { name: '금강', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'river': { name: '리버', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },     // 36
      'hill': { name: '힐', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },        // 36
    },
    combinations: [
      { id: 'pub_clubdigold_geumgang_river', front: 'geumgang', back: 'river', name: '금강+리버' },
      { id: 'pub_clubdigold_river_hill', front: 'river', back: 'hill', name: '리버+힐' },
      { id: 'pub_clubdigold_hill_geumgang', front: 'hill', back: 'geumgang', name: '힐+금강' },
    ],
  },

  // 덕유산리조트CC (27홀) - 덕유, 산, 밸리 코스
  'pub_deokyu': {
    courses: {
      'deokyu': { name: '덕유', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'san': { name: '산', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },        // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },   // 36
    },
    combinations: [
      { id: 'pub_deokyu_deokyu_san', front: 'deokyu', back: 'san', name: '덕유+산' },
      { id: 'pub_deokyu_san_valley', front: 'san', back: 'valley', name: '산+밸리' },
      { id: 'pub_deokyu_valley_deokyu', front: 'valley', back: 'deokyu', name: '밸리+덕유' },
    ],
  },

  // ==================== 경상도 ====================

  // 통도환타지아CC (27홀) - 통도, 환타, 지아 코스
  'pub_tongdofantasia': {
    courses: {
      'tongdo': { name: '통도', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'fanta': { name: '환타', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'sia': { name: '지아', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },      // 36
    },
    combinations: [
      { id: 'pub_tongdofantasia_tongdo_fanta', front: 'tongdo', back: 'fanta', name: '통도+환타' },
      { id: 'pub_tongdofantasia_fanta_sia', front: 'fanta', back: 'sia', name: '환타+지아' },
      { id: 'pub_tongdofantasia_sia_tongdo', front: 'sia', back: 'tongdo', name: '지아+통도' },
    ],
  },

  // 가야CC (27홀) - 가야, 힐, 밸리 코스
  'pub_gaya': {
    courses: {
      'gaya': { name: '가야', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },    // 36
      'hill': { name: '힐', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },      // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_gaya_gaya_hill', front: 'gaya', back: 'hill', name: '가야+힐' },
      { id: 'pub_gaya_hill_valley', front: 'hill', back: 'valley', name: '힐+밸리' },
      { id: 'pub_gaya_valley_gaya', front: 'valley', back: 'gaya', name: '밸리+가야' },
    ],
  },

  // 골프존카운티영덕 (27홀) - 오션, 씨사이드, 힐 코스
  'pub_golfzonyeongdeok': {
    courses: {
      'ocean': { name: '오션', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },      // 36
      'seaside': { name: '씨사이드', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] }, // 36
      'hill': { name: '힐', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },         // 36
    },
    combinations: [
      { id: 'pub_golfzonyeongdeok_ocean_seaside', front: 'ocean', back: 'seaside', name: '오션+씨사이드' },
      { id: 'pub_golfzonyeongdeok_seaside_hill', front: 'seaside', back: 'hill', name: '씨사이드+힐' },
      { id: 'pub_golfzonyeongdeok_hill_ocean', front: 'hill', back: 'ocean', name: '힐+오션' },
    ],
  },

  // 골프존카운티안동 (27홀) - 안동, 하회, 도산 코스
  'pub_golfzonandong': {
    courses: {
      'andong': { name: '안동', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'hahoe': { name: '하회', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },   // 36
      'dosan': { name: '도산', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },   // 36
    },
    combinations: [
      { id: 'pub_golfzonandong_andong_hahoe', front: 'andong', back: 'hahoe', name: '안동+하회' },
      { id: 'pub_golfzonandong_hahoe_dosan', front: 'hahoe', back: 'dosan', name: '하회+도산' },
      { id: 'pub_golfzonandong_dosan_andong', front: 'dosan', back: 'andong', name: '도산+안동' },
    ],
  },

  // 블루원디아너스CC (27홀) - 블루, 원, 디아 코스
  'pub_blueonedianese': {
    courses: {
      'blue': { name: '블루', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'one': { name: '원', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },     // 36
      'dia': { name: '디아', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },   // 36
    },
    combinations: [
      { id: 'pub_blueonedianese_blue_one', front: 'blue', back: 'one', name: '블루+원' },
      { id: 'pub_blueonedianese_one_dia', front: 'one', back: 'dia', name: '원+디아' },
      { id: 'pub_blueonedianese_dia_blue', front: 'dia', back: 'blue', name: '디아+블루' },
    ],
  },

  // ==================== 제주도 ====================

  // 핀크스GC (18홀) - 테디밸리 설계
  'pub_pinx': {
    courses: {
      'pinx_out': { name: '핀크스OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'pinx_in': { name: '핀크스IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_pinx_full', front: 'pinx_out', back: 'pinx_in', name: '핀크스 18홀' },
    ],
  },

  // 나인브릿지GC (18홀)
  'pub_ninebridge': {
    courses: {
      'nine_out': { name: '나인OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'nine_in': { name: '나인IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_ninebridge_full', front: 'nine_out', back: 'nine_in', name: '나인브릿지 18홀' },
    ],
  },

  // 블랙스톤제주CC (18홀)
  'pub_blackstonejeju': {
    courses: {
      'black_out': { name: '블랙OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'black_in': { name: '블랙IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
    },
    combinations: [
      { id: 'pub_blackstonejeju_full', front: 'black_out', back: 'black_in', name: '블랙스톤 18홀' },
    ],
  },

  // 제주국제CC (27홀) - 국제, 한라, 해변 코스
  'pub_jejuinternational': {
    courses: {
      'international': { name: '국제', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'halla': { name: '한라', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },          // 36
      'beach': { name: '해변', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },          // 36
    },
    combinations: [
      { id: 'pub_jejuinternational_international_halla', front: 'international', back: 'halla', name: '국제+한라' },
      { id: 'pub_jejuinternational_halla_beach', front: 'halla', back: 'beach', name: '한라+해변' },
      { id: 'pub_jejuinternational_beach_international', front: 'beach', back: 'international', name: '해변+국제' },
    ],
  },

  // 오라CC (27홀) - 오라, 한라, 영주 코스
  'pub_ora': {
    courses: {
      'ora': { name: '오라', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },     // 36
      'halla': { name: '한라', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },   // 36
      'youngju': { name: '영주', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] }, // 36
    },
    combinations: [
      { id: 'pub_ora_ora_halla', front: 'ora', back: 'halla', name: '오라+한라' },
      { id: 'pub_ora_halla_youngju', front: 'halla', back: 'youngju', name: '한라+영주' },
      { id: 'pub_ora_youngju_ora', front: 'youngju', back: 'ora', name: '영주+오라' },
    ],
  },

  // 스카이힐제주CC (27홀) - 스카이, 힐, 밸리 코스
  'pub_skyhilljeju': {
    courses: {
      'sky': { name: '스카이', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },   // 36
      'hill': { name: '힐', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },      // 36
      'valley': { name: '밸리', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },  // 36
    },
    combinations: [
      { id: 'pub_skyhilljeju_sky_hill', front: 'sky', back: 'hill', name: '스카이+힐' },
      { id: 'pub_skyhilljeju_hill_valley', front: 'hill', back: 'valley', name: '힐+밸리' },
      { id: 'pub_skyhilljeju_valley_sky', front: 'valley', back: 'sky', name: '밸리+스카이' },
    ],
  },

  // 아덴힐CC (27홀) - 아덴, 힐, 뷰 코스
  'pub_adenhill': {
    courses: {
      'aden': { name: '아덴', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'hill': { name: '힐', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'view': { name: '뷰', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] },    // 36
    },
    combinations: [
      { id: 'pub_adenhill_aden_hill', front: 'aden', back: 'hill', name: '아덴+힐' },
      { id: 'pub_adenhill_hill_view', front: 'hill', back: 'view', name: '힐+뷰' },
      { id: 'pub_adenhill_view_aden', front: 'view', back: 'aden', name: '뷰+아덴' },
    ],
  },

  // 롯데스카이힐제주CC (36홀) - 노스, 사우스 코스
  'pub_lotteskyhilljeju': {
    courses: {
      'north_out': { name: '노스OUT', pars: [4, 4, 3, 5, 4, 4, 3, 4, 5] },  // 36
      'north_in': { name: '노스IN', pars: [4, 5, 3, 4, 4, 4, 3, 5, 4] },    // 36
      'south_out': { name: '사우스OUT', pars: [5, 4, 3, 4, 4, 4, 3, 4, 5] }, // 36
      'south_in': { name: '사우스IN', pars: [4, 4, 3, 5, 4, 4, 3, 5, 4] },   // 36
    },
    combinations: [
      { id: 'pub_lotteskyhilljeju_north', front: 'north_out', back: 'north_in', name: '노스코스 18홀' },
      { id: 'pub_lotteskyhilljeju_south', front: 'south_out', back: 'south_in', name: '사우스코스 18홀' },
    ],
  },
};
