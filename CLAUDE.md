# Golf Diary (골프 다이어리)

> 스크린 골프 라운드 및 연습 기록 관리 앱

## 프로젝트 개요

| 구분 | 내용 |
|------|------|
| 앱 이름 | Golf Diary |
| 패키지 | com.bitnappa.golfdiary |
| 현재 버전 | v1.4.3 (versionCode 8) |
| 프레임워크 | React Native (Expo) |
| 플랫폼 | Android (iOS 지원 가능) |

## 주요 기능

### 라운드 기록
- 홀별 스코어 입력 (18홀)
- PAR 터치로 빠른 수정
- 스코어 용어 자동 계산 (버디, 파, 보기, 더블보기, 트리플보기, 쿼드러플보기)
- 라운드 수정/삭제

### 연습 기록
- 연습 시간, 타수, 메모 기록
- 연습 기록 수정/삭제

### 통계
- 평균 스코어, 베스트 스코어
- 월별/연도별 통계
- 라운드 횟수 추이

### 골프장 데이터
- 전국 대중제 골프장 DB (golfCourses.js)
- 골프존 스크린골프 코스 데이터 (golfzonClubs.js)
- 골프존 코스별 난이도 정보 (golfzonDifficulty.json)
- 골프존 홀 정보 (golfzonHoles.json)

### 설정
- 데이터 백업/복원 (JSON 내보내기/가져오기)
- 백업 분기 기준: 50,000자
- 개인정보처리방침

## 프로젝트 구조

```
golf-app/
├── App.js                    # 앱 진입점
├── app.json                  # Expo 설정
├── package.json
├── src/
│   ├── components/           # 재사용 컴포넌트
│   ├── data/                 # 정적 데이터
│   │   ├── golfCourses.js      # 전국 대중제 골프장
│   │   ├── golfzonClubs.js     # 골프존 클럽 목록
│   │   ├── golfzonDifficulty.json  # 코스 난이도
│   │   ├── golfzonHoles.json   # 홀 상세 정보
│   │   └── quotes.js           # 골프 명언
│   ├── navigation/           # 네비게이션 설정
│   ├── screens/              # 화면 컴포넌트
│   │   ├── HomeScreen.js       # 홈 (라운드 목록)
│   │   ├── RoundScreen.js      # 라운드 입력/수정
│   │   ├── PracticeScreen.js   # 연습 기록
│   │   ├── StatsScreen.js      # 통계
│   │   ├── SettingsScreen.js   # 설정
│   │   └── SummaryScreen.js    # 라운드 요약
│   ├── theme/                # 스타일 테마
│   └── utils/                # 유틸리티 함수
├── assets/                   # 이미지, 아이콘
├── android/                  # Android 네이티브
└── docs/                     # 문서 (개인정보처리방침)
```

## 빠른 시작

```bash
# 의존성 설치
cd golf-app
npm install

# 개발 서버 실행
npm start

# Android 빌드
eas build --platform android --profile preview
```

## 버전 히스토리

### v1.4.3 (2026-01-23)
- 날짜 정렬 기능 개선
- 백업/복원 기능 개선
- 백업 분기 기준 50,000자로 변경
- 사진 기능 제거 (용량 최적화)

### v1.4.2 (2026-01-21)
- 코스명 표시 및 검색 개선

### v1.4.1 (2026-01-21)
- 코스 선택 UI 간소화

### v1.4.0 (2026-01-21)
- 골프존 코스 난이도 및 로고 추가

### v1.3.9 (2026-01-21)
- 골프존 코스 데이터 통합
- +4 쿼드러플 보기 추가

### v1.3.3 (2026-01-20)
- 기능 개선 및 UI 업데이트

### v1.3.0 (2026-01-20)
- 대규모 기능 업데이트

### v1.2.0 (2026-01-19)
- 연습기록 수정/삭제 기능 추가

### v1.1.0 (2026-01-15)
- UI 개선 및 새 기능 추가
- 라운드 수정/삭제 기능
- 전국 대중제 골프장 DB 구축

### v1.0.0 (2026-01-15)
- 초기 버전 출시

## 배포

- **Google Play Store**: 등록 완료
- **빌드 파일**: `golf-diary-v1.4.3-vc8.aab`

## 키스토어

- 파일: `@wiikang__golf-diary.jks`
- 백업: `@wiikang__golf-diary-keystore-backup.zip`
- 인증정보: `@wiikang__golf-diary-keystore-credentials.md`

---

## 변경 로그

### 2026-01-27 - CLAUDE.md 생성
- 프로젝트 문서화
- 지금까지의 개발 히스토리 정리

---

*마지막 업데이트: 2026-01-27*
