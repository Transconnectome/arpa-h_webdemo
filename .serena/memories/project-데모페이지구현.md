# 데모페이지구현 프로젝트

## 개요
- **프로젝트명**: 데모페이지구현
- **GitHub**: https://github.com/Transconnectome/arpa-h_webdemo
- **Live URL**: https://transconnectome.github.io/arpa-h_webdemo/
- **로컬 경로**: /Users/default/demo-page
- **목적**: ARPA-H 과제 리뷰어 대상 AI Foundation Model 시연 웹페이지
- **배포**: GitHub Pages (GitHub Actions 자동 배포)
- **접근 제한**: 패스워드 게이트 (코드: arpa2026, PasswordGate.tsx에서 변경)

## 팀 구성
- **총괄/기획**: 사용자 (AI 과학자 겸 기획자)
- **UI/UX 디자이너**: 시니어 10년+ (AI 데모페이지 특화, 모던 미니멀)
- **프론트엔드 개발자 x2**: 시니어 10년+ (React, API 연동, GitHub Pages 최적화)

## 기술 스택
- React 19 + TypeScript + Vite 7
- Tailwind CSS 4
- Framer Motion + GSAP (애니메이션)
- Chart.js + react-chartjs-2 (결과 시각화)
- GitHub Actions → GitHub Pages 배포

## 디자인 결정사항
- **레이아웃**: 패럴랙스 스크롤 원페이지
- **타겟**: 과제 리뷰어/담당자 (AI 비전문가, 시각적 임팩트 중요)
- **데모 방식**: 목업 (샘플 데이터 기반, 백엔드 없음)
- **Hero**: 모션 그래픽/애니메이션 (영상은 추후 교체 가능 구조)
- **섹션 진행**: 가이드 스크롤 (자유 스크롤 + 진입 시 자동 애니메이션)
- **컬러**: 다크-라이트 혼합 (Hero 다크 → 시연 섹션 라이트)
- **결과 섹션**: 블러 + 자물쇠 언락 패턴

## 파이프라인 플로우
Data Upload(수동) → 모달리티 자동분류 → Model Selection(자동: fMRI→SWIFT, EEG→DIVER, Visual→VLM) → Task Selection(수동: MCI→AD, MDD, OCD, 치료반응) → Progress(자동 애니메이션) → Results(블러 해제 후 표시)

## 디자인 레퍼런스
- Lusion (Hero 파티클), KPR Verse (스크롤 스토리텔링), Noomo (패럴랙스)
- Vibrant Wellness (메디컬 신뢰감), D2C Life Science (과학 데이터 시각화)

## 프로젝트 구조
src/components/ — NeuralParticles, TypingText, CountUp, SectionTransition, PasswordGate
src/sections/ — Hero, DataUpload, ModelSelection, TaskSelection, Progress, Results
App.tsx — PipelineState 중앙 상태 관리

## 완료된 작업 (2025-02-25)
- [x] GitHub 리포 생성 (Transconnectome/arpa-h_webdemo)
- [x] React + Vite + Tailwind 빌드 환경 세팅
- [x] 6개 섹션 뼈대 구현
- [x] 디자인 디테일링 (파티클, 타이핑, 카운트업, 차트)
- [x] Data Upload → Model Selection 상태 연동
- [x] 전체 파이프라인 순차 진행 (블러 언락 포함)
- [x] 패스워드 게이트 구현
- [x] GitHub Pages 배포 완료
- [x] README 작성

## 다음 작업 (TODO)
- [ ] Hero 섹션 영상 교체 (영상 제작 후)
- [ ] 모바일 반응형 최적화
- [ ] 추가 태스크/모델 확장 시 데이터 업데이트
- [ ] 실제 과제 리뷰어 피드백 반영
- [ ] 번들 사이즈 최적화 (code splitting)

## 배포 명령어
```bash
# 자동: main push 시 (현재 push trigger 미작동, workflow_dispatch로 수동)
gh workflow run "Deploy to GitHub Pages" --repo Transconnectome/arpa-h_webdemo --ref main
```
