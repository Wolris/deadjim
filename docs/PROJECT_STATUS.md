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

## Licensing

- Dead Jim software: MIT.
- SkelForm editor: GPL-3.0 external authoring tool / source-format target.
- skelform-js: MIT reference/runtime.
- Phaser: MIT renderer target.

See `LICENSE` and `docs/THIRD_PARTY.md`.

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
engine-independent single-clip playback / looping
        ↓
engine-independent pose evaluation
        ↓
Phaser 4.2.1 renderer adapter
```

The playback boundary stores only an `AnimationClip` plus elapsed milliseconds. Non-looping clips clamp, looping clips wrap by duration, and zero-duration clips remain stable. The pinned SkelForm fixture is exercised through playback, pose evaluation, and Phaser rendering in deterministic tests.

ADR-0002 defines normalized 2D coordinates as +X right, +Y down, clockwise-positive radians. Source adapters own conversion into that space; renderer adapters consume it.

GitHub Actions validation run 32 passed for the single-clip playback/looping discriminator.

## Current execution

The single current execution lock is basic attachment/style swapping in the normalized runtime. The goal is a minimal renderer-neutral way to choose mutually exclusive attachment alternatives and prove the resulting visibility through the existing Phaser adapter.

## Public-project rule

Repository documentation, fixtures, examples, source, logs, and screenshots must remain self-contained and free of private workflow, personal-storage, secrets, or unrelated consumer-project information.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. Load only the relevant repository document, ADR, test, or source file required by the single current execution lock.
