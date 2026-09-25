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
engine-independent clip playback / looping
        ↓
normalized attachment/style selection
        ↓
engine-independent pose evaluation
        ↓
Phaser 4.2.1 renderer adapter
```

Attachment slots are renderer-neutral mutually exclusive choices. A slot has a deterministic default; runtime selection changes only `visibleAttachments`, while playback time and bone transforms remain unchanged. Ambiguous or invalid slot definitions and selections fail explicitly.

GitHub Actions validation run 38 passed for the attachment/style-swapping discriminator.

## Current execution

The single current execution lock is the smallest deterministic two-clip crossfade/blending path. The goal is a renderer-neutral blend between exactly two compatible poses, with no state machine or layered-animation framework.

## Public-project rule

Repository documentation, fixtures, examples, source, logs, and screenshots must remain self-contained and free of private workflow, personal-storage, secrets, or unrelated consumer-project information.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. Load only the relevant repository document, ADR, test, or source file required by the single current execution lock.
