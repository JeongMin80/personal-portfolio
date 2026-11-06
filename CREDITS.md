# 출처와 이용 조건 (Credits & Licenses)

이 저장소의 포트폴리오 사이트(<https://jeongmin80.github.io/personal-portfolio/>)에 사용한 테마, 라이브러리,
외부 자료의 출처와 이용 조건을 기록하고, **직접 제작 / 외부 자료 / AI 생성** 자료를 구분합니다.
각 원본의 라이선스 파일과 저작권 고지는 수정하지 않고 그대로 유지합니다.

## 1. 테마

| 항목 | 내용 |
|---|---|
| 테마 | Hugo Profile (gurusabarish) |
| 원본 | <https://github.com/gurusabarish/hugo-profile> |
| 라이선스 | MIT License, Copyright (c) 2021 GURU SABARISH |
| 고지 위치 | [`LICENSE`](LICENSE), [`site/themes/template/LICENSE`](site/themes/template/LICENSE) (원본 그대로 유지) |
| 사용 위치 | `site/themes/template/` (테마 원본을 복사한 뒤 레이아웃·CSS·JS를 직접 수정) |
| 수정 내용 | 수정 이력은 Git 커밋 기록에서 확인할 수 있습니다. |

저장소 루트의 `layouts/`, `static/`, `exampleSite/`, `wiki/`, `README.md`, `theme.toml` 등은
다운로드한 테마 ZIP 원본이며, 사이트 빌드에는 `site/` 폴더만 사용합니다.

## 2. 빌드·배포 도구

| 도구 | 출처 | 라이선스 |
|---|---|---|
| Hugo 0.143.0 (extended) | <https://github.com/gohugoio/hugo> | Apache License 2.0 ([`site/LICENSE`](site/LICENSE)) |
| `prepare_github_pages.py`, `.github/pages_build.py`, `.github/workflows/hugo-pages.yml` | 수업에서 제공한 Python 스크립트가 생성 | 수업 제공 자료 |
| GitHub Actions (checkout, setup-python, configure-pages, upload-pages-artifact, deploy-pages 등) | <https://github.com/actions> | 각 액션 저장소의 라이선스 |

## 3. 사이트에서 불러오는 라이브러리·글꼴

| 자료 | 버전 | 출처 | 라이선스 |
|---|---|---|---|
| Bootstrap | 5.1.3 | <https://getbootstrap.com/> (테마에 포함, `site/themes/template/static/bootstrap-5/`) | MIT |
| Font Awesome Free | 6.4.2 | <https://fontawesome.com/> (테마에 포함, `site/themes/template/static/fontawesome-6/`) | 아이콘 CC BY 4.0, 글꼴 SIL OFL 1.1, 코드 MIT |
| MathJax | 3.2.2 | <https://www.mathjax.org/> (cdnjs CDN, 논문 리뷰 페이지) | Apache License 2.0 |
| Google Fonts: Alata, Lora, Roboto | - | <https://fonts.google.com/> (CDN) | 오픈 폰트 라이선스. 글꼴별 라이선스는 Google Fonts의 각 글꼴 페이지에 표시된 조건을 따름 |

## 4. 이미지·파일 자료

| 파일 | 사용 위치 | 구분 | 출처 / 이용 조건 |
|---|---|---|---|
| `site/static/images/profile.png` | 홈 Hero 프로필 사진 | **직접 제작** (본인 사진) | 본인 자료 |
| `site/static/files/resume.pdf` | Hero의 Resume 버튼 | **직접 제작** | 본인 작성 |
| `site/static/images/projects/newton.png` | 홈 Newton 카드, Newton 상세 페이지 | **AI 생성** | 이미지 생성 AI로 제작 (도구명 미표시) |
| `site/static/images/projects/3dgs.png` | 홈 3DGS 리뷰 카드 | **외부 자료** (논문 그림 캡처) | Kerbl, Kopanas, Leimkühler, Drettakis, "3D Gaussian Splatting for Real-Time Radiance Field Rendering", arXiv:2308.04079 (<https://arxiv.org/abs/2308.04079>). arXiv 게시본 라이선스 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 원본 그림 일부를 카드 크기에 맞춰 잘라서 사용 |
| `site/static/images/projects/3dgs-pipeline.png` | 3DGS 리뷰 본문 (영어·한국어) | **외부 자료** (논문 그림 캡처) | 위와 같은 논문, CC BY 4.0. 본문 그림 아래에 출처 캡션 표시 |
| `site/static/images/projects/gaussianeditor.png` | 홈 GaussianEditor 리뷰 카드 | **외부 자료** (논문 그림 캡처) | Chen et al., "GaussianEditor: Swift and Controllable 3D Editing with Gaussian Splatting", arXiv:2311.14521 (<https://arxiv.org/abs/2311.14521>). arXiv 게시본 라이선스는 [arXiv non-exclusive distribution license](https://arxiv.org/licenses/nonexclusive-distrib/1.0/)로, 재사용 허락이 포함되지 않음. 저작권은 원저자에게 있으며 논문 리뷰 목적의 인용으로만 사용 |
| `site/static/images/projects/newton-intro.png`, `newton-play.png`, `newton-gameover.png`, `newton-shop.png` | Newton 상세 페이지 결과물 (영어·한국어) | **직접 제작** (본인 게임 화면 캡처) | 본인이 만든 게임 Newton(<https://github.com/JeongMin80/unity-game>)을 직접 플레이하며 캡처. 화면 속 게임 에셋의 출처는 아래 "Newton 게임 안의 에셋" 참고 |
| `site/static/images/favicon.png`, `site/static/fav.png` | 브라우저 탭 아이콘 | 테마 자료 | Hugo Profile 테마 (MIT) |
| `site/static/images/achievement.jpg`, `hero.svg`, `mathjax.png`, `me.png`, `post.jpg`, `projects/converter.jpg`, `projects/profile.png`, `projects/profile2.jpg` | 사용하지 않음 | 테마 예시 자료 | Hugo Profile 테마 exampleSite (MIT). 사이트 화면에는 표시되지 않음 |

### Newton 게임 안의 에셋

위 캡처 화면에 보이는 게임 안의 그림과 소리는 Newton 게임 저장소(<https://github.com/JeongMin80/unity-game>)에 포함된 자료입니다.

| 자료 | 구분 | 출처 / 이용 조건 |
|---|---|---|
| 펭귄 캐릭터 이미지, 움직임 애니메이션 | **외부 자료** (무료 에셋) | Unity Asset Store 등에서 무료로 배포되는 에셋을 내려받아 사용. 에셋 이름과 제작자는 개발 당시 기록하지 않아 확인하지 못함 |
| 배경 음악 | **외부 자료** (무료 에셋) | 위와 같음 |
| 사과 이미지 | **AI 생성** | 이미지 생성 AI로 제작 (도구명 미표시) |
| 게임 규칙, 기획, 게임 로직 C# 스크립트 | **직접 제작** | 본인 작성. Animator 설정 문제는 인턴십 사수의 도움을 받아 해결 |

## 5. 글과 코드

| 자료 | 구분 | 설명 |
|---|---|---|
| 사이트 소개 문구 (`site/hugo.yaml`의 Hero·About·Experience·Education) | **AI 초안 + 직접 수정** | AI가 만든 초안을 본인이 검토하고 수정. 영어·한국어 번역에도 AI 사용 |
| 논문 리뷰 4편 (`site/content/paper-reviews/*.md`) | **AI 초안 + 직접 수정** | AI 초안을 본인이 논문과 대조해 검토·수정. 논문 내용의 저작권은 각 원저자에게 있음 |
| Newton 프로젝트 페이지 (`site/content/projects/newton*.md`) | **본인 내용 + AI 문장 정리** | 프로젝트 경험과 사실은 본인이 직접 설명하고, AI가 문장으로 정리한 것을 본인이 검토·수정. 영어 페이지는 한국어 페이지를 AI로 번역 |
| 테마 수정 코드 (`site/themes/template/` 아래 CSS·JS·레이아웃) | **직접 수정 + AI 도움** | AI 코딩 도구의 제안을 본인이 검토해 반영하고, 브라우저에서 동작을 확인. 변경 내용과 이유는 각 커밋 메시지와 코드 주석에 기록 |

AI 활용의 구체적인 사례(요청 원문, 응답, 본인 판단, 반영 위치, 검증)는 과제 보고서의 AI 활용 기록에 정리합니다.
