# GitHub Pages 배포 실패 원인과 수정 기록

## 발생한 문제

2026년 11월 6일의 [실패한 GitHub Actions 실행](https://github.com/JeongMin80/personal-portfolio/actions/runs/42154698290)에서 `build` 작업의 `Prepare dependencies` 단계가 실패했습니다. npm이 `electron-to-chromium-1.5.478.tgz`를 내려받으려 할 때 404 오류가 발생했습니다. `deploy` 작업은 `build`가 완료되지 않아 실행되지 않았습니다.

이 오류는 해당 커밋에서 수정한 홈페이지 섹션 이동 코드의 오류가 아닙니다. npm 저장소가 그 파일에 404를 반환한 구체적인 이유는 로그만으로 확인할 수 없습니다. 이 부분은 확실하지 않습니다.

## 왜 사용하지 않는 패키지를 설치했나

배포 워크플로의 `Prepare dependencies` 단계는 [.github/pages_build.py](.github/pages_build.py)의 `dependencies()` 함수를 실행합니다. 기존 코드는 PostCSS, Tailwind CSS, Pagefind 명령 중 하나라도 실행 환경에 없으면 다섯 개의 npm 패키지를 한꺼번에 설치했습니다. 현재 사이트가 그 도구를 사용하는지는 확인하지 않았습니다.

현재 [.github-pages.json](.github-pages.json)에는 `"npm": []`와 `"asset_build": []`가 설정되어 있습니다. 현재 사용 중인 Hugo 템플릿과 콘텐츠에서도 PostCSS, Tailwind CSS, Pagefind를 호출하지 않습니다. 따라서 이 사이트의 배포에 해당 npm 설치 단계는 필요하지 않았습니다.

## 적용한 수정과 현재 상태

`.github/pages_build.py`에서 별도 자산 빌드 명령인 `asset_build`가 있을 때만 선택적 CLI 설치를 시도하도록 조건을 바꿨습니다. Hugo 설치, Hugo 빌드, URL 경로 보정, GitHub Pages 업로드 단계는 그대로 실행됩니다.

수정 후 로컬에서 `python .github/pages_build.py --dependencies`와 Hugo `--minify` 빌드가 성공했습니다. 사용자는 이후 새 커밋의 GitHub Pages 배포가 성공했다고 확인했습니다. 따라서 **현재 사이트 구성에서는 이 변경을 유지해도 됩니다.** 이전 실패 실행의 표시가 남아 있어도 새 배포를 판단할 때는 새 실행 결과를 확인하면 됩니다.

## 나중에 npm 도구가 필요해지면

현재 조건은 지금의 사이트 구성을 전제로 합니다. PostCSS, Tailwind CSS 또는 Pagefind를 실제로 도입할 때는 다음 파일을 함께 수정해야 합니다.

1. `site/package.json`에 실제 사용할 패키지와 필요한 빌드 스크립트를 선언하고, 생성된 `site/package-lock.json`도 커밋합니다. 필요하지 않은 패키지를 묶어서 설치하지 않습니다.
2. `.github-pages.json`의 `npm`을 `["."]`로 설정하면 배포 준비 단계가 `site` 폴더에서 npm 패키지를 설치합니다.
3. CSS 생성처럼 Hugo 실행 전에 명령이 필요하다면 `asset_build`에 그 명령을 추가합니다. 예를 들어 `site/package.json`에 `build:css` 스크립트가 있다면 `[[".", "npm", "run", "build:css"]]`를 사용할 수 있습니다. 스크립트 이름과 명령 내용은 실제로 선택한 도구에 맞게 작성해야 합니다.
4. 이 경우 `.github/pages_build.py`의 선택적 CLI 설치 조건도 다시 수정해야 합니다. 현재 코드는 `asset_build`가 비어 있지 않으면 다섯 도구를 다시 한꺼번에 설치하려고 할 수 있습니다. `site/package.json`에서 필요한 패키지를 설치한다면 아래처럼 조건을 바꾸거나, 해당 설치 블록을 실제로 필요한 CLI만 설치하도록 변경합니다.

   ```python
   if state.get('asset_build') and not state.get('npm') and not all(shutil.which(name) for name in ('postcss', 'tailwindcss', 'pagefind')):
   ```
5. Pagefind만 추가한다면 `site/package.json`에 Pagefind를 등록하고 `npm`을 `["."]`로 설정합니다. `.github/pages_build.py`의 `build()`는 생성된 HTML에 Pagefind 파일을 참조하는 태그가 있을 때 `pagefind` 명령을 실행하므로, 그 명령이 설치되어 있어야 합니다. Pagefind만 사용한다면 `asset_build`를 추가할 필요는 없습니다.

변경 뒤에는 로컬에서 의존성 준비와 Hugo 빌드를 실행하고, GitHub에 올린 뒤 Actions의 `build`와 `deploy`가 모두 성공했는지 확인합니다.
