# ARPA-H AI Foundation Model Demo

> **Restricted Access** — 이 데모 페이지는 접근 코드가 필요합니다.

ARPA-H 과제를 위한 AI Foundation Model 시연 웹페이지입니다.
뇌영상(fMRI) 및 뇌파(EEG/iEEG) 데이터에 대한 AI 파운데이션 모델의 임상 예측 파이프라인을 인터랙티브하게 시연합니다.

## Live Demo

https://transconnectome.github.io/arpa-h_webdemo/

## Overview

패럴랙스 스크롤 원페이지로 구성된 5단계 AI 파이프라인 시연:

| Step | Section | Description |
|:----:|---------|-------------|
| — | **Hero** | SwiFT 파이프라인 7-Scene 인터랙티브 데모 (자동재생 슬라이드쇼) |
| 01 | **Data Upload** | 뇌영상/뇌파 데이터 업로드 → 확장자 기반 모달리티 자동 분류 |
| 02 | **Model Selection** | 모달리티에 따른 Foundation Model 자동 선택 (SWIFT / DIVER / VLM) |
| 03 | **Task Selection** | 임상 예측 과제 선택 (MCI 진단/전환, MDD, OCD, 치료반응) |
| 04 | **Progress** | 5단계 모델 처리 파이프라인 시각화 (전처리 → 로딩 → 특징추출 → 추론 → 후처리) |
| 05 | **Results** | 예측 결과, 성능 메트릭, AI 해석 뇌 영역 시각화 |

## Key Features

### Hero: SwiFT Pipeline Demo (7 Scenes)
`swift_demo_v2/`의 독립 HTML 데모를 React 컴포넌트로 완전 변환하여 Hero 섹션에 임베드.
다크 테마(`#0A0E27`) 적용, 자동재생(6초 간격) + Prev/Next 네비게이션.

| Scene | Name | Content |
|:-----:|------|---------|
| 0 | Power-Up | 60T fMRI 데이터, Aurora HPC, SwiFT 4D 아키텍처 3 pillars |
| 1 | Raw Input | HC/MCI 뇌 GIF 비교 (GARD 코호트 실제 데이터) |
| 2 | 4D Rep | 4차원 뇌 데이터 큐브 표현 |
| 3 | Backbone | Swin Transformer 이소메트릭 블록 시각화 |
| 4 | Downstream | Latent morph + MLP 네트워크 SVG 애니메이션 |
| 5 | Prediction | HC/MCI 예측 플립 카드 (CircularGauge) |
| 6 | Interpretation | Surface difference map 해석 |

### Sequential Pipeline Flow
Data Upload → Model Selection → Task Selection → Progress → Results 순서로 진행.
각 단계가 완료되어야 다음 단계가 unlock되며, blur 효과로 잠금 상태를 표현.
데이터 업로드 후 Model Selection 섹션으로 자동 스크롤.

### Results Section
- **MCI 위험도**: Risk Score (0-100) + 위험 등급 (Low/Moderate/High) 시각화
- **Brain Age**: 추정 뇌 나이 vs 실제 나이 비교 바 차트 (GAP 표시)
- **성능 메트릭**: AUC, AUPRC, Accuracy (CountUp 애니메이션)
- **AI 해석 뇌 영역**: Canvas 기반 brain cutout + 커스텀 colorbar, 한국어 UX 텍스트
  - 정상군/MCI 활성 차이를 색상으로 표현 (red: HC 활성, blue: MCI 활성)
  - GARD 광주치매코호트 4,201명 기반 결과 표기

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
| Animation | Framer Motion |
| Canvas | HTML5 Canvas (brain image processing) |
| Deployment | GitHub Pages (via GitHub Actions `workflow_dispatch`) |

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

`main` 브랜치에 push 후 GitHub Actions를 수동 트리거하여 배포합니다:

```bash
gh workflow run "Deploy to GitHub Pages" --ref main
```

## Project Structure

```
src/
├── components/
│   ├── CountUp.tsx               # 숫자 카운트업 애니메이션
│   ├── NeuralParticles.tsx       # 뉴럴 네트워크 파티클 캔버스
│   ├── PasswordGate.tsx          # 접근 코드 게이트
│   ├── SectionTransition.tsx     # 다크↔라이트 전환
│   ├── TypingText.tsx            # 타이핑 애니메이션
│   └── swift-demo/               # SwiFT 파이프라인 데모
│       ├── SwiftDemo.tsx           # 마스터 오케스트레이터 (상태 + 자동재생)
│       ├── SwiftDemoProgress.tsx   # 상단 7-step 도트 네비게이션
│       ├── SwiftDemoControls.tsx   # 하단 Prev/Next + Auto 컨트롤
│       ├── SwiftDemo.css           # CSS 키프레임 (3D, SVG stroke 등)
│       ├── scenes/
│       │   ├── ScenePowerUp.tsx      # Scene 0: 3 pillars
│       │   ├── SceneRawInput.tsx     # Scene 1: HC/MCI 뇌 GIF
│       │   ├── Scene4DRep.tsx        # Scene 2: 4D 큐브 이미지
│       │   ├── SceneBackbone.tsx     # Scene 3: 이소메트릭 블록
│       │   ├── SceneDownstream.tsx   # Scene 4: latent morph + MLP
│       │   ├── ScenePrediction.tsx   # Scene 5: 플립 카드
│       │   └── SceneInterpretation.tsx # Scene 6: surface map
│       └── shared/
│           ├── IsometricBlock.tsx    # 재사용 3D 블록
│           ├── CircularGauge.tsx     # SVG 원형 차트
│           ├── FlipCard.tsx          # 카드 플립
│           └── MlpNetwork.tsx        # MLP SVG 네트워크
├── sections/
│   ├── HeroSection.tsx             # SwiFT 데모 임베드 + ARPA-H 뱃지
│   ├── DataUploadSection.tsx       # 데이터 업로드 + 모달리티 감지 + 자동 스크롤
│   ├── ModelSelectionSection.tsx   # 모델 자동 선택 카드 (3종)
│   ├── TaskSelectionSection.tsx    # 임상 과제 선택 (4종)
│   ├── ProgressSection.tsx         # 5단계 처리 파이프라인
│   └── ResultsSection.tsx          # 예측 결과 + 메트릭 + 뇌 해석 시각화
└── App.tsx                         # 파이프라인 상태 관리

public/
└── swift-demo/                   # 정적 에셋 (번들링 제외)
    ├── gard_sub-324_mci.gif        # MCI 피험자 뇌 GIF (9.3MB)
    ├── gard_sub-24_hc.gif          # HC 피험자 뇌 GIF (8.5MB)
    ├── 4d_brain_cubes.png          # 4D 표현 이미지
    └── surface_difference.png      # 뇌 표면 차이 맵
```

## License

Internal use only — Transconnectome
