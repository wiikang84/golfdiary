export const golfQuotes = [
  { quote: "연습은 거짓말을 하지 않는다", author: "벤 호건" },
  { quote: "골프는 인생의 축소판이다", author: "바비 존스" },
  { quote: "나쁜 샷은 잊어라, 좋은 샷만 기억하라", author: "잭 니클라우스" },
  { quote: "스윙은 느리게, 결과는 빠르게", author: "어니 엘스" },
  { quote: "자신감은 가장 중요한 클럽이다", author: "타이거 우즈" },
  { quote: "골프에서 가장 중요한 거리는 귀와 귀 사이다", author: "바비 존스" },
  { quote: "성공은 준비와 기회가 만나는 곳이다", author: "바비 존스" },
  { quote: "골프는 가장 가까운 게임이 아니라 가장 먼 게임이다", author: "벤 호건" },
  { quote: "좋은 골프는 좋은 실수를 하는 것이다", author: "타이거 우즈" },
  { quote: "그립을 가볍게 잡아라, 새가 날아가지 않을 정도로", author: "샘 스니드" },
  { quote: "골프는 한 번에 한 샷씩 치는 것이다", author: "바비 존스" },
  { quote: "최고의 스윙은 가장 자연스러운 스윙이다", author: "벤 호건" },
  { quote: "퍼팅은 골프의 절반이다", author: "바비 로크" },
  { quote: "드라이버는 쇼, 퍼팅은 돈이다", author: "바비 존스" },
  { quote: "골프에서 가장 중요한 샷은 다음 샷이다", author: "벤 호건" },
  { quote: "머리를 고정하고 공을 봐라", author: "잭 니클라우스" },
  { quote: "느린 백스윙이 정확한 샷을 만든다", author: "바비 존스" },
  { quote: "골프는 평생 배워도 부족한 게임이다", author: "아놀드 파머" },
  { quote: "좋은 템포는 좋은 스윙의 기초다", author: "어니 엘스" },
  { quote: "골프장에서 화내면 이미 진 것이다", author: "샘 스니드" },
  { quote: "인내심이 골프의 열쇠다", author: "잭 니클라우스" },
  { quote: "한 번의 좋은 샷이 다음 라운드를 기대하게 만든다", author: "벤 호건" },
  { quote: "골프는 겸손을 가르친다", author: "아놀드 파머" },
  { quote: "실패를 두려워하지 마라, 시도하지 않는 것을 두려워하라", author: "아놀드 파머" },
  { quote: "집중력이 스윙보다 중요하다", author: "타이거 우즈" },
  { quote: "좋은 피니시가 좋은 스윙을 증명한다", author: "데이비드 레드베터" },
  { quote: "골프는 자신과의 싸움이다", author: "바비 존스" },
  { quote: "한 홀씩, 한 샷씩 집중하라", author: "잭 니클라우스" },
  { quote: "어드레스에서 모든 것이 결정된다", author: "벤 호건" },
  { quote: "골프는 정직한 게임이다", author: "바비 존스" },
];

export const getTodayQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % golfQuotes.length;
  return golfQuotes[index];
};
