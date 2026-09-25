# ACTIVE TODO

## Current phase

**Phase 1 — Core Runtime Discriminator**

Dead Jim now has a validated engine-independent runtime path from a pinned SkelForm source shape through normalized pose evaluation. The next discriminator is the first Phaser 4 renderer boundary.

## CURRENT EXECUTION LOCK

**LOCKED — Implement the first Phaser 4 renderer adapter.**

Acceptance criteria:

- begin from current `main` after the SkelForm importer branch is merged;
- keep Phaser-specific classes, lifecycle, and object ownership inside a renderer-adapter module;
- consume normalized `SkeletonDefinition` / evaluated `SkeletonPose`; do not parse SkelForm data in the renderer;
- create or update sprite/image display objects from normalized attachment definitions;
- apply evaluated bone world position, rotation, and scale to rendered attachments;
- apply normalized pivot/origin and z-order data without adding renderer concepts to the normalized runtime model;
- add the smallest deterministic adapter tests practical for the boundary;
- add a minimal Phaser runtime/browser smoke validation if automated unit evidence cannot prove object behavior;
- do not add weighted meshes, IK, physics, advanced constraints, editor UI, or consumer-specific concepts;
- do not widen this lock into animation crossfade/blending or a custom playback framework;
- keep repository content self-contained and free of private workflow or personal information.

## NEXT

Add the smallest runtime clip-playback/looping path and prove it through the renderer adapter before expanding into blending or modular attachment/style swapping.

## Recently closed

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
- SkelForm is the first source-format discriminator and Phaser 4 is the first planned renderer adapter;
- custom editor work remains deferred;
- public repository documentation is self-contained.

## Explicitly deferred

- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints;
- multiple renderer adapters;
- animation crossfade/blending until basic playback is proven;
- package publishing/release automation;
- consumer-specific integration until the independent runtime discriminator passes through Phaser.
