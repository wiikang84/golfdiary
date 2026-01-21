const https = require('https');
const fs = require('fs');

// 골프존 API에서 난이도 데이터 가져오기
const API_URL = 'https://lobby.golfzon.com/v1/courses/course/search/list';

async function fetchPage(page) {
  return new Promise((resolve, reject) => {
    const url = `${API_URL}?page=${page}&softwareType=0&orderType=0&searchWord=&ciVersion=0&areaNo=0`;

    https.get(url, {
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'Origin': 'https://www.golfzon.com',
        'Referer': 'https://www.golfzon.com/',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function fetchAllDifficulty() {
  console.log('골프존 API에서 난이도 데이터 수집 중...\n');

  let allCourses = [];
  let page = 1;
  const maxPages = 60; // 페이지당 10개 × 60페이지 = 600개 (509개 충분히 커버)

  while (page <= maxPages) {
    try {
      process.stdout.write(`\r페이지 ${page}/${maxPages} 가져오는 중... (현재 ${allCourses.length}개)`);
      const response = await fetchPage(page);

      if (response && response.length > 0) {
        allCourses = allCourses.concat(response);
        page++;
      } else {
        // 더 이상 데이터가 없으면 종료
        break;
      }

      // API 부하 방지를 위한 딜레이
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`\n페이지 ${page} 오류:`, err.message);
      break;
    }
  }

  console.log(`\n\n총 ${allCourses.length}개 코스 수집 완료`);

  console.log(`\n총 ${allCourses.length}개 코스 수집 완료`);

  // 난이도 + 로고 데이터 추출
  const difficultyData = {};
  allCourses.forEach(course => {
    difficultyData[`golfzon_${course.ciCode}`] = {
      ciCode: course.ciCode,
      name: course.ccName,
      difficultyCc: course.difficultyCc || 0,      // 코스 난이도 (0-10)
      difficultyGreen: course.difficultyGreen || 0, // 그린 난이도 (0-10)
      totalWidth: course.totalWidth,                // 총 거리
      holeCount: course.holeCount,
      parCount: course.parCount,
      logoImage: course.logoImage || null,          // 로고 이미지 URL
      address: course.address,                      // 지역
    };
  });

  // JSON 파일로 저장
  fs.writeFileSync(
    './src/data/golfzonDifficulty.json',
    JSON.stringify(difficultyData, null, 2),
    'utf8'
  );
  console.log('\n✓ src/data/golfzonDifficulty.json 저장 완료');

  // 통계 출력
  const difficulties = Object.values(difficultyData);
  const ccAvg = difficulties.reduce((s, d) => s + d.difficultyCc, 0) / difficulties.length;
  const greenAvg = difficulties.reduce((s, d) => s + d.difficultyGreen, 0) / difficulties.length;

  console.log('\n=== 난이도 통계 ===');
  console.log(`코스 난이도 평균: ${ccAvg.toFixed(1)}`);
  console.log(`그린 난이도 평균: ${greenAvg.toFixed(1)}`);

  // 난이도 분포
  const ccDist = {};
  const greenDist = {};
  difficulties.forEach(d => {
    ccDist[d.difficultyCc] = (ccDist[d.difficultyCc] || 0) + 1;
    greenDist[d.difficultyGreen] = (greenDist[d.difficultyGreen] || 0) + 1;
  });

  console.log('\n코스 난이도 분포:');
  Object.keys(ccDist).sort((a,b) => a-b).forEach(k => {
    const stars = '★'.repeat(Math.ceil(k/2)) + '☆'.repeat(5 - Math.ceil(k/2));
    console.log(`  ${k}점 (${stars}): ${ccDist[k]}개`);
  });

  console.log('\n그린 난이도 분포:');
  Object.keys(greenDist).sort((a,b) => a-b).forEach(k => {
    const stars = '★'.repeat(Math.ceil(k/2)) + '☆'.repeat(5 - Math.ceil(k/2));
    console.log(`  ${k}점 (${stars}): ${greenDist[k]}개`);
  });
}

fetchAllDifficulty().catch(console.error);
