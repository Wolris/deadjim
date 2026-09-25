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

## Current execution

The first implementation branch establishes the normalized runtime model, hierarchy validation, and the isolated SkelForm source-adapter boundary before Phaser-specific rendering is added.

## Public-project rule

Repository documentation, fixtures, examples, source, logs, and screenshots must remain self-contained and free of private workflow, personal-storage, secrets, or unrelated consumer-project information.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. Load only the relevant repository document, ADR, test, or source file required by the current lock.
