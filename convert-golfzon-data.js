const fs = require('fs');

// 파일 읽고 앞뒤 따옴표 제거
let rawData = fs.readFileSync('./골프존홀정보.txt', 'utf8');
if (rawData.startsWith("'")) rawData = rawData.slice(1);
if (rawData.endsWith("'")) rawData = rawData.slice(0, -1);

const data = JSON.parse(rawData);

console.log('전체 골프장 수:', data.length);

// 지역 매핑 (골프존 원본 → 앱 표시)
const regionMapping = {
  '수도권': '수도권',
  '강원도': '강원도',
  '충청도': '충청도',
  '전라도': '전라도',
  '경상도': '경상도',
  '제주도': '제주도',
  '가상CC': '가상CC',
  // 해외는 모두 '해외'로 통합
  '미국': '해외',
  '일본': '해외',
  '중국': '해외',
  '베트남': '해외',
  '태국': '해외',
  '필리핀': '해외',
  '유럽': '해외',
  '기타': '해외',
};

// 1. 전체 골프장 목록 생성
const allClubs = data.map(club => {
  const totalHoles = club.courses.length * 9;

  // 총 거리 계산 (프론트티 기준)
  let totalDistance = 0;
  if (club.holes) {
    club.holes.forEach(courseHoles => {
      if (courseHoles) {
        courseHoles.forEach(hole => {
          totalDistance += hole.frontTee || 0;
        });
      }
    });
  }

  // 지역 변환
  const displayRegion = regionMapping[club.address] || '해외';

  return {
    id: `golfzon_${club.ciCode}`,
    ciCode: club.ciCode,
    name: club.name,
    region: displayRegion,
    originalRegion: club.address, // 원본 지역 (미국, 일본 등)
    city: '',
    type: 'field',
    membership: 'public',
    totalHoles: totalHoles,
    totalDistance: totalDistance,
    courses: club.courses.map(c => c.courseName),
    isGolfzon: true,
  };
});

// 2. 홀 상세 정보 생성 (PAR 포함)
const holeDetails = {};
data.forEach(club => {
  const clubKey = `golfzon_${club.ciCode}`;
  holeDetails[clubKey] = {
    name: club.name,
    parCount: club.parCount,
    courses: club.courses.map((course, courseIdx) => ({
      courseName: course.courseName,
      ciNum: course.ciNum,
      holes: club.holes[courseIdx] ? club.holes[courseIdx].map(hole => ({
        holeNo: hole.holeNo,
        par: hole.basicPar,
        backTee: hole.backTee,
        champTee: hole.champTee,
        frontTee: hole.frontTee,
        ladyTee: hole.ladyTee,
        seniorTee: hole.seniorTee,
        heightDiff: hole.heightBackTee,
        description: hole.description || '',
      })) : []
    }))
  };
});

// 3. 파일 저장
const clubsExport = `// 골프존 골프장 데이터 (${allClubs.length}개 전체 골프장)
// 국내 + 해외 + 가상CC 포함
// 자동 생성됨 - 직접 수정하지 마세요
// 생성일: ${new Date().toISOString().split('T')[0]}

export const GOLFZON_CLUBS = ${JSON.stringify(allClubs, null, 2)};

// 지역 카테고리 (골프존 공식 분류)
export const GOLFZON_REGIONS = [
  '전체',
  '수도권',
  '강원도',
  '충청도',
  '전라도',
  '경상도',
  '제주도',
  '해외',
  '가상CC'
];

// 원본 지역 목록 (상세 분류용)
export const GOLFZON_ORIGINAL_REGIONS = [
  '수도권', '강원도', '충청도', '전라도', '경상도', '제주도',
  '미국', '일본', '중국', '베트남', '태국', '필리핀', '유럽', '기타',
  '가상CC'
];

export default GOLFZON_CLUBS;
`;

fs.writeFileSync('./src/data/golfzonClubs.js', clubsExport, 'utf8');
console.log('✓ src/data/golfzonClubs.js 생성 완료');

// 홀 상세 정보 (JSON)
fs.writeFileSync('./src/data/golfzonHoles.json', JSON.stringify(holeDetails, null, 2), 'utf8');
console.log('✓ src/data/golfzonHoles.json 생성 완료');

// 통계 출력
console.log('\n=== 생성된 데이터 통계 ===');
console.log('전체 골프장:', allClubs.length + '개');

// 지역별 통계
const byRegion = {};
allClubs.forEach(c => {
  byRegion[c.region] = (byRegion[c.region] || 0) + 1;
});
console.log('\n지역별:');
['수도권', '강원도', '충청도', '전라도', '경상도', '제주도', '해외', '가상CC'].forEach(r => {
  if (byRegion[r]) console.log(`  ${r}: ${byRegion[r]}개`);
});

// 27홀 이상
const multiCourse = allClubs.filter(c => c.totalHoles >= 27);
console.log('\n27홀 이상:', multiCourse.length + '개');
multiCourse.forEach(c => {
  console.log(`  - ${c.name} (${c.originalRegion}): ${c.courses.join(', ')} (${c.totalHoles}홀)`);
});

// PAR 샘플 확인
console.log('\n=== PAR 정보 샘플 ===');
const samples = allClubs.slice(0, 3);
samples.forEach(club => {
  const holeData = holeDetails[club.id];
  if (holeData && holeData.courses) {
    console.log(`\n${club.name}:`);
    holeData.courses.forEach(course => {
      const pars = course.holes.map(h => h.par);
      console.log(`  ${course.courseName}: ${pars.join('-')} (합계: ${pars.reduce((a,b) => a+b, 0)})`);
    });
  }
});
