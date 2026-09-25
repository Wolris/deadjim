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

Automated validation plus maintainer browser validation prove the milestone behavior.

## Architecture boundary

Dead Jim keeps four responsibilities separate:

1. **Source adapters** convert external authoring formats into normalized data.
2. **Normalized runtime** owns renderer-independent skeleton, attachment, animation, playback, and pose state.
3. **Animation evaluation** performs deterministic timing, interpolation, selection, and blending.
4. **Renderer adapters** own engine-specific display objects and lifecycle behavior.

Source-specific conventions are converted at import boundaries. Renderer-specific representation stays in renderer adapters.

## Package distribution boundary — proven and released

The post-Phase 1 package boundary is validated and publicly released:

- the public `src/index.ts` surface emits ESM JavaScript and TypeScript declarations;
- package exports/types resolve to the emitted `dist/lib` artifact;
- packed contents are constrained to the built library plus required package documentation/metadata;
- Phaser remains a peer dependency;
- a clean temporary consumer installs the packed tarball, imports representative runtime exports, and typechecks representative public types;
- `dead-jim@0.1.0-alpha.1` is the first public npm package and GitHub pre-release.

Future releases remain behind explicit maintainer approval and the release process defined in `docs/RELEASE_POLICY.md`.

## Public alpha state

The first public alpha proves the original SkelForm -> Dead Jim -> Phaser 4 path and the package distribution boundary. Additional source formats or renderer adapters remain evidence-driven extensions, not automatic scope expansion.

Publication automation is intentionally deferred until repeated release work justifies it. If adopted later, it must preserve the explicit maintainer approval boundary and use short-lived trusted authentication rather than reusable publishing secrets.

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
