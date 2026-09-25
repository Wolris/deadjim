# ACTIVE TODO

## Current phase

**Phase 1 — Core Runtime Discriminator**

Dead Jim now has a validated public runtime path from pinned SkelForm data through deterministic playback, attachment/style selection, two-pose blending, normalized pose evaluation, and the Phaser 4 renderer boundary.

## CURRENT EXECUTION LOCK

**LOCKED — Add the smallest public example sandbox/demo for the completed Phase 1 runtime path.**

Acceptance criteria:

- begin from current `main` after the two-clip crossfade/blending branch is merged;
- keep the example public-safe and self-contained;
- demonstrate the normalized pipeline visually without introducing consumer-specific concepts;
- use the existing SkelForm adapter, validated skeleton runtime, playback/looping, attachment selection, pose evaluation, blending, and Phaser 4 renderer adapter rather than reimplementing those behaviors in demo code;
- provide a minimal browser entrypoint and public assets sufficient to see the runtime working;
- include at least one visible animated bone transform, one attachment/style swap, and one two-pose blend/crossfade interaction or deterministic scripted transition;
- keep demo-specific UI/state outside the core runtime;
- add the smallest validation needed so the example build cannot silently rot;
- document exact local run instructions and what constitutes PASS;
- do not widen this lock into package publishing, editor tooling, advanced animation, or consumer integration.

## NEXT

Close Phase 1 and perform the smallest milestone review: reconcile the Design Bible, backlog, project status, and release-readiness gaps before starting a new phase.

## Recently closed

### Deterministic two-clip crossfade/blending — DONE

Closure basis: GitHub Actions validation run 45 completed successfully on `feature/two-clip-crossfade` for commit `9d14e2f`.

Durable result:

- exactly two compatible evaluated poses can be blended by one explicit finite weight in the range 0..1;
- endpoint weights preserve exact pose identity: weight 0 returns the first pose and weight 1 returns the second pose;
- intermediate translation, rotation, and scale are linearly blended for both local and world transforms;
- intermediate blends require matching bone IDs and identical attachment visibility, avoiding implicit layered attachment blending;
- invalid weights and incompatible pose inputs fail explicitly;
- deterministic tests cover endpoints, midpoint/non-midpoint TRS interpolation, invalid weights, incompatible bones, and attachment visibility mismatch;
- a blended pose produced from two evaluated clips renders correctly through the Phaser 4 adapter;
- no multi-layer blending, blend trees, additive animation, state machines, masks, easing curves, animation events, or renderer-owned blend timing were added.

### Basic attachment/style swapping — DONE

Closure basis: GitHub Actions validation run 38 completed successfully on `feature/attachment-style-swapping` for commit `d41d0fe`.

Durable result:

- the normalized runtime supports optional attachment slots with mutually exclusive alternatives and deterministic defaults;
- runtime selection changes only `visibleAttachments`;
- playback time and bone transforms remain unchanged across swaps;
- invalid and ambiguous slot structures/selections fail explicitly;
- Phaser rendering is proven with selected alternatives.

### Single-clip playback and looping — DONE

Closure basis: GitHub Actions validation run 32 completed successfully on `feature/clip-playback-looping` for commit `579ecf4`.

Durable result:

- playback state is engine-independent;
- non-looping clips clamp, looping clips wrap, and zero-duration clips remain stable;
- playback feeds pose evaluation and Phaser rendering deterministically.

### First Phaser 4 renderer adapter — DONE

Durable result:

- Phaser 4.2.1 is the first renderer/type-validation target;
- Phaser-specific lifecycle and display-object ownership remain isolated in the renderer adapter;
- normalized transforms, origins, depth, and visibility render deterministically.

### First real SkelForm import mapping and fixture — DONE

Durable result:

- the first compatibility target is pinned to SkelForm v0.7.2 / armature version 0.7.1;
- source-specific fields and coordinate conversion remain isolated to the source adapter;
- the pinned fixture runs through validation and pose evaluation.

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
- package publishing/release automation until Phase 1 milestone review;
- consumer-specific integration until the independent Phase 1 demo is complete.
