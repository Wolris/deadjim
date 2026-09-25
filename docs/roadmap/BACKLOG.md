# Engineering Backlog

Approved future work that is not active.

Completed Phase 1 and completed package-boundary work are intentionally omitted here. See `docs/roadmap/ACTIVE_TODO.md` and `docs/PROJECT_STATUS.md` for milestone evidence.

## Release readiness

- Verify the intended public package identity/name.
- Choose an intentional initial pre-release version and semantic-versioning policy.
- Add the smallest changelog/release-notes convention.
- Review final package metadata before changing publish posture.
- Decide package publishing automation only after a first manual pre-release path is approved.
- Create npm publications, tags, and GitHub releases only through an explicit maintainer-approved release lock.

## Core runtime

- Animation events if a real consumer requires them.
- Tint/visibility animation only when a concrete authored example requires it.
- Consider richer interpolation only when source-format evidence requires it.
- Consider more than two blended layers only when a real consumer proves the need.

## Source adapters

- Evaluate DragonBones/LoongBones import only if useful after the first milestone.
- Define a stable normalized serialized fixture format if cross-adapter testing benefits from it.

## Renderer adapters

- Evaluate a second renderer only after a real consumer requires one.

## Advanced animation

- Weighted mesh deformation.
- IK/constraints.
- Physics/spring behavior.
- Advanced curve interpolation.
- Additive animation, masks, blend trees, and state machines.

These remain deferred until real animation evidence proves they are needed.

## Tooling

- CLI validator/inspector for source files.
- Debug bone/attachment overlay.
- Optional hosted/demo deployment after release-readiness work establishes an appropriate publishing path.

## Editor

A custom Dead Jim authoring editor is explicitly deferred. Revisit only if repeated use demonstrates that free/open authoring tools cannot satisfy the workflow.
