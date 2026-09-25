# ACTIVE TODO

## Current phase

**Post-Phase 1 — Public Alpha / SkelForm Adoption**

Dead Jim `0.1.0-alpha.1` was published on September 25, 2026.

## CURRENT EXECUTION LOCK

**AWAITING MANUAL EVIDENCE — Prove one genuine SkelForm editor/export asset end to end.**

The real-export atlas packaging blocker is closed. The next proof must originate in **SkelForm v0.7.2 itself**, not a hand-authored JSON fixture.

Use a deliberately small, readable humanoid-style rig so this remains a runtime/adoption proof rather than an art project.

Required authoring evidence:

- create/save the rig in SkelForm v0.7.2;
- use a small visible part set: **torso, head, arm**;
- hierarchy: torso/root with head and arm as children;
- create **Default** and **Alternate** styles;
- Default provides all three texture names;
- Alternate overrides at least the arm texture using the **same texture name**, allowing active-style precedence to be proven while unspecified textures fall back to Default;
- create two animations: **Idle** and **Action**;
- Idle changes at least one supported transform subtly;
- Action visibly rotates and/or moves the arm;
- every authored animation keyframe used by this proof must use **Linear** interpolation;
- keep pivots at supported position-only values; no pivot rotation or pivot scale changes;
- do not use mesh deformation, IK, physics, tint animation, hidden bind-pose bones, or any other deferred feature;
- save/export the resulting `.skf` file and provide that exact editor-produced file for the repository proof.

Repository acceptance after the editor-produced file is available:

- unpack only the runtime-required `armature.json` and atlas image(s) from the genuine `.skf`;
- import the armature with the public `SkelFormAdapter`;
- resolve the Default style and the Alternate-over-Default style using the real exported atlas metadata;
- render through Phaser 4 using the public atlas/frame binding path;
- demonstrate Idle and Action playback without consumer-specific source parsing;
- prove the style override changes the intended texture while the remaining parts fall back correctly;
- keep the public fixture sanitized/generic and free of private consumer details;
- pass full Linux validation, Windows/Node 24 package validation, and a concise maintainer browser PASS checklist.

## NEXT

After the genuine editor/export proof passes, expand only as real use requires toward a short representative production-style asset set. Record any concrete compatibility/runtime gap before implementing it.

Once the representative asset proof is solid and blocking gaps are closed, promote the **public promotional/adoption website** milestone from `BACKLOG.md`.

## Recently closed

### Real SkelForm atlas packaging — DONE

PR #19 closed the first adoption blocker.

Evidence:

- merged commit: `5b7d1e4622d54df5d054b49af304e2616cc2628e`;
- merged-`main` validation run 104: PASS;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed package boundary remains 23 files;
- genuine SkelForm `atlases[]` / `styles[].textures[]` metadata is supported without changing the normalized skeleton model;
- ADR-0003 records the accepted packaging boundary.

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
