# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 — complete

The runtime path is proven end to end. Maintainer browser validation: **4/4 PASS**.

## Package boundary — proven

Dead Jim emits ESM JavaScript and TypeScript declarations, defines explicit package exports/files, retains Phaser as a peer dependency, and passes a clean packed-artifact consumer runtime/type smoke test.

## First public pre-release — authorized, not yet released

Maintainer authorization for `dead-jim@0.1.0-alpha.1` was granted on September 25, 2026.

Release identity:

- npm package: `dead-jim`;
- version: `0.1.0-alpha.1`;
- Git tag: `v0.1.0-alpha.1`;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- npm dist-tag: `alpha`.

The release-preparation branch is publish-ready. Authorized release validation **run 74: PASS** reconfirmed the packed artifact, clean consumer checks, publish-ready metadata, and fresh npm package-name availability. Routine deterministic PR validation **run 75: PASS** after the live registry check was removed from `npm run validate`. PR **#13** is now waiting for explicit merge approval before tag/release/publication actions.

## Current execution

The single current execution lock is the publish-ready release-preparation branch. It removes `private: true`, dates the changelog, revalidates the exact packed package plus npm name, restores deterministic routine CI, and opens the final release-preparation PR.

## Release documents

- `docs/RELEASE_POLICY.md` — versioning and release execution policy.
- `CHANGELOG.md` — canonical public release notes.
- `docs/RELEASE_CANDIDATE_0.1.0-alpha.1.md` — candidate checklist and release identity.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The release is authorized but not yet executed. Do not tag, create the GitHub pre-release, or publish to npm until the release-preparation PR receives explicit merge approval and merged-`main` validation passes.
