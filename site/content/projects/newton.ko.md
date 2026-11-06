---
title: "Project: Newton — 2D Penguin Survival Game"
description: "Unity와 C#으로 혼자 개발한 2D 생존 게임 Newton의 개발 기록입니다."
hideDate: true
enableReadingTime: false
toc: false
hideTags: true
socialShare: false
reviewLayout: true
# 홈 프로젝트 카드 목록에서 제외 (Newton 카드는 hugo.yaml에서 만듭니다)
showInHome: false
# 목록·RSS 요약이 아래 가이드 주석을 잘라 쓰지 않도록 요약을 직접 지정
summary: "Unity와 C#으로 혼자 개발한 2D 생존 게임 Newton의 개발 기록입니다."
tags:
  - Project
  - Game Development
  - Unity
  - "C#"
  - WebGL
---

<!--
  작성 가이드 (이 주석들은 화면에 보이지 않지만 HTML 소스에는 남습니다.
  내용을 채운 뒤에는 각 가이드 주석을 지워 주세요.)

  - 논문 리뷰 페이지와 같은 형식입니다: 맨 위 요약(> **Summary**) → "## 번호. 영어 제목" → 필요하면 "### 한국어 소제목".
  - 이미지는 아래 shortcode로 넣습니다. 파일은 site/static/images/projects/ 에 두세요.
    {{</* review-figure src="images/projects/파일이름.png" alt="그림 설명" caption="그림 1. 설명" */>}}
  - 괄호 안 P번호는 이 절이 채우는 공개 채점 기준입니다.
-->

<!-- [요약] 한두 문장: 어떤 게임인지 + 언제·누가(개인) 만들었는지 + 지금 상태.
> **Summary**: ...
-->

<!-- ## 1. Project Overview  (P74 시기·상태, P76 본인 역할)
  - 개발 기간: 예) 2026년 1월, Holysoft Studios 인턴십 중 약 n주
  - 현재 상태: 완료 / 진행 중 (무엇이 끝났고 무엇이 남았는지)
  - 형태와 역할: 개인 프로젝트임을 명시. 기획·프로그래밍·빌드·배포 중 직접 한 것
    (인턴십에서 받은 도움·교육과 본인이 직접 한 작업을 구분)
  - 사용 도구: Unity 버전, C#, WebGL, GitHub Pages
  - 링크: 플레이 https://jeongmin80.github.io/unity-game/ , 저장소 https://github.com/JeongMin80/unity-game
-->

<!-- ## 2. Goal & Motivation  (P75 활동 목적)
  - 이 프로젝트로 해결하거나 달성하려던 것을 구체적으로
    예) 인턴십에서 배운 Unity 기초(물리, 충돌, UI)를 직접 써서 처음부터 끝까지 게임 1개 완성하기
  - 왜 이 주제(펭귄이 떨어지는 사과를 피하는 게임)를 골랐는지
-->

<!-- ## 3. Development Process  (P77 수행 과정과 선택 이유)
  - 주요 단계를 순서대로: 기획 → 플레이어 이동 → 사과 생성·낙하 → 충돌·게임오버 → 점수·UI → WebGL 빌드·배포
  - 단계마다 직접 구현한 내용 (스크립트 이름, 핵심 로직 한두 줄)
  - 선택 이유 최소 1개: 예) 왜 Unity를 썼는지, 왜 물리 엔진(Rigidbody2D)으로 낙하를 처리했는지,
    왜 WebGL + GitHub Pages로 배포했는지
  - 겪은 문제와 해결 (있다면): 현상 → 원인 → 해결
-->

<!-- ## 4. Results  (P78 산출물과 결과 설명)
  - 실제 산출물: 플레이 가능한 WebGL 데모, GitHub 저장소, 게임 화면 캡처
  - 각 산출물이 무엇을 구현·확인한 결과인지 설명
  - 게임 화면 캡처를 review-figure로 1~2장 (직접 캡처한 이미지 권장. 현재 newton.png는 AI 생성 이미지라
    결과 화면으로 쓰면 안 되고, 쓰려면 "AI 생성 대표 이미지"라고 캡션에 밝혀 주세요)
-->

<!-- ## 5. Lessons & Next Steps  (P79 학습 결과와 개선 방향)
  ### 배운 점 / 한계
  - 개발하면서 배운 점 1개 이상, 남은 한계 1개 이상
  ### 다음 개선 방향
  - 위 한계와 연결된 개선 계획 (무엇을, 왜, 어떻게)
-->
