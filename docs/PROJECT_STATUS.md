# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing open 2D skeletal/vector animation into Phaser 4 through a small, explicit runtime and adapter boundary.

Repository: `Wolris/deadjim`

## Product direction

The current target workflow is:

```text
SVG-native authoring
      ↓
Dead Jim source adapter
      ↓
normalized skeletal runtime
      ↓
semantic appearance/material resolution
      ↓
Phaser 4 renderer adapter
```

The released SkelForm adapter remains a supported compatibility path. It is no longer assumed to be the production authoring workflow because concrete real-asset requirements now include reusable semantic SVG source assets that must survive long enough for metadata-driven color/material resolution.

## Phase 1 — complete

The original SkelForm runtime path is proven end to end. Maintainer browser validation: **4/4 PASS**.

## Package boundary — proven

Dead Jim emits ESM JavaScript and TypeScript declarations, defines explicit package exports/files, retains Phaser as a peer dependency, and passes clean packed-artifact consumer runtime/type smoke tests.

## First public pre-release — LIVE

`dead-jim@0.1.0-alpha.1` was publicly released on September 25, 2026.

Release identity:

- npm package: `dead-jim@0.1.0-alpha.1`;
- npm dist-tag: `alpha`;
- Git tag: `v0.1.0-alpha.1`;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- final release commit: `35a86f21339e4b5267d052859d7935e3bd888c2d`.

## SVG-native asset boundary — proven

A focused semantic-SVG discriminator passed maintainer browser validation **7/7**.

It proved hierarchical SVG parts, joint pivots, theme/material recoloring of the same source assets, hair swapping, portable Idle/Action transforms, and successful customized SVG export.

ADR-0004 records the resulting architecture boundary.

## Current execution

The active lock is the first external SVG-native authoring-tool discriminator.

Premation is the first candidate because it is a no-cost/open-source desktop editor with SVG import, hierarchical bone rigging, keyframeable bone transforms, and inspectable local project bundles.

The required evidence is a tiny imported SVG rig with practical pivots, Idle + Action, at least rotation plus translation or scale animation, and a saved local `.motion` bundle. Dead Jim will then inspect only the public project data needed to determine whether a small source adapter is viable while original semantic SVG masters remain the appearance source of truth.

Custom Dead Jim editor development remains deferred unless bounded external-tool tests establish that it is necessary.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`, then ADR-0004 if the active authoring lock needs architecture context. The first public alpha is live; SkelForm remains supported; the current work is evidence-driven selection of an SVG-native authoring path.
