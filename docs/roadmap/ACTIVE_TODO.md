# ACTIVE TODO

## Current phase

**Phase 1 — Milestone Review**

The Phase 1 runtime discriminator is functionally complete: pinned SkelForm data imports into the normalized runtime, animates through playback and pose evaluation, supports attachment selection and two-pose blending, renders through Phaser 4, and is proven in a public browser demo.

## CURRENT EXECUTION LOCK

**LOCKED — Close Phase 1 with the smallest milestone review.**

Acceptance criteria:

- begin from current `main` after the Phase 1 browser-demo branch is merged;
- reconcile `docs/DESIGN_BIBLE.md` against the capabilities actually proven in Phase 1;
- reconcile `docs/roadmap/BACKLOG.md` so completed Phase 1 work is not duplicated as future work;
- update `docs/PROJECT_STATUS.md` with the completed Phase 1 evidence and the next honest project boundary;
- identify any release-readiness gaps that must be resolved before package publishing, tagging, or a public release;
- keep release creation, tagging, package publishing, editor work, consumer integration, and new runtime features outside this review unless explicitly promoted afterward;
- leave exactly one truthful successor execution lock for the next phase or release-readiness work.

## NEXT

Determine the next phase or release-readiness lock from the milestone review evidence. Do not preselect a feature before the review establishes the next boundary.

## Recently closed

### Public Phase 1 browser sandbox/demo — DONE

Closure basis:

- GitHub Actions validation run 51 completed successfully on `feature/phase1-browser-demo` for commit `97ceb88`;
- maintainer manual browser validation: **4/4 PASS**.

Durable result:

- `examples/phase1/` provides a self-contained public browser sandbox for the complete Phase 1 pipeline;
- the demo uses the real `SkelFormAdapter`, skeleton validation, clip playback/looping, attachment selection, pose evaluation, two-pose blending, and `Phaser4RendererAdapter`;
- the visual fixture includes animated bone motion, a cyan/magenta attachment swap, and a live two-clip blend control;
- demo UI and interaction state remain outside the core runtime;
- Vite is pinned as a direct development dependency at the version already used by the validation toolchain;
- TypeScript covers the demo source and `npm run validate` now includes a production demo build so the example cannot silently rot;
- exact local run instructions and visual PASS criteria are documented in both the repository README and `examples/phase1/README.md`;
- manual validation confirmed continuous animation, responsive blend control, uninterrupted style swapping, and successful swap-back behavior.

### Deterministic two-clip crossfade/blending — DONE

Closure basis: GitHub Actions validation run 45 completed successfully on `feature/two-clip-crossfade` for commit `9d14e2f`.

Durable result:

- exactly two compatible evaluated poses can be blended by one explicit finite weight in the range 0..1;
- endpoint weights preserve exact pose identity;
- intermediate local/world translation, rotation, and scale blend deterministically;
- incompatible bones or attachment visibility fail explicitly;
- blended output is proven through the Phaser renderer.

### Basic attachment/style swapping — DONE

Durable result:

- renderer-neutral attachment slots provide deterministic defaults and explicit runtime alternatives;
- swaps affect visibility without changing playback timing or bone transforms;
- invalid or ambiguous selections fail explicitly.

### Single-clip playback and looping — DONE

Durable result:

- engine-independent playback clamps non-looping clips, wraps looping clips, and handles zero-duration clips deterministically.

### First Phaser 4 renderer adapter — DONE

Durable result:

- Phaser 4.2.1 rendering remains isolated behind the renderer adapter;
- normalized transforms, origins, depth, visibility, and lifecycle are proven.

### First real SkelForm import mapping and fixture — DONE

Durable result:

- the first compatibility target is pinned to SkelForm v0.7.2 / armature version 0.7.1;
- source-specific conversion remains isolated to the source adapter.

### Pose evaluation and first keyframe interpolation — DONE

Durable result:

- hierarchy transforms and linear transform-channel interpolation are deterministic and engine-independent.

### Normalized TypeScript runtime and source-adapter scaffold — DONE

Durable result:

- normalized skeleton, attachment, animation, and pose types plus hierarchy validation are established.

### Open-source public project bootstrap — DONE

Durable result:

- repository governance, licensing, architecture, roadmap, contribution, security, and third-party boundaries are public and self-contained.

## Explicitly deferred

- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints;
- multiple renderer adapters;
- multi-layer blending, blend trees, additive animation, masks, and state machines;
- animation events until a real consumer requires them;
- speed curves and custom scheduling;
- package publishing, tagging, and releases until the Phase 1 milestone review identifies release-readiness gaps;
- consumer-specific integration until the independent milestone review closes.
