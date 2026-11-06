# Jeongmin Lee 포트폴리오 사이트

Hugo와 Hugo Profile 테마로 만든 개인 포트폴리오 사이트입니다. 자기소개, 경력, 개인 프로젝트(Newton), 논문 리뷰를 영어·한국어로 제공합니다.

- **공개 사이트**: <https://jeongmin80.github.io/personal-portfolio/>
- **저장소**: <https://github.com/JeongMin80/personal-portfolio>
- **배포 기록 (GitHub Actions)**: <https://github.com/JeongMin80/personal-portfolio/actions>
- **출처와 이용 조건**: [CREDITS.md](CREDITS.md)

## 1. 사용 도구와 버전

| 도구 | 버전 | 용도 |
|---|---|---|
| Hugo | 0.143.0 (배포: extended) | 사이트 빌드 |
| Dart Sass | 1.105.0 | 배포 환경의 Sass 처리 (워크플로가 자동 설치) |
| Python | 3.12 | 빌드·배포 스크립트 실행 (`.github/pages_build.py`) |
| Git | 2.49 | 버전 관리 |
| 테마 | Hugo Profile (gurusabarish, MIT) | `site/themes/template/` |

로컬 확인 환경: Windows 11, Git Bash. 배포 환경: GitHub Actions `ubuntu-latest`.

## 2. 설치

1. Hugo **0.143.0**을 설치합니다. ([Hugo 릴리스 페이지](https://github.com/gohugoio/hugo/releases/tag/v0.143.0)에서 운영체제에 맞는 파일을 받아 PATH에 추가)
2. Python 3를 설치합니다.
3. 저장소를 내려받습니다.

```bash
git clone https://github.com/JeongMin80/personal-portfolio.git
cd personal-portfolio
hugo version      # v0.143.0 확인
python --version  # Python 3 확인
```

테마는 `site/themes/template/`에 포함되어 있어 별도로 내려받을 필요가 없습니다.

## 3. 로컬에서 실행하기

테마 설정이 `site/pages.json`에 있으므로 **설정 파일 두 개를 함께 지정**해야 합니다. `hugo server`만 실행하면 테마를 찾지 못합니다.

```bash
cd site
hugo server --config hugo.yaml,pages.json --baseURL http://localhost:1313/ --disableFastRender
```

브라우저에서 확인합니다.

- 영어 홈: <http://localhost:1313/>
- 한국어 홈: <http://localhost:1313/ko/>

`--disableFastRender`는 파일 수정 후 화면이 옛 내용으로 남는 문제를 막습니다. 종료는 `Ctrl + C`입니다.

## 4. 배포와 같은 방식으로 빌드하기

GitHub Actions가 실행하는 빌드 명령과 같습니다. 저장소 최상위 폴더에서 실행합니다.

```bash
python .github/pages_build.py --build
```

- 결과물은 `public/` 폴더에 생성됩니다. (`.gitignore`로 제외되어 커밋되지 않음)
- 마지막에 `빌드 완료.`가 출력되면 성공입니다.
- 이 스크립트는 사이트 주소의 하위 경로(`/personal-portfolio/`)에 맞게 링크를 보정합니다.

## 5. 수정할 파일 위치

| 바꾸고 싶은 내용 | 파일 |
|---|---|
| 이름, 소개, About, 기술 목록, 경력, 학력, 프로젝트 카드, 메뉴 | `site/hugo.yaml` (한국어는 `languages: ko:` 아래, 영어는 파일 아래쪽) |
| Newton 프로젝트 페이지 | `site/content/projects/newton.ko.md` (한국어), `newton.md` (영어) |
| 논문 리뷰 | `site/content/paper-reviews/*.ko.md` (한국어), `*.md` (영어) |
| 이미지 | `site/static/images/` (프로젝트 이미지는 `images/projects/`) |
| 이력서 PDF | `site/static/files/resume.pdf` |
| 화면 모양 (CSS) | `site/themes/template/assets/css/` |
| 동작 (JavaScript) | `site/themes/template/assets/js/` |
| 페이지 틀 (HTML 레이아웃) | `site/themes/template/layouts/` |
| 배포 설정 | `.github/workflows/hugo-pages.yml`, `.github/pages_build.py` |

주의할 점:

- Newton 페이지의 `showInHome: false`와 `summary:`는 지우지 않습니다. 지우면 홈에 카드가 하나 더 생기고 홈 화면이 깨질 수 있습니다.
- 페이지 맨 위 `---` 사이의 설정(front matter)은 영어·한국어 파일에서 같게 유지합니다.

## 6. 수정 후 배포하기

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드하고 배포합니다.

1. 로컬에서 수정하고 3번(`hugo server`)으로 화면을 확인합니다.
2. 커밋하고 push합니다.

   ```bash
   git add <수정한 파일>
   git commit -m "변경 내용을 설명하는 메시지"
   git push origin main
   ```

3. **Actions 확인**: 저장소의 [Actions 탭](https://github.com/JeongMin80/personal-portfolio/actions)에서 방금 push한 커밋의 실행을 엽니다. `build`와 `deploy`가 모두 초록색 체크로 끝나면 성공입니다. 보통 1~2분 걸립니다.
4. **공개 사이트 확인**: <https://jeongmin80.github.io/personal-portfolio/>를 새로고침해 수정 내용이 반영됐는지 봅니다. 바로 안 보이면 `Ctrl + F5`로 캐시 없이 새로고침합니다.

배포가 실패하면 Actions 실행 화면에서 실패한 단계의 로그를 확인합니다. 이전에 겪은 배포 실패와 해결 과정은 [GITHUB_PAGES_DEPLOYMENT_NOTES.md](GITHUB_PAGES_DEPLOYMENT_NOTES.md)에 정리되어 있습니다.

## 7. 폴더 구조

```text
personal-portfolio/
├── site/                     # 실제 사이트 (빌드에 사용하는 폴더)
│   ├── hugo.yaml             # 사이트 설정과 홈 화면 내용
│   ├── pages.json            # 배포용 설정 (테마 지정, baseURL)
│   ├── content/              # 프로젝트·논문 리뷰 글
│   ├── static/               # 이미지, 이력서 PDF
│   └── themes/template/      # Hugo Profile 테마 (직접 수정함)
├── .github/
│   ├── workflows/hugo-pages.yml  # GitHub Actions 배포 워크플로
│   └── pages_build.py            # 빌드·경로 보정 스크립트
├── CREDITS.md                # 출처와 이용 조건
├── GITHUB_PAGES_DEPLOYMENT_NOTES.md  # 배포 실패 원인과 수정 기록
├── THEME_README.md           # 테마 원본 README (보존)
└── LICENSE                   # 테마 원본 라이선스 (MIT)
```

저장소 최상위의 `layouts/`, `static/`, `exampleSite/`, `wiki/` 등은 내려받은 테마 ZIP 원본이며, 사이트 빌드에는 `site/` 폴더만 사용합니다.

## 8. 출처와 라이선스

- 테마: [Hugo Profile](https://github.com/gurusabarish/hugo-profile) by gurusabarish, MIT License ([LICENSE](LICENSE))
- 테마 원본 README: [THEME_README.md](THEME_README.md)
- 라이브러리, 외부 이미지, AI 생성 자료, 직접 제작 자료의 구분: [CREDITS.md](CREDITS.md)
