# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing open 2D skeletal-animation authoring data into Phaser 4 through explicit source and renderer adapters.

Repository: `Wolris/deadjim`

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

Release evidence:

- merged-`main` validation run 85: PASS;
- post-release reconciliation merged at `a65da361cb95e7d68f7858bcdeb52a5a8ceb5629`;
- post-merge validation run 87: PASS;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed artifact: 23 files;
- clean consumer runtime import: PASS;
- clean TypeScript consumer check: PASS;
- npm publication: confirmed live;
- GitHub pre-release: confirmed published and marked pre-release.

## Release automation decision

Publication remains manual for now.

The first manual release is proven, but one release does not yet justify another high-impact publication path. Existing CI already automates deterministic validation and package-boundary checks. Revisit publication automation after a second manual pre-release or when cadence makes the manual sequence materially repetitive.

If automation is later adopted, the intended security direction is npm Trusted Publishing with GitHub Actions OIDC rather than a stored long-lived npm write token. Explicit maintainer approval remains mandatory.

## Current execution

The single current lock is evaluating DragonBones/LoongBones as the second source-format discriminator. The evaluation must pin a concrete format/fixture, map only the Phase 1-compatible subset into the normalized runtime, verify license/coordinate boundaries, and produce a go/no-go recommendation before implementation.

## Release documents

- `docs/RELEASE_POLICY.md`
- `CHANGELOG.md`
- `docs/RELEASE_CANDIDATE_0.1.0-alpha.1.md`

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The first public alpha is complete, publication automation is intentionally deferred, and the active lock is the DragonBones/LoongBones source-format discriminator.
