# ACTIVE TODO

## Current phase

**Phase 1 — Core Runtime Discriminator**

Public repository bootstrap is complete. Dead Jim is an MIT-licensed open-source project focused on the SkelForm -> Dead Jim -> Phaser 4 pipeline.

## CURRENT EXECUTION LOCK

**LOCKED — Implement the first real SkelForm import mapping and fixture.**

Acceptance criteria:

- use the focused implementation branch from current `main`;
- pin the SkelForm source shape/version used by the first fixture from public upstream evidence;
- add a small public-safe source fixture representative of the first supported SkelForm data path;
- map that source through the isolated SkelForm adapter into the normalized `SkeletonDefinition`;
- convert source-specific transform/channel conventions at the adapter boundary rather than leaking SkelForm names into the normalized model;
- add deterministic importer tests covering hierarchy, transforms, attachments, and animation data present in the fixture;
- preserve the MIT/GPL boundary in `docs/THIRD_PARTY.md`; do not copy GPL editor implementation into Dead Jim;
- do not implement the Phaser renderer adapter in this lock;
- do not add weighted meshes, IK, physics, advanced constraints, editor UI, or consumer-specific concepts;
- keep repository content self-contained and free of private workflow or personal information.

## NEXT

Implement the first Phaser 4 renderer adapter only after the SkelForm import discriminator passes and the normalized pose output is proven against imported data.

## Recently closed

### Pose evaluation and first keyframe interpolation — DONE

Closure basis: GitHub Actions validation run 13 completed successfully on `feature/pose-evaluation-runtime` for commit `835c6ae`.

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

- Phaser 4 renderer adapter until the SkelForm import discriminator passes;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- multiple renderer adapters;
- package publishing/release automation;
- consumer-specific integration until the independent runtime discriminator passes.
