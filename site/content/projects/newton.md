---
title: "Project: Newton — 2D Penguin Survival Game"
description: "Development notes for Newton, a 2D survival game I built on my own with Unity and C#."
hideDate: true
enableReadingTime: false
toc: false
hideTags: true
socialShare: false
reviewLayout: true
showInHome: false
summary: "Development notes for Newton, a 2D survival game I built on my own with Unity and C#."
tags:
  - Project
  - Game Development
  - Unity
  - "C#"
  - WebGL
---

> **Summary**: A 2D survival game in which a penguin player dodges apples falling from the sky and tries to hold out as long as possible. I built it on my own with Unity and C# while learning game development at Holysoft Studios. It is not finished yet, and I plan to add more features later.

## Project Info

| Item | Details |
|---|---|
| Period | January 2026 (developed in about 1 week during a one-month internship at Holysoft Studios) |
| Status | In progress — movement, falling apples, collision and game over are implemented and playable on the web / Remaining: apple skin shop |
| Type | Personal project (solo) |
| Role | Planning, game logic programming (C#), WebGL build, GitHub Pages deployment |
| Tech | Unity 2021.3 LTS, C#, WebGL, GitHub Pages |
| Output | [Play the game](https://jeongmin80.github.io/unity-game/) · [GitHub repository](https://github.com/JeongMin80/unity-game) |

## Purpose

My goal was to use the Unity basics I learned during the internship to build one game myself. More specifically, I set the bar at a state where a full round can be played from start to game over.

Because the development period was only about a week, I chose "dodge the falling apples" as the theme: it was small enough to finish in time, yet it let me use everything I had learned (character movement, object spawning and collision handling).

## Role and Contribution

- **Planning**: I set the rule as "dodge the falling apples and survive as long as possible" and, since the game is about falling apples, named it Newton after Newton's apple. I chose a penguin as the player character and apples as obstacles, and I also designed a shop system for changing apple skins (currently in progress).
- **Game logic**: I implemented player movement, apple spawning and falling with increasing difficulty, collision and game over, and the survival time and best record display myself with Unity and C# scripts. I then built the game for WebGL and deployed it to GitHub Pages. The implementation details are described in the Development Process section below.
- **What I did not make myself**: The penguin character image, its animations and the background music are free assets downloaded from sources such as the Unity Asset Store. The apple image was made with an image-generation AI.

## Development Process

### Steps

- **First plan and change of direction**: I first set out to make a fighting game. I tried implementing attack hitboxes, a time limit, health bars and attack damage, but there was too much left to build, including character art and extra features, to finish within the period. So I switched to Newton, which has simpler rules, and planned the game again from scratch.
- **Player movement**: I wrote a C# script so that the penguin moves left and right with the A/D keys or the ←/→ arrow keys. Invisible walls just outside the screen keep the player from leaving the screen.
- **Apple spawning and falling**: Apples spawn at random positions along the top of the screen at regular intervals and fall down. As time passes, the spawn interval gets shorter and the falling speed gets faster, so the difficulty rises gradually.
- **Collision and game over**: In Unity, I gave the penguin and the apples hitboxes (collision areas) that match their sizes, and the game ends when the two touch.
- **UI and art**: I displayed the current survival time and the best survival time on screen so players can check their records. I then added the penguin and apple images, animations and background music to finish the screen.
- **Build and deployment**: I built the game for WebGL, uploaded it to GitHub Pages and checked that it plays in the browser.

## Problem and Solution

### The penguin animation started differently on each run

- **Symptom**: The penguin has two motions: a normal standing motion and a motion where it lies down in pain after being hit by an apple. But on the same build, the penguin sometimes stood normally and sometimes started the game already lying down, so the result was not consistent.
- **Cause**: Unity's Animator is where you define which motion a character starts in (the default state) and under which conditions it moves to another motion (transition conditions). I had connected the two motions without fully understanding how to set up the Animator, so the starting motion and transition order were not what I intended.
- **Fix**: Together with my internship mentor, I re-checked the Animator's motion structure from the start. I set the standing motion as the starting state and rebuilt the flow so that it switches to the lying-down motion only when the penguin collides with an apple.
- **Result**: The game now always starts with the standing motion, and the pain motion plays only at the moment an apple hits. I learned that animation does not work just by adding motion files; the states and transitions have to be designed to behave as intended.

## Results

All screenshots below were captured while playing the deployed web version myself. You can [play the game](https://jeongmin80.github.io/unity-game/) directly, and the full code is in the [GitHub repository](https://github.com/JeongMin80/unity-game).

{{< figure-grid >}}
{{< review-figure src="images/projects/newton-intro.png" alt="Newton game intro screen" placeholder="Intro screen image coming soon" caption="Figure 1. The intro screen shown when the game starts" >}}
{{< review-figure src="images/projects/newton-play.png" alt="Newton gameplay screen with the penguin dodging falling apples" placeholder="Gameplay image coming soon" caption="Figure 2. Gameplay: moving the penguin left and right to dodge falling apples" >}}
{{< review-figure src="images/projects/newton-gameover.png" alt="Game over screen with the penguin lying down after being hit by an apple" placeholder="Game over image coming soon" caption="Figure 3. When an apple hits, the penguin lies down and the game is over" >}}
{{< review-figure src="images/projects/newton-shop.png" alt="Newton shop screen for changing apple skins" placeholder="Shop screen image coming soon" caption="Figure 4. The shop screen for changing apple skins (in progress)" >}}
{{< /figure-grid >}}

## Looking Back

### What I learned

Before this project, building a game from start to finish on my own felt vague and out of reach. But by choosing the theme myself, changing direction when I judged the first plan could not be finished in time, and building features one by one until the game was published on the web, I gained the confidence that **I can carry a project through to the end on my own**. In particular, I learned that instead of trying to build everything at once, it matters to set a realistic scope and finish it step by step in small pieces.

### What I would like to improve

The game is not fully finished yet. The core gameplay works, but the apple skin shop I planned is still in progress, and I intend to complete it later.

Also, I could not solve the penguin animation problem on my own and fixed it with my mentor's help. Understanding the cause with their help was a good experience, but from now on I want to build the ability to analyze the cause myself, by looking through official documentation and other resources, and to solve problems on my own when they come up.
