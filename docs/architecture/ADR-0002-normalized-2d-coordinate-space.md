# ADR-0002: Normalized 2D Coordinate Space

## Status

Accepted.

## Context

Dead Jim must keep source-format conventions out of the normalized runtime and renderer-specific conventions out of source adapters.

SkelForm's renderer constructs texture quads around their center, uses a mathematical Y-up transform space, and applies `pivot_pos` as a texture-size-relative center offset. Phaser 4 uses screen-oriented coordinates where +Y points down, positive rotation proceeds clockwise, and Image origins are normalized from top-left (0, 0) to bottom-right (1, 1).

Without a canonical normalized convention, either every renderer would need to know SkelForm rules or every source adapter would need to know Phaser rules.

Upstream references:

- SkelForm v0.7.2 renderer: https://github.com/Retropaint/SkelForm/blob/v0.7.2/src/renderer.rs
- Phaser Game Object transforms: https://docs.phaser.io/phaser/concepts/gameobjects/components
- Phaser Game Object origins: https://docs.phaser.io/phaser/concepts/gameobjects

## Decision

Dead Jim's normalized 2D space is:

- +X points right;
- +Y points down;
- positive rotation is clockwise in radians;
- scale is unitless and remains per-axis;
- sprite attachment `pivotX` / `pivotY` are normalized offsets from the texture center, where (0, 0) means the texture is centered on the bone.

Source adapters convert their native conventions into this space.

Renderer adapters consume this normalized space directly and convert only renderer representation details. For Phaser Images, a Dead Jim center-relative pivot maps to:

```text
originX = 0.5 - pivotX
originY = 0.5 - pivotY
```

## Consequences

For the pinned SkelForm v0.7.2 source adapter:

- source Y values are negated;
- source rotation values are negated;
- source pivot Y is negated;
- X and scale values pass through unchanged.

The engine-independent pose evaluator does not need source- or renderer-specific branches. Phaser can apply evaluated world position, rotation, and scale directly.
