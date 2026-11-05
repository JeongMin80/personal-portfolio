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

> **Summary**: This review covers a paper that overcomes the performance bottlenecks of NeRF's implicit representation and ray marching. By using explicit **3D Gaussian ellipsoids** and **differentiable tile-based rasterization**, it achieves real-time rendering at over 100 FPS at 1080p resolution.

## 1. Background & Motivation

### Limitations of the NeRF Approach

**Implicit Representation**: Information about 3D space is stored in the weights of a multilayer perceptron (MLP), rather than in explicit data such as points or meshes.

**Ray Marching Bottleneck**: A ray is cast for each pixel, hundreds of points are sampled along it, and each sample is passed through the MLP to calculate color and density.

**Limitation**: Rendering a 1080p image requires millions of neural-network computations, making **real-time rendering at 30+ FPS impossible** and resulting in very long training times.

### How 3DGS Addresses These Limitations

**Explicit Representation**: Instead of a neural network, the scene is represented by millions of **3D Gaussian** ellipsoids that can be accessed directly in GPU memory.

**Splatting & Tile-Based Rasterization**: Rather than casting rays, 3D Gaussians are projected onto the 2D image plane. The image is divided into tiles, and the projected Gaussians are sorted by depth and blended efficiently.

**Result**: The method maintains state-of-the-art image quality while achieving **real-time rendering at over 100 FPS at 1080p** and substantially reducing training time.

## 2. Core Representation: 3D Gaussian Parameters

Each 3D Gaussian in the scene has **four key parameters** learned through backpropagation of the rendering error.

$$
G(x) = e^{-\frac{1}{2} (x-\mu)^T \Sigma^{-1} (x-\mu)}
$$

| Parameter | Symbol | Definition & Engineering Significance |
| ----- | ----- | ----- |
| **Position** | $\mu$ | The 3D coordinates $(x, y, z)$ of the Gaussian ellipsoid's center |
| **Covariance** | $\Sigma$ | A $3 \times 3$ covariance matrix that determines the ellipsoid's shape and orientation. For stable optimization, it is parameterized by scale ($S$) and rotation ($R$): $\Sigma = R S S^T R^T$ |
| **Opacity** | $\alpha$ | The Gaussian's opacity ($0 \le \alpha \le 1$), which acts as a weight during alpha blending |
| **Color** | $SH$ | Spherical harmonics coefficients that represent view-dependent color |

## 3. Overall Pipeline & Differentiable Rasterization

{{< review-figure src="images/projects/3dgs-pipeline.png" alt="Overall 3D Gaussian Splatting pipeline" placeholder="Pipeline image coming soon" >}}

### Key Operation: Differentiable Tile-Based Rasterization

#### 1. Projection from 3D to 2D

The 3D covariance $\Sigma$ is projected into the 2D covariance $\Sigma'$ using the viewing transformation matrix ($W$) and Jacobian matrix ($J$).

$$
\Sigma' = J W \Sigma W^T J^T
$$

#### 2. Tile-Based Culling and Sorting

The image is divided into $16 \times 16$ pixel tiles, and Gaussians outside the viewing frustum are culled.

GPU radix sort then efficiently sorts the Gaussians by their **depth relative to the camera**.

#### 3. Alpha Blending

The sorted Gaussians are accumulated from front to back to calculate the pixel color $C$.

$$
C = \sum_{i \in N} c_i \alpha_i \prod_{j=1}^{i-1} (1 - \alpha_j)
$$

Once the accumulated opacity reaches 1, computations for Gaussians farther back are skipped through early stopping.

## 4. Optimization & Adaptive Density Control

### Loss Function

The method combines pixel-wise $L_1$ loss with D-SSIM, which measures structural image similarity.

$$
\mathcal{L} = (1 - \lambda) \mathcal{L}_1 + \lambda \mathcal{L}_{D-SSIM}
$$

### Adaptive Density Control

Gaussians with high positional gradients are identified, and the structure is updated dynamically every 100 iterations.

* **Clone**: Small Gaussians with high error are duplicated to fill under-reconstructed areas.

* **Split**: Large Gaussians with high error are replaced by two smaller Gaussians to recover detail in over-reconstructed areas.

* **Pruning**: Gaussians with opacity $\alpha < 0.005$ or those that have expanded abnormally are removed from memory to improve computational efficiency and reduce noise.

## 5. Conclusion & Insights

### Academic and Practical Significance

* The method demonstrates a successful shift from computationally expensive neural-network-based rendering to **explicit rendering based on GPU rasterization**.

* By enabling real-time rendering, it substantially expands the potential for applying photorealistic 3D scene reconstruction to AR/VR, the metaverse, and autonomous-driving simulation.

### Technical Limitations

* **VRAM Usage**: Keeping the parameters of millions of Gaussians in GPU memory requires substantial memory.

* **Large Files**: The optimized result can be stored as a `.ply` file ranging from hundreds of megabytes to several gigabytes per scene, creating storage and transfer costs.
