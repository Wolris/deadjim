# Dead Jim Design Bible

## Purpose

This document is the public product source of truth for Dead Jim.

## Product statement

Dead Jim is an **MIT-licensed open-source TypeScript bridge/runtime** for bringing **SkelForm-authored 2D skeletal animation into Phaser 4** through a small, explicit adapter architecture.

The reference pipeline is:

```text
SkelForm -> source adapter -> normalized Dead Jim runtime -> Phaser 4 renderer adapter
```

## Problem

2D skeletal-animation authoring and game-engine playback are often tightly coupled. Dead Jim provides a small runtime boundary that can consume an open authoring format while keeping renderer-specific concerns out of the normalized animation model.

## Founding principles

- **Open workflow** — the core path should not require a commercial skeletal-animation runtime license.
- **MIT core** — Dead Jim's own software implementation is MIT-licensed.
- **Runtime first** — build and prove the bridge/runtime before considering editor tooling.
- **Adapters over lock-in** — source formats and renderers live behind explicit boundaries.
- **Renderer-neutral core** — normalized skeleton and animation data do not depend on Phaser classes.
- **Small surface area** — implement only features proven useful by real runtime examples.
- **Inspectable behavior** — prefer explicit TypeScript data and deterministic animation math.
- **Public-safe repository** — examples, fixtures, docs, and logs must not contain private workflow, secrets, or personal information.

## Phase 1 capability boundary — proven

Phase 1 established and validated:

- bone hierarchy and parent-before-child evaluation;
- normalized local/world translation, rotation, and scale propagation;
- sprite/image attachments;
- normalized pivots/origins and z-order;
- linear keyframed translation, rotation, and scale;
- deterministic clip playback and looping;
- renderer-neutral attachment/style selection;
- deterministic two-pose crossfade/blending;
- a pinned SkelForm v0.7.2 source adapter;
- a Phaser 4.2.1 renderer adapter;
- a public browser sandbox that exercises the complete reference path.

The browser sandbox under `examples/phase1/` is the milestone proof. Automated validation covers typechecking, runtime/import/renderer tests, and production demo build; maintainer browser validation passed all four visual checks.

## Architecture boundary

Dead Jim keeps four responsibilities separate:

1. **Source adapters** convert external authoring formats into normalized data.
2. **Normalized runtime** owns renderer-independent skeleton, attachment, animation, playback, and pose state.
3. **Animation evaluation** performs deterministic timing, interpolation, selection, and blending.
4. **Renderer adapters** own engine-specific display objects and lifecycle behavior.

Source-specific conventions are converted at import boundaries. Renderer-specific representation stays in renderer adapters.

## Post-Phase 1 release boundary

Phase 1 proves runtime behavior, but it does **not** yet prove a distributable library package.

Before package publishing, tagging, or a public release, Dead Jim must establish and validate a package distribution contract:

- emitted JavaScript and TypeScript declaration artifacts;
- explicit package entry points / exports;
- an intentional published-files boundary;
- a clean consumer import smoke test against the built artifact;
- package metadata and versioning appropriate for a pre-release;
- a later explicit release decision.

Release-readiness work should not be used as a reason to widen the runtime feature set.

## Explicitly deferred

Until real runtime or consumer evidence requires them:

- custom animation/rigging editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints;
- non-linear/advanced curve interpolation;
- tint animation;
- multiple renderer adapters;
- multiple source adapters beyond evidence-driven evaluation;
- multi-layer blending, blend trees, additive animation, masks, and state machines;
- animation events unless a real consumer requires them;
- speed curves and custom scheduling;
- consumer-specific domain concepts.

## External projects

### SkelForm

[SkelForm](https://skelform.org/) is the first authoring/source-format target. Its editor is GPL-3.0. Dead Jim isolates SkelForm-specific parsing from the normalized runtime and does not copy or vendor the GPL editor implementation.

The first compatibility target is SkelForm v0.7.2 / serialized armature version 0.7.1.

### skelform-js

[skelform-js](https://github.com/Retropaint/skelform-js) is an MIT-licensed reference/runtime implementation that may be used for interoperability evidence. If code is incorporated from it, its upstream MIT notice must be preserved.

### Phaser 4

[Phaser](https://github.com/phaserjs/phaser) is MIT-licensed and is the first renderer target. The reference adapter is pinned and validated against Phaser 4.2.1. Phaser-specific objects and lifecycle behavior belong in the renderer adapter rather than the normalized runtime.

See `docs/THIRD_PARTY.md` for license boundaries.

## Independence

Dead Jim is an independent community project maintained by Curadh Creative / Wolris and is not an official SkelForm or Phaser project.

## Name

Bones. He's dead, Jim.
