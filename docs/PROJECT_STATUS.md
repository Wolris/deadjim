# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 — complete

The runtime path is proven end to end through automated tests and the public browser sandbox. Maintainer browser validation: **4/4 PASS**.

## Package boundary — proven

Dead Jim emits ESM JavaScript and TypeScript declarations, defines explicit package exports/files, retains Phaser as a peer dependency, and passes a clean packed-artifact consumer runtime/type smoke test.

## Pre-release identity — defined, not released

- Intended npm package: `dead-jim`.
- npm identity check on September 25, 2026: no registry package record.
- First candidate version: `0.1.0-alpha.1`.
- Package remains `private: true`.
- No npm publication, Git tag, or GitHub release exists from this work.
- Versioning and release-note policy: `docs/RELEASE_POLICY.md`.
- Candidate notes: `CHANGELOG.md`.

## Current execution

The single current execution lock is the first pre-release candidate checklist. It must verify the candidate one final time and then stop for an explicit maintainer decision before changing publish posture, tagging, releasing, or publishing.

## Current reference stack

- SkelForm v0.7.2 / armature version 0.7.1.
- TypeScript normalized engine-independent runtime.
- Phaser 4.2.1 renderer adapter.
- Vite-powered public Phase 1 browser sandbox.
- ESM + declaration package artifact.
- Candidate package identity/version: `dead-jim@0.1.0-alpha.1`.

## Licensing

- Dead Jim software: MIT.
- SkelForm editor: GPL-3.0 external authoring tool / source-format target.
- skelform-js: MIT reference/runtime.
- Phaser: MIT peer renderer target.

See `LICENSE` and `docs/THIRD_PARTY.md`.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The next work is the candidate release checklist only. Do not change `private: true`, create a tag/release, or publish unless the maintainer explicitly authorizes the release after the checklist.
