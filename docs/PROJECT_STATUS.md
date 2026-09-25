# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

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
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed artifact: 23 files;
- clean consumer runtime import: PASS;
- clean TypeScript consumer check: PASS;
- npm publication: confirmed live;
- GitHub pre-release: confirmed published and marked pre-release.

The first manual release path also exposed and resolved a Windows `spawnSync npm.cmd EINVAL` portability defect before publication. Permanent Windows/Node 24 package validation is now part of CI.

## Current execution

The single current lock is deciding the smallest safe release automation for future pre-releases now that the manual path is proven. Explicit maintainer approval remains mandatory for release boundaries.

## Release documents

- `docs/RELEASE_POLICY.md`
- `CHANGELOG.md`
- `docs/RELEASE_CANDIDATE_0.1.0-alpha.1.md`

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The first public alpha is complete. The next lock is the release-automation decision; runtime/editor scope remains unchanged unless promoted from the backlog by evidence.
