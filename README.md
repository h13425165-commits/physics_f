# ThermoLab — 전자기기 냉각 실험실

2022 개정 교육과정 고등학교 2학년 물리학 「Ⅱ. 열과 에너지」 단원 및 전기전자공학 열관리 진로 연계 인터랙티브 탐구 학습 웹앱

---

## 🔬 주요 기능

1. **물리 개념 학습 (7단계 체계적 학습)**
   - 대단원 1. 열과 일 (01. 열전달과 우리 생활, 02. 물질의 상태 변화와 이상 기체, 03. 열역학 제1법칙)
   - 대단원 2. 열기관과 엔트로피 (04. 열기관과 우리 생활, 05. 엔트로피와 열역학 제2법칙, 06. 전기전자공학 심화)
   - 9종 전용 시뮬레이터, KaTeX 공식 및 계산 예제, 3문항 개념 퀴즈, 오답 노트, 핵심 용어 사전 탑재
2. **가설 설정**
   - 3가지 상황별(단열 vs 고전도, 방열 면적, 강제 대류 팬 풍량) 가설 수립 및 예측
3. **가상 실험실 (Lumped Thermal Model Simulator)**
   - CPU 발열량, 히트싱크 재질(구리/알루미늄/철/플라스틱), 방열판 표면적, 냉각 팬 풍량 실시간 4차 룬게쿠타(RK4) 열전달 수치 해석
4. **자동 냉각 제어 실험실**
   - 팬 항시 OFF vs 항시 ON vs 히스테리시스($T_{high}, T_{low}$) 피드백 제어 에너지 절감 및 온도 안정성 비교
5. **엔지니어링 챌린지**
   - 3가지 미션(게이밍 PC 발열 억제, 초저전력 팬 제어, 스마트폰 슬림 패키징) 해결 및 점수/등급 평가
6. **과학 탐구 보고서**
   - 실험 데이터, 가설 검증, 결론 자동 생성 및 인쇄/PDF 내보내기

---

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Charts & Visualization**: Recharts, Canvas Confetti
- **Formulas & Icons**: KaTeX, Lucide React

---

## 🚀 로컬 실행 방법

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행 (로컬 개발)
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속합니다. (※ 주의: 소스 루트의 `index.html`을 파일 탐색기에서 더블클릭하면 브라우저가 `.tsx` TypeScript를 직접 해석할 수 없으므로 반드시 `npm run dev` 명령어로 실행해야 합니다.)

### 3. 웹 배포용 빌드 (프로덕션 배포)
```bash
npm run build
```
빌드가 완료되면 **`dist/`** 폴더 안에 완전히 컴파일된 순수 `index.html`과 `assets/` 파일들이 생성됩니다.

---

## 🌐 웹 호스팅 및 사이트 배포 방법

ThermoLab은 React/Vite 기반 애플리케이션으로, 호스팅 플랫폼에 따라 아래와 같이 배포합니다:

### 1. Vercel 또는 Netlify 배포
프로젝트에 `vercel.json`과 `netlify.toml` 설정 파일이 이미 포함되어 있어, 리포지토리를 연결하면 별도 설정 없이 자동 배포됩니다.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 2. GitHub Pages 배포
- **방법 1 (GitHub Actions - 추천)**:
  `.github/workflows/deploy.yml` 파일이 포함되어 있습니다. GitHub 리포지토리의 **Settings $\rightarrow$ Pages $\rightarrow$ Build and deployment Source**를 **`GitHub Actions`**로 선택하면 푸시 시 자동으로 `dist/` 빌드 및 배포가 완료됩니다.
- **방법 2 (gh-pages 브랜치 배포)**:
  `npm run build` 실행 후 생성된 **`dist`** 폴더의 내용물을 배포 브랜치에 업로드합니다.

