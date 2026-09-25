# ACTIVE TODO

## Current phase

**Phase 1 — Core Runtime Discriminator**

Dead Jim now has a validated public runtime path from pinned SkelForm data through normalized pose evaluation into the first Phaser 4 renderer boundary.

## CURRENT EXECUTION LOCK

**LOCKED — Implement the smallest runtime clip-playback and looping path.**

Acceptance criteria:

- begin from current `main` after the Phaser renderer-adapter branch is merged;
- keep playback timing engine-independent and separate from Phaser scene/update ownership;
- provide the smallest explicit playback state needed to sample one `AnimationClip` over elapsed milliseconds;
- non-looping clips clamp deterministically at their endpoint;
- looping clips wrap deterministically by clip duration;
- zero-duration clips remain stable and deterministic;
- feed sampled playback time through the existing pose evaluator and prove the resulting pose through the Phaser renderer adapter;
- add deterministic tests for initial time, advancement, endpoint clamping, loop wrapping, and zero-duration behavior;
- do not add crossfade/blending, animation events, layered animation, speed curves, state machines, or a custom scheduler in this lock;
- do not add weighted meshes, IK, physics, advanced constraints, editor UI, or consumer-specific concepts;
- keep repository content self-contained and free of private workflow or personal information.

## NEXT

Prove basic attachment/style swapping against the normalized runtime only after single-clip playback is validated end to end.

## Recently closed

### First Phaser 4 renderer adapter — DONE

Closure basis: GitHub Actions validation run 26 completed successfully on `feature/phaser4-renderer-adapter` for commit `3461024`.

Durable result:

- Phaser 4.2.1 is the first pinned renderer/type-validation target and remains a peer runtime dependency;
- Phaser-specific display-object ownership and lifecycle are isolated in `src/renderer/phaser.ts`;
- the adapter creates one Phaser Image per normalized sprite attachment and applies normalized origin, depth, visibility, evaluated world position, rotation, and scale;
- renderer input is limited to validated normalized skeleton data plus `SkeletonPose`; no SkelForm source fields leak into the renderer;
- ADR-0002 defines Dead Jim's normalized 2D coordinate space as +X right, +Y down, clockwise-positive radians, with center-relative normalized attachment pivots;
- the SkelForm adapter converts its Y-up / counter-clockwise source conventions into normalized Dead Jim coordinates at the import boundary;
- unsupported SkelForm bind-hidden, tint, pivot-rotation, and pivot-scale semantics are rejected rather than silently lost;
- deterministic tests cover renderer creation, transform application, visibility, lifecycle/error cases, and the full SkelForm fixture -> import -> validation -> pose -> Phaser adapter path;
- actual Phaser 4.2.1 types compile in CI and the package installs cleanly; no browser-only behavior is introduced by this lock, so a separate manual browser smoke was not required.

### First real SkelForm import mapping and fixture — DONE

Closure basis: GitHub Actions validation run 19 completed successfully on `feature/skelform-import-v0.7.2` for commit `e13fca7`.

Durable result:

- the first compatibility target is pinned to SkelForm release `v0.7.2`, commit `37b268dfa578a2fb2e31c29814c5f609249475f2`;
- the v0.7.2 source tag serializes Cargo package version `0.7.1` into `armature.json`, so the compatibility fixture correctly declares armature version `0.7.1`;
- the independently authored public fixture exercises hierarchy, immutable `init_*` bind transforms, one sprite visual, pivot/z-order data, and linear transform animation keyframes;
- the SkelForm adapter maps source IDs, parent relationships, visuals, frame/fps timing, and scalar transform channels into the normalized runtime model;
- imported data is validated and evaluated through the engine-independent pose evaluator in deterministic tests;
- mesh, IK, physics, unsupported source versions, and non-linear SkelForm interpolation are rejected explicitly instead of being silently discarded;
- SkelForm-specific field names remain confined to the source-adapter boundary;
- the GPL editor source is not copied or vendored into Dead Jim.

### Pose evaluation and first keyframe interpolation — DONE

Closure basis: GitHub Actions validation passed for the pose-evaluation implementation before merge to `main`.

Durable result:

- local transforms propagate through validated parent-before-child hierarchy order;
- parent translation, rotation, and scale contribute deterministically to child world transforms;
- transform channels support first-path linear numeric interpolation with endpoint clamping;
- sparse channels fall back to bind-pose values;
- bind-pose evaluation works without a clip;
- invalid missing-bone tracks, duplicate bone tracks, and non-increasing keyframe times fail deterministically;
- the runtime remains engine-independent and contains no Phaser objects.

### Normalized TypeScript runtime and source-adapter scaffold — DONE

Closure basis: TypeScript package/test harness, normalized runtime types, hierarchy validation, isolated SkelForm adapter seam, deterministic tests, and CI validation are present.

Durable result:

- engine-independent normalized types cover skeletons, bones, sprite attachments, animation clips, keyframes, and pose state;
- hierarchy validation rejects duplicate IDs, missing parents, cycles, and attachments targeting missing bones;
- the SkelForm boundary remains isolated from normalized runtime names;
- no renderer-specific objects are present in the normalized runtime.

### Open-source public project bootstrap — DONE

Closure basis: repository structure, MIT licensing, public documentation, project artwork, and CI validation.

Durable result:

- the repository has Repo Rules, Design Bible, roadmap process, backlog, project status, ADR-0001, contribution guidelines, security policy, and third-party license notes;
- Dead Jim software is MIT-licensed;
- the architecture is source adapter -> normalized runtime -> renderer adapter;
- SkelForm is the first source-format discriminator and Phaser 4 is the first renderer adapter;
- custom editor work remains deferred;
- public repository documentation is self-contained.

## Explicitly deferred

- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints;
- multiple renderer adapters;
- animation crossfade/blending and state machines until basic playback is proven;
- animation events until a real consumer requirement exists;
- package publishing/release automation;
- consumer-specific integration until the independent runtime discriminator includes basic clip playback.
