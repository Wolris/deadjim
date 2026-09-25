# ACTIVE TODO

## Current phase

**Post-Phase 1 — Release Readiness**

Phase 1 is complete and proven by automated validation plus maintainer browser validation. The next boundary is making the existing runtime consumable as a package artifact without publishing it yet.

## CURRENT EXECUTION LOCK

**LOCKED — Establish and validate the library distribution/package boundary without publishing.**

Acceptance criteria:

- begin from current `main` after the Phase 1 milestone-review branch is merged;
- keep runtime behavior unchanged unless a packaging defect proves a minimal fix is required;
- add an emitted ESM library build for the public `src/index.ts` API;
- emit TypeScript declarations for the public API;
- define explicit package entry points / `exports` for the built library;
- define an intentional published-files boundary that excludes tests, private workflow, demo build output, and repository-only material unless deliberately included;
- keep Phaser as a peer runtime dependency rather than bundling it into the core artifact;
- add a deterministic package validation path that builds and packs the package without publishing;
- prove a clean consumer can install/import the packed artifact and access representative public APIs;
- keep `npm publish`, Git tags, GitHub releases, release automation, and final public version selection outside this lock;
- do not add new animation features, editor work, additional adapters, or consumer-specific integration.

## NEXT

After the package artifact passes, review the packed contents and consumer smoke evidence, then choose the smallest pre-release metadata/versioning lock. Do not publish or tag until explicitly approved.

## Recently closed

### Phase 1 milestone review — DONE

Closure basis: repository evidence reviewed after merged Phase 1 demo; merged `main` validation run 55 passed.

Findings:

- the Design Bible now records Phase 1 capabilities as proven rather than aspirational;
- the backlog no longer duplicates completed Phase 1 runtime/import/renderer/demo work;
- Phase 1 is explicitly closed in project status;
- the next project boundary is release readiness rather than additional runtime features;
- package-release gaps are explicit: no emitted library build/declarations, no exports/files contract, no packed-artifact consumer smoke, and no established pre-release versioning/release-notes policy;
- publishing, tagging, and releases remain deliberately blocked behind later explicit locks.

### Public Phase 1 browser sandbox/demo — DONE

Closure basis:

- GitHub Actions validation runs 51 and 53: PASS;
- maintainer browser validation: **4/4 PASS**;
- merged `main` validation run 55: PASS.

Durable result:

- the public browser sandbox proves animated transforms, live two-pose blending, attachment/style swapping, and Phaser rendering through real Dead Jim APIs;
- demo TypeScript and production build are part of repository validation.

### Phase 1 runtime discriminator — DONE

Proven capabilities:

- normalized skeleton hierarchy and world transforms;
- linear transform keyframe interpolation;
- SkelForm v0.7.2 source import boundary;
- deterministic playback/looping;
- renderer-neutral attachment/style swapping;
- deterministic two-pose blending;
- Phaser 4.2.1 renderer adapter;
- public browser proof.

## Explicitly deferred

- npm publishing, Git tags, GitHub releases, and release automation until later explicit approval;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints and interpolation;
- multiple renderer/source adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, and state machines;
- animation events until a real consumer requires them;
- speed curves and custom scheduling;
- consumer-specific integration;
- new runtime features while release-readiness packaging is active.
