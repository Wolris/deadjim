# Changelog

All notable public changes to Dead Jim are recorded here.

Dead Jim uses Semantic Versioning. See `docs/RELEASE_POLICY.md`.

## 0.1.0-alpha.1 — 2026-09-25

### Added

- SkelForm v0.7.2 source adapter targeting serialized armature version 0.7.1.
- Renderer-neutral normalized skeleton, attachment, animation, playback, and pose model.
- Parent-to-child local/world transform propagation.
- Linear translation, rotation, and scale keyframe interpolation.
- Deterministic clip playback and looping.
- Renderer-neutral attachment/style slots and runtime selection.
- Deterministic two-pose crossfade/blending.
- Phaser 4.2.1 renderer adapter.
- Public Phase 1 browser demo.
- Emitted ESM library build and TypeScript declarations.
- Explicit package exports and packed-file boundary.
- Clean packed-artifact consumer runtime/type smoke validation.

### Known limitations

- ESM-only package boundary.
- First source-format target is limited to the proven SkelForm v0.7.2 subset.
- Only linear transform interpolation is supported.
- Weighted meshes, IK, physics, advanced constraints, tint animation, multi-layer blending, blend trees, additive animation, masks, state machines, and animation events are not supported.
- Phaser 4.2.1 is the only proven renderer target.
- This is an alpha pre-release; public API changes are expected before 0.1.0.
