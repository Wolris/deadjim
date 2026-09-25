# ACTIVE TODO

## Current phase

**Post-Phase 1 — Public Alpha / SkelForm Adoption**

Dead Jim `0.1.0-alpha.1` was published on September 25, 2026.

## CURRENT EXECUTION LOCK

**LOCKED — Prove the chosen SkelForm workflow with real consumer evidence before adding features.**

Dead Jim exists to make the free/open **SkelForm -> Dead Jim -> Phaser 4** authoring/runtime path practical. The adapter architecture is an implementation boundary, not a roadmap mandate to support multiple authoring formats.

Acceptance criteria:

- keep SkelForm as the selected authoring tool and source format unless a concrete real-world blocker proves it inadequate;
- exercise the published `dead-jim@alpha` package through a representative SkelForm-authored character/animation workflow rather than evaluating replacement authoring tools;
- validate the already-proven Phase 1 capabilities that the real authored asset actually uses: hierarchy, transforms, sprite attachments, pivots/origins, draw order, linear transform animation, playback, attachment/style selection, and two-pose blending as applicable;
- record only concrete gaps discovered by the real workflow;
- do not add weighted meshes, IK, physics, advanced curves, extra source adapters, extra renderer adapters, or other deferred features without evidence that the chosen workflow needs them;
- keep any private consumer details out of this public repository; public evidence may use sanitized/reproducible fixtures or maintainer-reported results;
- if the real SkelForm workflow passes within the current boundary, treat that as adoption evidence rather than inventing new Dead Jim scope;
- if it exposes a reproducible gap, promote exactly that smallest gap as the successor lock.

## NEXT

Use Dead Jim in the intended SkelForm-authored Phaser workflow. Promote only the smallest reproducible compatibility/runtime gap that real use exposes.

## Recently closed

### Product-focus correction — DONE

DragonBones/LoongBones evaluation was removed from the active roadmap. Multiple source adapters remain an architectural possibility only if concrete evidence later requires one.

### Release automation decision — DONE

Publication remains manual for now. Revisit after a second manual pre-release or when release cadence makes the manual path materially repetitive. If automation is later justified, prefer npm Trusted Publishing with GitHub Actions OIDC and preserve explicit maintainer approval.

### First public pre-release — DONE

`dead-jim@0.1.0-alpha.1` is publicly released.

Evidence:

- final release commit: `35a86f21339e4b5267d052859d7935e3bd888c2d`;
- post-release reconciliation merged at `a65da361cb95e7d68f7858bcdeb52a5a8ceb5629`;
- release-automation decision merged at `f680438f96ec6e8683ab068e5b7b6fcc4a9daa0b`;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 files;
- npm publication: live;
- Git tag: `v0.1.0-alpha.1`;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**.

## Explicitly deferred

- alternative source formats unless SkelForm proves inadequate for a concrete required workflow;
- automated npm/GitHub publication until repetition justifies it;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints/interpolation;
- additional renderer adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
