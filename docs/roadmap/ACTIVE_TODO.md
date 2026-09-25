# ACTIVE TODO

## Current phase

**Phase 1 — Core Runtime Discriminator**

Dead Jim now has a validated public runtime path from pinned SkelForm data through deterministic playback, attachment/style selection, normalized pose evaluation, and the Phaser 4 renderer boundary.

## CURRENT EXECUTION LOCK

**LOCKED — Implement the smallest deterministic two-clip crossfade/blending path.**

Acceptance criteria:

- begin from current `main` after the attachment/style-swapping branch is merged;
- keep blending engine-independent and separate from Phaser scene/update ownership;
- blend exactly two evaluated clip poses using one explicit normalized weight in the range 0..1;
- blend translation, rotation, and scale deterministically per bone;
- preserve deterministic attachment visibility semantics without inventing layered attachment blending;
- define and test endpoint identity: weight 0 exactly matches the first pose, weight 1 exactly matches the second pose;
- reject invalid weights and incompatible skeleton/pose inputs explicitly;
- prove one blended pose renders correctly through the existing Phaser adapter;
- add focused tests for endpoints, midpoint interpolation, rotation/scale behavior, invalid weight, and renderer output;
- do not add multi-layer blending, blend trees, state machines, animation events, easing curves, masks, additive animation, or custom scheduling in this lock;
- do not add weighted meshes, IK, physics, advanced constraints, editor UI, or consumer-specific concepts;
- keep repository content self-contained and free of private workflow or personal information.

## NEXT

Add the smallest public example sandbox/demo that proves the completed Phase 1 runtime path visually after two-clip blending is validated.

## Recently closed

### Basic attachment/style swapping — DONE

Closure basis: GitHub Actions validation run 38 completed successfully on `feature/attachment-style-swapping` for commit `d41d0fe`.

Durable result:

- the normalized runtime now supports optional attachment slots containing mutually exclusive attachment alternatives plus one deterministic default;
- skeletons without attachment slots retain previous behavior: all attachments remain visible;
- runtime selections change only `visibleAttachments`; playback time and bone transforms remain unchanged;
- invalid unknown slots and attachments outside the selected slot fail explicitly;
- duplicate attachment IDs, duplicate slot IDs, missing alternatives, invalid defaults, duplicate alternatives, and attachments assigned to multiple slots are rejected during validation;
- deterministic tests cover default selection, active swapping, invalid selection, ambiguous slot ownership, and transform/playback invariance across a swap;
- the Phaser adapter is proven with both alternatives instantiated while rendering only the selected attachment;
- no SkelForm style-import expansion, texture animation, tint animation, crossfade, state machine, or renderer-owned selection logic was added.

### Single-clip playback and looping — DONE

Closure basis: GitHub Actions validation run 32 completed successfully on `feature/clip-playback-looping` for commit `579ecf4`.

Durable result:

- playback state is engine-independent and stores only the active `AnimationClip` plus elapsed milliseconds;
- non-looping clips clamp deterministically at their endpoint;
- looping clips wrap deterministically by clip duration;
- zero-duration clips remain stable at time zero;
- invalid negative/non-finite clip durations, elapsed time, and advancement fail explicitly;
- playback sampling feeds the existing pose evaluator without Phaser lifecycle ownership or a custom scheduler;
- deterministic tests cover initial time, incremental advancement, endpoint clamping, loop wrapping, zero-duration behavior, and invalid timing input;
- the pinned SkelForm fixture is advanced through a looping playback state, evaluated into a normalized pose, and rendered through the Phaser adapter in one end-to-end test;
- no speed control, pause API, animation events, crossfade, layered animation, state machine, or renderer-owned timing was added.

### First Phaser 4 renderer adapter — DONE

Closure basis: GitHub Actions validation run 26 completed successfully on `feature/phaser4-renderer-adapter` for commit `3461024`.

Durable result:

- Phaser 4.2.1 is the first pinned renderer/type-validation target and remains a peer runtime dependency;
- Phaser-specific display-object ownership and lifecycle are isolated in `src/renderer/phaser.ts`;
- the adapter creates one Phaser Image per normalized sprite attachment and applies normalized origin, depth, visibility, evaluated world position, rotation, and scale;
- renderer input is limited to validated normalized skeleton data plus `SkeletonPose`; no SkelForm source fields leak into the renderer;
- ADR-0002 defines Dead Jim's normalized 2D coordinate space as +X right, +Y down, clockwise-positive radians, with center-relative normalized attachment pivots;
- the SkelForm adapter converts its Y-up / counter-clockwise source conventions into normalized Dead Jim coordinates at the import boundary;
- deterministic tests cover renderer creation, transform application, visibility, lifecycle/error cases, and the full SkelForm fixture -> import -> validation -> pose -> Phaser adapter path.

### First real SkelForm import mapping and fixture — DONE

Closure basis: GitHub Actions validation run 19 completed successfully on `feature/skelform-import-v0.7.2` for commit `e13fca7`.

Durable result:

- the first compatibility target is pinned to SkelForm release `v0.7.2`, commit `37b268dfa578a2fb2e31c29814c5f609249475f2`;
- the independently authored public fixture exercises hierarchy, bind transforms, one sprite visual, pivot/z-order data, and linear transform animation keyframes;
- imported data is validated and evaluated through the engine-independent pose evaluator;
- mesh, IK, physics, unsupported versions, and non-linear interpolation are rejected explicitly;
- SkelForm-specific fields remain confined to the source-adapter boundary.

### Pose evaluation and first keyframe interpolation — DONE

Durable result:

- local transforms propagate through validated parent-before-child hierarchy order;
- transform channels support deterministic linear interpolation with endpoint clamping;
- sparse channels fall back to bind-pose values;
- invalid track structure fails explicitly;
- the runtime remains engine-independent.

### Normalized TypeScript runtime and source-adapter scaffold — DONE

Durable result:

- engine-independent normalized types cover skeletons, bones, sprite attachments, animation clips, keyframes, and pose state;
- hierarchy validation rejects malformed structure;
- the SkelForm boundary remains isolated from normalized runtime names.

### Open-source public project bootstrap — DONE

Durable result:

- repository governance, licensing, architecture, roadmap, contribution, security, and third-party boundaries are public and self-contained;
- Dead Jim software is MIT-licensed;
- the architecture is source adapter -> normalized runtime -> renderer adapter.

## Explicitly deferred

- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints;
- multiple renderer adapters;
- multi-layer blending, blend trees, additive animation, and state machines;
- animation events until a real consumer requires them;
- speed curves and custom scheduling;
- package publishing/release automation;
- consumer-specific integration until the initial Phase 1 capability boundary is complete.
