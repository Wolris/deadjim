# Engineering Backlog

Approved future work that is not active.

## Core runtime

- Bone hierarchy and world-transform evaluation.
- Animation clips, looping, interpolation, and crossfade.
- Sprite attachments, pivots, z-order, tint/visibility where useful.
- Modular attachment/style swaps.
- Animation events if a real consumer requires them.

## Source adapters

- SkelForm importer.
- Evaluate DragonBones/LoongBones import only if useful after the first milestone.
- Define a stable normalized serialized fixture format for tests.

## Renderer adapters

- Phaser 4 reference adapter.
- Evaluate a second renderer only after the core boundary is proven and there is a real consumer.

## Advanced animation

- Weighted mesh deformation.
- IK/constraints.
- Physics/spring behavior.
- Advanced curve interpolation.

These are deferred until real animation evidence proves they are needed.

## Tooling

- CLI validator/inspector for source files.
- Debug bone/attachment overlay.
- Example sandbox/demo.
- Package publishing and semantic versioning.

## Editor

A custom Dead Jim authoring editor is explicitly deferred. Revisit only if repeated use demonstrates that free/open authoring tools cannot satisfy the workflow.
