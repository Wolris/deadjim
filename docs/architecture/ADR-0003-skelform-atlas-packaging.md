# ADR-0003 — SkelForm atlas packaging boundary

Status: Accepted

## Context

Dead Jim's Phase 1 browser demo proved the normalized runtime and Phaser renderer with a SkelForm-shaped JSON fixture plus individually loaded image assets.

A real SkelForm v0.7.2 runtime export has a different asset-packaging boundary:

- `armature.json` contains `atlases[]`, `styles[]`, and `visuals[]`;
- texture pixels are packed into `atlasX.png` files;
- each style records texture name, atlas index, pixel offset, and pixel size;
- a visual refers to a texture by name;
- SkelForm style resolution uses the first active style containing that texture name.

Therefore the synthetic Phase 1 demo did not yet prove that a genuine SkelForm export could reach the Phaser renderer without consumer-specific atlas parsing.

## Decision

Keep atlas packaging outside Dead Jim's normalized skeleton model.

### Source boundary

The SkelForm source module models the exported atlas/style metadata and exposes a pure texture-region resolver.

The resolver:

- accepts an explicit ordered list of active SkelForm style ids;
- resolves each texture name referenced by the exported visuals;
- uses the first active style containing the texture, matching SkelForm's documented style precedence;
- returns renderer-neutral packaging metadata: asset id, source style, atlas filename/index, and pixel rectangle;
- rejects missing styles, missing textures, invalid rectangles, duplicate names within a selected style, and missing atlas references deterministically.

The normalized `SpriteAttachmentDefinition.assetId` remains the SkelForm texture name. No atlas fields enter the normalized skeleton.

### Phaser boundary

The Phaser renderer accepts an optional asset resolver.

By default an attachment asset id remains a standalone Phaser texture key, preserving the existing public behavior.

A generic Phaser atlas-region registration helper can:

- map an atlas filename to the consumer's loaded Phaser texture key;
- register a named Phaser frame for each resolved region;
- return an asset resolver that maps Dead Jim asset ids to the registered texture/frame pair;
- fall back to the existing standalone-texture behavior for asset ids not present in the registered atlas set.

The consumer remains responsible for loading the atlas image files before registration. Dead Jim does not own application-specific URL resolution or Phaser loader lifecycle orchestration.

## Deferred

This decision does not add:

- dynamic SkelForm style switching after renderer construction;
- automatic network/file loading;
- texture-atlas caching policy;
- new animation channels;
- mesh deformation;
- IK or physics;
- advanced interpolation;
- another source format;
- another renderer.

If the representative real-asset proof requires live independent hair/clothing/equipment style switching, promote only that reproducible gap after this packaging boundary is proven.

## Consequences

- Real SkelForm runtime exports can use their native packed atlas metadata without contaminating the normalized runtime.
- Existing loose-texture Dead Jim consumers remain compatible.
- The Phaser renderer stays source-agnostic: it receives only asset bindings, not SkelForm fields.
- Multiple SkelForm styles and atlases can be represented without committing Dead Jim to a specific application loading strategy.
- The next adoption proof can use an actual SkelForm export instead of a hand-authored approximation.
