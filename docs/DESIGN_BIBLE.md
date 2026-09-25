# Dead Jim Design Bible

## Purpose

This document is the public product source of truth for Dead Jim.

## Product statement

Dead Jim is an **MIT-licensed open-source TypeScript bridge/runtime** for bringing **SkelForm-authored 2D skeletal animation into Phaser 4** through a small, explicit adapter architecture.

The initial pipeline is:

```text
SkelForm -> source adapter -> normalized Dead Jim runtime -> Phaser 4 renderer adapter
```

## Problem

2D skeletal-animation authoring and game-engine playback are often tightly coupled. Dead Jim aims to provide a small runtime boundary that can consume an open authoring format while keeping renderer-specific concerns out of the normalized animation model.

## Founding principles

- **Open workflow** — the core path should not require a commercial skeletal-animation runtime license.
- **MIT core** — Dead Jim's own software implementation is MIT-licensed.
- **Runtime first** — build the bridge/runtime before considering editor tooling.
- **Adapters over lock-in** — source formats and renderers live behind explicit boundaries.
- **Renderer-neutral core** — normalized skeleton and animation data should not depend on Phaser classes.
- **Small surface area** — implement only features proven useful by real runtime examples.
- **Inspectable behavior** — prefer explicit TypeScript data and deterministic animation math.
- **Public-safe repository** — examples, fixtures, docs, and logs must not contain private workflow, secrets, or personal information.

## Initial capability boundary

The first milestone targets:

- bone hierarchy;
- local and world transform propagation;
- sprite/image attachments;
- pivots/origins and z-order;
- keyframed translation, rotation, and scale;
- animation playback and looping;
- simple interpolation and crossfade/blending;
- modular attachment/style swapping;
- Phaser 4 rendering through an adapter.

## Explicitly deferred

Until runtime evidence requires them:

- custom animation/rigging editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints;
- multiple renderer adapters;
- consumer-specific domain concepts.

## External projects

### SkelForm

[SkelForm](https://skelform.org/) is the first authoring/source-format target. Its editor is GPL-3.0. Dead Jim isolates SkelForm-specific parsing from the normalized runtime and does not copy or vendor the GPL editor implementation.

### skelform-js

[skelform-js](https://github.com/Retropaint/skelform-js) is an MIT-licensed reference/runtime implementation that may be used for interoperability evidence. If code is incorporated from it, its upstream MIT notice must be preserved.

### Phaser 4

[Phaser](https://github.com/phaserjs/phaser) is MIT-licensed and is the first renderer target. Phaser-specific objects and lifecycle behavior belong in the renderer adapter rather than the normalized runtime.

See `docs/THIRD_PARTY.md` for the license boundaries.

## Independence

Dead Jim is an independent community project maintained by Curadh Creative / Wolris and is not an official SkelForm or Phaser project.

## Name

Bones. He's dead, Jim.
