# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Current direction

Initial reference stack:

- SkelForm as the first source-format target;
- TypeScript core runtime;
- normalized engine-independent skeletal runtime model;
- Phaser 4 as the first renderer adapter.

The initial product is runtime/adapter tooling, not a custom editor.

## Proven runtime path

The automated discriminator now covers:

```text
SkelForm v0.7.2 armature.json shape
        ↓
Dead Jim SkelForm source adapter
        ↓
normalized skeleton / animation data
        ↓
validated hierarchy
        ↓
clip playback / looping
        ↓
attachment/style selection
        ↓
evaluated poses
        ↓
two-pose crossfade/blending
        ↓
Phaser 4.2.1 renderer adapter
```

Two compatible evaluated poses can be blended with one normalized linear weight. Endpoint identity is exact; intermediate TRS values are deterministic; incompatible bone sets or attachment visibility fail explicitly.

GitHub Actions validation run 45 passed for the two-pose crossfade/blending discriminator.

## Current execution

The single current execution lock is the smallest public browser sandbox/demo proving the completed Phase 1 runtime path visually while keeping demo UI/state outside the core runtime.

## Licensing

- Dead Jim software: MIT.
- SkelForm editor: GPL-3.0 external authoring tool / source-format target.
- skelform-js: MIT reference/runtime.
- Phaser: MIT renderer target.

See `LICENSE` and `docs/THIRD_PARTY.md`.

## Public-project rule

Repository documentation, fixtures, examples, source, logs, and screenshots must remain self-contained and free of private workflow, personal storage, secrets, or unrelated consumer-project information.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. Load only the relevant repository document, ADR, test, or source file required by the single current execution lock.
