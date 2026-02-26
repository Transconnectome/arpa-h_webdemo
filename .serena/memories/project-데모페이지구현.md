# 데모페이지구현 프로젝트

## 개요
- **프로젝트명**: ARPA-H AI Foundation Model Demo
- **GitHub**: https://github.com/Transconnectome/arpa-h_webdemo
- **Live URL**: https://transconnectome.github.io/arpa-h_webdemo/
- **로컬 경로**: /Users/default/arpa-h_webdemo
- **목적**: ARPA-H 과제 리뷰어 대상 AI Foundation Model 시연 웹페이지
- **배포**: GitHub Pages (GitHub Actions `workflow_dispatch` 수동 트리거)
- **접근 제한**: 패스워드 게이트 (코드: arpa2026, PasswordGate.tsx에서 변경)

## 팀 구성
- **총괄/기획**: 사용자 (AI 과학자 겸 기획자)
- **UI/UX 디자이너**: 시니어 10년+ (AI 데모페이지 특화, 모던 미니멀)
- **프론트엔드 개발자 x2**: 시니어 10년+ (React, GitHub Pages 최적화)

## 기술 스택
- React 19 + TypeScript + Vite 7
- Tailwind CSS 4
- Framer Motion (애니메이션)
- HTML5 Canvas (brain image processing - white BG removal)
- GitHub Actions → GitHub Pages 배포

## 디자인 결정사항
- **레이아웃**: 패럴랙스 스크롤 원페이지
- **타겟**: 과제 리뷰어/담당자 (AI 비전문가, 시각적 임팩트 중요)
- **데모 방식**: 목업 (샘플 데이터 기반, 백엔드 없음)
- **Hero**: SwiFT 파이프라인 7-Scene 인터랙티브 데모 (다크 테마 #0A0E27)
- **섹션 진행**: 순차 잠금 해제 (블러 + 자물쇠 언락 패턴)
- **컬러**: 다크-라이트 혼합 (Hero 다크 → 시연 섹션 라이트)
- **UX 텍스트**: 한국어 우선 (비전문가용, 뇌과학 용어 최소화)

## 파이프라인 플로우
Data Upload(수동) → 모달리티 자동분류 → Model Selection(자동: fMRI→SWIFT, EEG→DIVER) → 자동 스크롤 → Task Selection(수동: MCI진단/전환, MDD, OCD, 치료반응) → Progress(자동 애니메이션) → Results(블러 해제 후 표시)

## Hero: SwiFT Pipeline Demo (7 Scenes)
`swift_demo_v2/` 독립 HTML 데모를 React 컴포넌트로 완전 변환.
자동재생 6초 간격 + Prev/Next + 도트 네비게이션.
| Scene | Content |
|-------|---------|
| 0 Power-Up | 60T fMRI, Aurora HPC, SwiFT 4D 3 pillars |
| 1 Raw Input | HC/MCI 뇌 GIF 비교 (GARD 코호트) |
| 2 4D Rep | 4차원 뇌 데이터 큐브 |
| 3 Backbone | Swin Transformer 이소메트릭 블록 |
| 4 Downstream | Latent morph + MLP SVG 애니메이션 |
| 5 Prediction | HC/MCI 플립 카드 (CircularGauge) |
| 6 Interpretation | Surface difference map |

## Results Section 상세
- **MCI 위험도**: Risk Score 0-100 + 위험 등급 (Low/Moderate/High)
- **Brain Age**: 추정 뇌 나이 vs 실제 나이 바 차트 (GAP 표시)
- **성능 메트릭**: AUC, AUPRC, Accuracy (CountUp 애니메이션)
- **AI 해석 뇌 영역** ("AI가 주목한 뇌 영역"):
  - Canvas 기반 BrainCutout (white BG removal, threshold 248)
  - 커스텀 CSS gradient colorbar (이미지 colorbar 대체)
  - "활성 차이" 라벨 + (a.u.) 단위
  - 한국어 범례: "정상군에서 더 활성 (PCC, Precuneus)" / "MCI에서 더 활성 (ACC, dlPFC)"
  - GARD 광주치매코호트 4,201명 기반 표기

## 프로젝트 구조
```
src/components/swift-demo/  — SwiFT 7-Scene 데모 (15개 파일)
  SwiftDemo.tsx, SwiftDemoProgress.tsx, SwiftDemoControls.tsx, SwiftDemo.css
  scenes/ (7개), shared/ (4개: IsometricBlock, CircularGauge, FlipCard, MlpNetwork)
src/components/ — CountUp, NeuralParticles, PasswordGate, SectionTransition, TypingText
src/sections/ — Hero, DataUpload, ModelSelection, TaskSelection, Progress, Results
public/swift-demo/ — 정적 에셋 4개 (GIF 2개 ~9MB, PNG 2개)
```

## 완료된 작업
- [x] React + Vite + Tailwind 빌드 환경 세팅
- [x] 6개 섹션 뼈대 + 디자인 디테일링
- [x] 전체 파이프라인 순차 진행 (블러 언락)
- [x] 패스워드 게이트
- [x] SwiFT Demo v2 → React 컴포넌트 변환 (7-Scene, 다크 테마)
- [x] Hero 섹션에 SwiFT 데모 임베드
- [x] Results 섹션: Brain cutout, colorbar, 한국어 UX 텍스트
- [x] Data Upload → Model Selection 자동 스크롤
- [x] GitHub Pages 배포
- [x] README 최종 업데이트

## TODO
- [ ] 모바일 반응형 최적화
- [ ] 번들 사이즈 최적화 (code splitting, 현재 519KB)
- [ ] 추가 태스크/모델 확장 시 데이터 업데이트
- [ ] 실제 과제 리뷰어 피드백 반영

## 배포 명령어
```bash
npm run build && git add . && git commit -m "..." && git push origin main
gh workflow run "Deploy to GitHub Pages" --ref main
```

## 주요 기술 노트
- GIF 로딩: `loading="lazy"`, public/ 디렉토리 (번들링 제외)
- 에셋 경로: `import.meta.env.BASE_URL + 'swift-demo/...'`
- Canvas BrainCutout: 흰 배경 제거 threshold 248, 투명화 처리
- CSS colorbar: `linear-gradient(to bottom, #DC2626 → #FFFFFF → #1D4ED8)`
- 배포 주의: `gh-pages` npm 패키지 안 됨 → GitHub Actions workflow_dispatch 사용
