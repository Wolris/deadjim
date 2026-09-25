# ACTIVE TODO

## Current phase

**Post-Phase 1 — Public Alpha / SkelForm Adoption**

Dead Jim `0.1.0-alpha.1` was published on September 25, 2026.

## CURRENT EXECUTION LOCK

**AWAITING VALIDATION — Close the real SkelForm atlas-packaging blocker before the representative asset proof.**

The first adoption review found a concrete mismatch between the synthetic Phase 1 demo and genuine SkelForm v0.7.2 runtime exports: SkelForm ships `armature.json` plus packed `atlasX.png` files, with texture rectangles under `styles[].textures[]`. Dead Jim alpha.1 previously assumed referenced textures were already standalone Phaser texture keys.

Acceptance criteria:

- model the pinned SkelForm atlas/style texture metadata required by real exports;
- resolve texture regions using explicit active-style order and SkelForm's first-active-style-containing-the-texture precedence;
- keep atlas packaging out of the normalized skeleton model;
- preserve existing loose-texture behavior for current Dead Jim consumers;
- let the Phaser adapter accept an asset-id-to-texture/frame resolver;
- provide a generic Phaser helper that registers resolved atlas regions against already-loaded atlas images;
- reject missing styles, textures, atlases, and invalid region metadata deterministically;
- keep dynamic style switching, loader/network orchestration, meshes, IK, physics, and advanced animation out of this slice;
- pass full Linux validation and the Windows/Node 24 package boundary with the package file count unchanged.

## NEXT

After this atlas-packaging fix is merged and green, perform the first **real SkelForm editor/export proof** with a short representative Adventurer asset set:

- one shared base character rig;
- idle + one expressive/action animation;
- at least one texture/style variation sufficient to prove the exported style/atlas path;
- Phaser rendering through the public Dead Jim package boundary.

If that proof passes, expand only as needed toward the previously accepted customization evidence (hair, clothing, held equipment) and record any concrete gap before implementing it.

After the representative asset proof is solid and any blocking gaps are closed, promote the **public promotional/adoption website** milestone from `BACKLOG.md`.

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
