# ACTIVE TODO

## Current phase

**Post-Phase 1 — Public Alpha**

Dead Jim `0.1.0-alpha.1` was published on September 25, 2026.

## CURRENT EXECUTION LOCK

**LOCKED — Evaluate DragonBones/LoongBones as the second source-format discriminator.**

The first public alpha and release-process decision are complete. The next evidence-backed source-adapter candidate is DragonBones/LoongBones: it fits Dead Jim's adapter-first architecture, has a public JSON format, and has MIT-licensed runtime/reference implementations. This lock is an evaluation/discriminator, not a commitment to mass feature expansion.

Acceptance criteria:

- identify the current practical DragonBones/LoongBones authoring/export path and the public source-format documentation that should be treated as compatibility evidence;
- pin one concrete format/version or representative public fixture for the discriminator rather than targeting "DragonBones" generically;
- verify the relevant license boundary and keep Dead Jim's adapter independently implemented and MIT-safe;
- map the smallest useful subset into the existing normalized model: bone hierarchy, local bind transforms, image attachments/slots, pivot/origin or equivalent transform data, draw order, animation timing, and transform keyframes;
- compare DragonBones coordinate/rotation/scale conventions with Dead Jim's normalized coordinate-space ADR;
- explicitly identify source features that remain unsupported or rejected, including weighted meshes/deform, IK/constraints, nested armatures, advanced curves, and other behavior not proven by the Phase 1 boundary;
- determine whether the current normalized model can represent the discriminator without consumer-specific or DragonBones-specific leakage;
- record a go/no-go recommendation for a minimal adapter spike;
- if the discriminator is viable, define the smallest implementation fixture and acceptance checks as the successor lock rather than implementing broad format support in this evaluation lock.

## NEXT

If the DragonBones/LoongBones discriminator is viable, implement only the pinned minimal source-adapter slice proven by the evaluation. If it is not viable, record why and promote the next evidence-backed runtime, renderer, or tooling item from `BACKLOG.md`.

## Recently closed

### Release automation decision — DONE

Publication remains manual for now.

Evidence and decision:

- the first manual release path is proven end to end;
- existing CI already automates deterministic validation and package-boundary checks on Linux and Windows/Node 24;
- one release does not yet justify a second high-impact publication path;
- future automation should use npm Trusted Publishing with GitHub Actions OIDC rather than a long-lived npm publish token;
- revisit after a second manual pre-release or when release cadence makes the manual sequence materially repetitive;
- explicit maintainer approval remains mandatory before merge/tag/publication boundaries.

### First public pre-release — DONE

`dead-jim@0.1.0-alpha.1` is publicly released.

Evidence:

- final release commit: `35a86f21339e4b5267d052859d7935e3bd888c2d`;
- merged-`main` validation run 85: PASS;
- post-release reconciliation merged at `a65da361cb95e7d68f7858bcdeb52a5a8ceb5629`;
- post-merge validation run 87: PASS;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 files;
- npm publication: live under dist-tag `alpha`;
- Git tag: `v0.1.0-alpha.1` at the final release commit;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- clean consumer runtime/type checks: PASS.

### Windows package-validation release blocker — DONE

The Windows `spawnSync npm.cmd EINVAL` failure was fixed before publication and permanent Windows/Node 24 package validation was added to CI.

## Explicitly deferred

- automated npm/GitHub publication until a second manual pre-release or meaningful release cadence justifies it;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints/interpolation;
- additional adapters beyond the active evidence-driven DragonBones/LoongBones discriminator;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
