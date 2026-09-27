# ADR-0004 — Semantic SVG source and authoring boundary

Status: Accepted

## Context

Dead Jim Phase 1 proved a working SkelForm -> Dead Jim -> Phaser 4 runtime path. Real production-style asset work then exposed a distinct requirement that the SkelForm raster-atlas export path does not preserve directly:

- reusable SVG body and item parts;
- semantic color/material slots that can be changed from metadata;
- scalable source geometry;
- modular overlapping joints with intentionally selective linework;
- hierarchy/animation data that stays separate from appearance data.

A focused browser discriminator was built with separate SVG parts, semantic attributes, hierarchical transforms, swappable hair, reusable held-item material slots, Idle/Action animation data, and vector SVG export.

Maintainer-reported validation: 7/7 PASS. The customized export also passed.

## Decision

Dead Jim will treat semantic SVG source assets and skeletal animation data as separate but cooperating concerns.

### Appearance source

The canonical appearance asset may remain SVG long enough to resolve semantic data such as:

- theme colors;
- item material colors;
- clothing colors;
- hair/gear part swaps.

The source SVG may use explicit semantic attributes or IDs. Dead Jim must not require one pre-rendered raster file for every appearance permutation.

### Animation source

An authoring tool/project format may provide:

- bone hierarchy;
- bind/local transforms;
- pivots;
- z/layer identity;
- animation clips;
- keyframed translation/rotation/scale.

That authoring format does not need to be the canonical store for semantic SVG attributes as long as stable part identity can map the authored transforms back to the original SVG masters.

### Runtime/renderer

The normalized runtime remains renderer-neutral. A renderer adapter may rasterize/cache customized SVG results when useful for performance, while the reusable semantic SVG master remains the source of appearance truth.

Phaser is not required to animate raw SVG path geometry every frame.

## SkelForm consequence

The existing SkelForm adapter remains supported and released. SkelForm is no longer assumed to be the canonical production authoring workflow because its runtime export packages texture pixels into raster atlases and therefore cannot, by itself, preserve the semantic SVG source boundary now proven necessary.

## External editor policy

Prefer an existing no-cost external authoring tool before considering a custom Dead Jim editor.

A candidate succeeds if it can efficiently author a practical hierarchical rig/animation while:

- original SVG masters remain independently addressable;
- stable part/layer identity can map animation data back to those masters;
- project/export data is inspectable enough for a clean-room source adapter;
- no commercial runtime license is required.

Do not copy third-party implementation code whose license is incompatible with Dead Jim's MIT core. Projects with no explicit license grant may be evaluated as external tools but must not be copied, modified, or redistributed by Dead Jim.

## First external discriminator

Premation is the first bounded candidate because public documentation/source evidence indicates:

- SVG import;
- hierarchical bone rigging;
- keyframeable bone rotation, x/y, scaleX/scaleY;
- local .motion project bundles with inspectable JSON chunks;
- open-source AGPL-3.0 licensing;
- local desktop operation.

The discriminator must prove workflow and inspectable project data before any Premation adapter is implemented.

## Consequences

- Production asset generation can scale through semantic SVG reuse rather than combinatorial raster exports.
- Animation authoring can change independently from appearance authoring.
- Dead Jim's adapter architecture earns its intended source-format independence through concrete evidence rather than speculative multi-adapter work.
- A custom Dead Jim editor remains deferred until bounded external-tool tests prove one is necessary.
