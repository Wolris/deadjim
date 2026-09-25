# ACTIVE TODO

## Current phase

**Phase 1 — Core Runtime Discriminator**

Public repository bootstrap is complete. Dead Jim is now an MIT-licensed open-source project focused on the SkelForm -> Dead Jim -> Phaser 4 pipeline.

## CURRENT EXECUTION LOCK

**LOCKED — Scaffold the normalized TypeScript runtime and SkelForm import boundary.**

Acceptance criteria:

- use a focused implementation branch from `main`;
- establish the smallest TypeScript package/test harness needed for runtime work;
- define engine-independent normalized types for skeletons, bones, attachments, animation clips, and pose state;
- define a SkelForm source-adapter boundary without leaking SkelForm-specific concepts into the normalized model;
- add deterministic unit tests for hierarchy/transform data-shape behavior that can run before Phaser integration exists;
- do not implement the Phaser renderer adapter in this lock;
- do not add mesh deformation, IK, physics, or editor UI;
- keep core packages and fixtures consumer-neutral;
- keep repository content free of private workflow or personal information;
- preserve the MIT/GPL boundary documented in `docs/THIRD_PARTY.md`.

## NEXT

Implement pose evaluation: local/world transform propagation plus the first keyframe interpolation path.

## Recently closed

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

- Phaser 4 renderer adapter until the normalized runtime boundary is proven;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- multiple renderer adapters;
- package publishing/release automation;
- consumer-specific integration until the independent runtime discriminator passes.
