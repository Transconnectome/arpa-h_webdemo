# ARPA-H AI Foundation Model Demo

> **Restricted Access** — 이 데모 페이지는 접근 코드가 필요합니다.

ARPA-H 과제를 위한 AI Foundation Model 시연 웹페이지입니다.
뇌영상(fMRI) 및 뇌파(EEG/iEEG) 데이터에 대한 AI 파운데이션 모델의 임상 예측 파이프라인을 인터랙티브하게 시연합니다.

## Live Demo

🔗 https://transconnectome.github.io/arpa-h_webdemo/

## Overview

패럴랙스 스크롤 원페이지로 구성된 5단계 AI 파이프라인 시연:

| Step | Section | Description |
|:----:|---------|-------------|
| — | **Hero** | AI Foundation Model의 필요성 (모션 그래픽) |
| 01 | **Data Upload** | 뇌영상/뇌파 데이터 업로드 → 확장자 기반 모달리티 자동 분류 |
| 02 | **Model Selection** | 모달리티에 따른 Foundation Model 자동 선택 (SWIFT / DIVER / VLM) |
| 03 | **Task Selection** | 임상 예측 과제 선택 (MCI→AD, MDD, OCD, 치료반응) |
| 04 | **Progress** | 모델 처리 파이프라인 시각화 |
| 05 | **Results** | 예측 결과 및 성능 메트릭 시각화 (Accuracy, AUC 등) |

## Foundation Models

| Model | Modality | Description |
|-------|----------|-------------|
| **SWIFT** | fMRI | Spatiotemporal representation learning for functional brain imaging |
| **DIVER** | EEG / iEEG | Foundation model for electrophysiological brain signals |
| **VLM** | Visual / Structural | Vision-language model for structural brain imaging |

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, GSAP |
| Charts | Chart.js + react-chartjs-2 |
| Deployment | GitHub Pages (via GitHub Actions) |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

`main` 브랜치에 push 시 GitHub Actions를 통해 자동 배포됩니다.
수동 배포가 필요한 경우:

```bash
gh workflow run "Deploy to GitHub Pages" --repo Transconnectome/arpa-h_webdemo --ref main
```

## Project Structure

```
src/
├── components/          # 재사용 컴포넌트
│   ├── CountUp.tsx        # 숫자 카운트업 애니메이션
│   ├── NeuralParticles.tsx # 뉴럴 네트워크 파티클 캔버스
│   ├── PasswordGate.tsx    # 접근 코드 게이트
│   ├── SectionTransition.tsx # 다크↔라이트 전환
│   └── TypingText.tsx      # 타이핑 애니메이션
├── sections/            # 페이지 섹션
│   ├── HeroSection.tsx
│   ├── DataUploadSection.tsx
│   ├── ModelSelectionSection.tsx
│   ├── TaskSelectionSection.tsx
│   ├── ProgressSection.tsx
│   └── ResultsSection.tsx
└── App.tsx              # 파이프라인 상태 관리 + 라우팅
```

## License

Internal use only — Transconnectome
