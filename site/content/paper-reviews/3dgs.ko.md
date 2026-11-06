---
title: "Paper Review: 3D Gaussian Splatting for Real-Time Radiance Field Rendering"
description: "A study page for 3D Gaussian Splatting for Real-Time Radiance Field Rendering."
hideDate: true
enableReadingTime: false
toc: false
hideTags: true
socialShare: false
mathjax: true
tags:
  - Paper Review
  - Computer Vision
  - 3DGS
---

> **Summary**: 기존 NeRF의 암시적 표현(Implicit Representation) 및 Ray Marching 방식의 성능 병목을 극복하고, 명시적(Explicit) **3D 가우시안 타원체**와 **미분 가능한 타일 기반 래스터화(Differentiable Tile-based Rasterization)**를 통해 1080p 해상도에서 100+ FPS의 실시간 렌더링을 달성한 논문 리뷰입니다.

## 1. Background & Motivation

### 기존 NeRF 방식의 한계점

**암시적 표현 (Implicit Representation)**: 3D 공간의 정보를 명시적 데이터(Point, Mesh 등)가 아닌 MLP(Multi-Layer Perceptron) 가중치로 저장합니다.

**Ray Marching 병목**: 픽셀마다 광선(Ray)을 쏘아 수백 개의 점을 샘플링하고 매번 MLP를 통과시켜 색상/밀도를 계산합니다.

**한계**: 1080p 이미지 렌더링 시 수백만 번 이상의 신경망 연산이 필요하여 **실시간 렌더링(30+ FPS)이 불가능**하며 훈련 시간이 매우 길다는 단점이 존재합니다.

### 3DGS의 해결 방식

**명시적 표현 (Explicit Representation)**: 신경망 대신 공간을 수백만 개의 **3D 가우시안(3D Gaussians)** 타원체로 구성하여 GPU 메모리에서 직접 접근합니다.

**스플래팅 (Splatting) & 타일 래스터화**: 빛을 쏘는 대신 3D 가우시안을 2D 화면으로 납작하게 투영(Splatting)하고, 화면을 타일 단위로 나누어 깊이 순 정렬 후 빠르게 병합합니다.

**성과**: SOTA 수준의 화질을 유지하면서 **1080p 100+ FPS 실시간 렌더링** 및 학습 시간을 획기적으로 단축시켰습니다.

## 2. Core Representation: 3D Gaussian Parameters

공간을 구성하는 각 3D 가우시안은 렌더링 오차 역전파(Backpropagation)를 통해 학습되는 **4가지 핵심 파라미터**를 가집니다.

$$
G(x) = e^{-\frac{1}{2} (x-\mu)^T \Sigma^{-1} (x-\mu)}
$$

| Parameter | Symbol | Definition & Engineering Significance |
| ----- | ----- | ----- |
| **Position** | $\mu$ | 가우시안 타원체의 중심점 3D 좌표 $(x, y, z)$ |
| **Covariance** | $\Sigma$ | 타원체의 형태와 방향을 결정하는 $3 \times 3$ 공분산 행렬.  학습 안정성을 위해 Scale($S$)과 Rotation($R$)으로 분리 최적화: $\Sigma = R S S^T R^T$ |
| **Opacity** | $\alpha$ | 가우시안의 불투명도 ($0 \le \alpha \le 1$). 알파 블렌딩 시 가중치로 작용 |
| **Color** | $SH$ | 시점 의존적(View-dependent) 빛 반사를 표현하기 위한 구면 조화 함수(Spherical Harmonics) 계수 |

## 3. Overall Pipeline & Differentiable Rasterization

{{< review-figure src="images/projects/3dgs-pipeline.png" alt="3D Gaussian Splatting 전체 파이프라인" placeholder="파이프라인 이미지 준비 중" caption="그림 출처: Kerbl et al., 3D Gaussian Splatting for Real-Time Radiance Field Rendering, arXiv:2308.04079 (CC BY 4.0)" >}}

### 핵심 연산: 미분 가능한 타일 기반 래스터화

#### 1. 3D에서 2D로 투영 (Projection)

3D 공분산 $\Sigma$를 뷰 변환 행렬($W$)과 야코비안 행렬($J$)을 이용해 2D 공분산 $\Sigma'$로 투영합니다.

$$
\Sigma' = J W \Sigma W^T J^T
$$

#### 2. 타일 기반 컬링 및 정렬 (Tile-based Sorting)

화면을 $16 \times 16$ 픽셀 타일로 분할하고, 시야각(Frustum) 밖의 가우시안을 제거(Culling)합니다.

GPU Radix Sort를 사용하여 가우시안들을 카메라로부터의 **깊이(Depth) 순으로 고속 정렬**합니다.

#### 3. 알파 블렌딩 (Alpha Blending)

정렬된 가우시안들을 앞에서부터 순차적으로 누적하여 픽셀 색상 $C$를 계산합니다.

$$
C = \sum_{i \in N} c_i \alpha_i \prod_{j=1}^{i-1} (1 - \alpha_j)
$$

누적 불투명도가 1에 도달하면 뒤쪽 가우시안 연산을 연산 생략(Early Stop)하여 최적화합니다.

## 4. Optimization & Adaptive Density Control

### Loss Function

픽셀 단위 오차인 $L_1$ Loss와 이미지 구조 유사도를 보장하는 D-SSIM을 결합하여 오차를 계산합니다.

$$
\mathcal{L} = (1 - \lambda) \mathcal{L}_1 + \lambda \mathcal{L}_{D-SSIM}
$$

### 적응형 밀도 제어 (Adaptive Density Control)

위치 변화율(Positional Gradient)이 높은 가우시안을 감지하여 100 이터레이션마다 구조를 동적으로 갱신합니다.

* **Clone (복제)**: 크기가 작고 오차가 큰 경우, 가우시안을 복제하여 **빈 공간(Under-reconstruction)을 보완**합니다.

* **Split (분할)**: 크기가 크고 오차가 큰 경우, 가우시안 1개를 삭제하고 작은 가우시안 2개로 분할하여 **디테일(Over-reconstruction)을 복원**합니다.

* **Pruning (가지치기)**: 불투명도 $\alpha < 0.005$ 이거나 비정상적으로 팽창한 가우시안을 메모리에서 삭제하여 **연산 효율성 및 노이즈를 제어**합니다.

## 5. Conclusion & Insights

### 학술적·산업적 의의

* 무거운 인공신경망 기반 렌더링에서 GPU 래스터화 기반의 **명시적 렌더링 기법으로의 성공적인 패러다임 전환**을 이뤄냈습니다.

* 실시간 렌더링 성능을 확보함으로써 AR/VR, 메타버스, 자율주행 시뮬레이션 분야의 실사 3D 공간 재구성 적용 가능성을 크게 열었습니다.

### 기술적 한계점

* **VRAM 사용량**: 수백만 개 가우시안의 파라미터를 상주시켜야 하므로 GPU 메모리 소모가 큽니다.

* **대용량 파일 저장**: 최적화 결과물이 씬당 수백 MB \~ 수 GB 단위의 `.ply` 파일로 저장되어 전송 및 저장 공간 부담이 존재합니다.
