# ADR-0001 — Runtime and Adapter Boundary

Status: Proposed

## Context

Dead Jim exists to provide a lightweight 2D skeletal-animation bridge/runtime without requiring a commercial skeletal-animation runtime license.

The initial integration target is the public **SkelForm -> Dead Jim -> Phaser 4** pipeline. Free/open authoring tools may provide useful rigging and animation workflows, but their runtime integrations do not necessarily match modern TypeScript game stacks.

## Decision

Dead Jim will use three explicit layers:

1. **Source adapters** parse external authoring formats.
2. **Normalized runtime model** owns skeletons, bones, attachments, animation clips, and evaluated pose state.
3. **Renderer adapters** map evaluated runtime state into an engine/rendering environment.

The first source-format discriminator is SkelForm.

The first renderer adapter is Phaser 4.

The normalized runtime model must not expose Phaser objects or consumer-specific concepts.

## First milestone capability

- bone hierarchy;
- local/world transform propagation;
- sprite/image attachments;
- pivot/origin and z-order;
- keyframed translate/rotate/scale;
- clip playback and looping;
- simple interpolation and crossfade/blend;
- modular attachment/style swapping.

## Deferred

- custom visual editor;
- weighted meshes;
- IK;
- physics;
- advanced constraints;
- multiple renderer adapters.

## Consequences

- Authoring tools can be replaced without rewriting consumer data or the renderer core.
- Phaser integration can be pragmatic without contaminating the normalized runtime.
- Dead Jim can later support additional source formats or renderers if real use justifies them.
- The project owns a small amount of skeletal runtime math instead of a full animation-authoring application.
