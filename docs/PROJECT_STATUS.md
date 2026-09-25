# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 — complete

The runtime path is proven end to end through automated tests and the public browser sandbox:

```text
SkelForm v0.7.2
        ↓
source adapter
        ↓
normalized runtime
        ↓
playback / attachment selection / pose evaluation / two-pose blend
        ↓
Phaser 4.2.1 renderer adapter
        ↓
public browser sandbox
```

Maintainer browser validation: **4/4 PASS**.

## Package distribution boundary — proven

Dead Jim now has a validated, non-published package artifact:

- ESM JavaScript emitted to `dist/lib`;
- TypeScript declarations emitted alongside JavaScript;
- explicit root package exports and type entry point;
- intentional package `files` boundary;
- Phaser retained as a peer dependency;
- deterministic `npm pack` validation;
- clean temporary consumer install, runtime import, and TypeScript import smoke tests.

GitHub Actions validation run 59 passed and packed **23 intentional files**. The consumer smoke reported runtime import PASS and package boundary PASS.

The package remains deliberately non-publishable: `private: true`, version `0.0.0`, no tags, no releases, and no npm publication.

## Current execution

The single current execution lock is pre-release metadata/versioning: verify the intended package identity, choose an initial pre-release semantic version, define a minimal release-notes convention, and revalidate the package artifact without publishing.

## Current reference stack

- SkelForm v0.7.2 as the first source-format compatibility target;
- TypeScript normalized engine-independent runtime;
- Phaser 4.2.1 as the first renderer target;
- Vite-powered public Phase 1 browser sandbox;
- emitted ESM + declaration package artifact validated by a clean consumer smoke test.

## Licensing

- Dead Jim software: MIT.
- SkelForm editor: GPL-3.0 external authoring tool / source-format target.
- skelform-js: MIT reference/runtime.
- Phaser: MIT peer renderer target.

See `LICENSE` and `docs/THIRD_PARTY.md`.

## Public-project rule

Repository documentation, fixtures, examples, source, logs, and screenshots must remain self-contained and free of private workflow, personal storage, secrets, or unrelated consumer-project information.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The package boundary is proven; the next work is metadata/versioning only. Do not publish, tag, release, remove `private: true`, or add new runtime features unless the active lock explicitly changes.
