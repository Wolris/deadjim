# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing **SkelForm-authored 2D skeletal animation into Phaser 4** through a small, explicit runtime and adapter boundary.

Repository: `Wolris/deadjim`

## Product direction

The selected workflow is:

```text
SkelForm authoring
      ↓
Dead Jim source adapter
      ↓
normalized skeletal runtime
      ↓
Phaser 4 renderer adapter
```

The source-adapter abstraction protects the runtime from format lock-in; it does **not** imply that Dead Jim should proactively support multiple authoring tools. Another source format is considered only if real SkelForm usage exposes a concrete blocker.

## Phase 1 — complete

The runtime path is proven end to end. Maintainer browser validation: **4/4 PASS**.

## Package boundary — proven

Dead Jim emits ESM JavaScript and TypeScript declarations, defines explicit package exports/files, retains Phaser as a peer dependency, and passes clean packed-artifact consumer runtime/type smoke tests.

## First public pre-release — LIVE

`dead-jim@0.1.0-alpha.1` was publicly released on September 25, 2026.

Release identity:

- npm package: `dead-jim@0.1.0-alpha.1`;
- npm dist-tag: `alpha`;
- Git tag: `v0.1.0-alpha.1`;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- final release commit: `35a86f21339e4b5267d052859d7935e3bd888c2d`.

Release evidence includes Linux full validation, Windows/Node 24 package validation, a 23-file packed artifact, clean runtime/type consumer checks, live npm publication, and the published GitHub pre-release.

## Release automation decision

Publication remains manual for now. Revisit only when a second manual pre-release or release cadence makes automation materially useful. If later adopted, prefer npm Trusted Publishing with GitHub Actions OIDC and preserve explicit maintainer approval.

## Current execution

The real SkelForm atlas-packaging blocker is closed and validated on merged `main`.

The active boundary is now a **genuine SkelForm v0.7.2 editor/export proof**. The proof uses a deliberately small generic humanoid-style rig (torso, head, arm), Default + Alternate styles, and Idle + Action linear-transform animations. The editor-produced `.skf` file is the required evidence; once available, Dead Jim will unpack its runtime assets and prove the public import/atlas/Phaser path end to end.

No additional runtime capability is authorized unless that real editor-produced proof exposes a reproducible gap.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The first public alpha is live. SkelForm is the selected authoring path. The next Dead Jim work comes from real SkelForm consumer evidence, not speculative alternate-format expansion.
