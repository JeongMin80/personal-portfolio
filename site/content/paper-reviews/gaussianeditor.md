---
title: "Paper Review: GaussianEditor: Swift and Controllable 3D Editing with Gaussian Splatting"
description: "A paper review of GaussianEditor's semantic tracing, hierarchical Gaussian representation, and 3D inpainting."
hideDate: true
enableReadingTime: false
toc: false
hideTags: true
socialShare: false
tags:
  - Paper Review
  - 3D Editing
  - Gaussian Splatting
---

> **Summary**: GaussianEditor tracks the targets of an edit in a 3D Gaussian Splatting (3DGS) scene and modifies selected regions with guidance from a 2D generative model. Its key components are **Gaussian Semantic Tracing** for selecting the target, **Hierarchical Gaussian Splatting (HGS)** for stabilizing the edit, and **3D inpainting** for removing or adding objects. The paper reports a typical editing time of about 5–10 minutes under its experimental setup.

## 1. Background & Motivation

### Challenges in Existing 3D Editing Methods

**NeRF-based editing**: NeRF stores scene information implicitly in a neural network. This makes it difficult to select or modify a specific part of a scene directly, while training and rendering also take time.

**3DGS-based editing**: 3DGS provides direct access to individual Gaussians and supports fast rendering. However, identifying precisely which Gaussians belong to the object being edited is difficult. Guidance from a 2D generative model can also vary between steps, making optimization unstable when the Gaussians are updated without additional constraints.

### GaussianEditor's Approach

The paper assigns semantic labels to the Gaussians targeted for editing and tracks them throughout training. It also groups Gaussians by when they were created and limits changes to the existing structure. Separate 3D inpainting procedures handle object removal and addition.

## 2. Core Methodology

The overall GaussianEditor workflow can be understood as **selecting a target, generating 2D editing guidance, and optimizing the 3D Gaussians**. Object removal and addition each require additional inpainting steps.

### Gaussian Semantic Tracing: Tracking the Edit Target

The 3DGS scene is first rendered from multiple viewpoints, and a 2D segmentation model produces masks of the target. The mask information is then mapped back to the Gaussians that contributed to the rendered images, allowing each Gaussian to receive a semantic label.

When new Gaussians are created during editing, they inherit their parent Gaussian's label. Unlike an approach that uses a fixed initial 2D mask, this allows the edit target to be tracked as the number and positions of Gaussians change. The paper uses these labels to select which Gaussians to update, densify, and render.

### Hierarchical Gaussian Splatting: Stabilizing the Edit

HGS groups Gaussians into **generations according to the densification step in which they were created**. Gaussians present from the beginning are constrained more strongly to preserve the original scene structure. Gaussians created later have relatively more freedom to form new details.

Here, an **anchor** is not a separate point placed in space. It is a **reference state** recorded for a Gaussian's position, scale, rotation, opacity, and color. An anchor loss discourages the current attributes from deviating too far from that state. The reference states and generation-specific constraints are updated as densification proceeds.

### Editing Guidance from a 2D Generative Model

Rather than proposing a new diffusion model, GaussianEditor uses existing 2D editing methods as guidance. The paper's experiments use image-editing guidance from Instruct-NeRF2NeRF and guidance from Delta Denoising Score (DDS). The Gaussians are optimized so that renderings of the 3DGS scene better match the editing instruction, while semantic tracing and HGS control the editing region and stability.

## 3. Editing Pipeline & Tasks

### General Scene Editing

1. Prepare an existing 3DGS scene and a text editing instruction.
2. When needed, transfer 2D segmentation results to Gaussian semantic labels to identify the target.
3. Render the scene from selected viewpoints and obtain editing guidance from a 2D generative model.
4. Optimize the Gaussians using the editing loss and generation-specific anchor constraints.

### Object Removal and Addition

| Task | Method Described in the Paper |
| ----- | ----- |
| **Object removal** | Remove the Gaussians with the target semantic label. Use a 2D inpainting result to repair artifacts at the boundary between the removed object and the surrounding scene. |
| **Object addition** | Use a 2D mask at a user-selected viewpoint and a text instruction to generate an image of the new object. Convert it to a coarse 3D mesh, transform it into Gaussians, refine it with HGS, and combine it with the existing scene. |

Object addition also involves aligning the generated object's depth with that of the existing scene to determine its position and scale. It therefore requires more steps than simply placing new Gaussians in the image.

## 4. Experiments & Results

### Editing Speed and Control

The paper's experiments were conducted on a single RTX A6000 GPU. The authors report about **5–10 minutes** for a typical scene edit, about **2 minutes** for object removal, and about **5 minutes** for object addition. These timings apply to the settings and examples reported in the paper; they do not mean that every scene takes the same amount of time.

In the quantitative comparison, user preference for Instruct-NeRF2NeRF, GaussianEditor-DDS, and GaussianEditor-iN2N was **15.45%**, **12.27%**, and **72.28%**, respectively. Their CLIP Directional Similarity scores were **0.1600**, **0.1813**, and **0.2071**, respectively. GaussianEditor-iN2N scored highest on both measures in this comparison.

### Role of Each Component

In the paper's ablation experiments, removing HGS caused Gaussians to spread or densify excessively across the scene, producing blurry results. Without semantic tracing, regions outside the intended target could also change. The two components therefore address **optimization stability** and **control of the editing region**, respectively.

## 5. Conclusion & Insights

### Key Takeaways

GaussianEditor uses the fast rendering and direct access to individual Gaussians offered by 3DGS for editing. Two especially important ideas in the paper are maintaining the target's semantic labels throughout training and giving newly created Gaussians more freedom to change through the HGS design.

### Limitations

The paper explains that 3D editing is affected when the 2D diffusion model cannot adequately follow complex instructions. GaussianEditor's results therefore also depend on the quality of the chosen 2D editing guidance.
