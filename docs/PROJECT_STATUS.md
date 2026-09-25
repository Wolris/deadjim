# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 — complete

The runtime path is proven end to end. Maintainer browser validation: **4/4 PASS**.

## Package boundary — proven

Dead Jim emits ESM JavaScript and TypeScript declarations, defines explicit package exports/files, retains Phaser as a peer dependency, and passes a clean packed-artifact consumer runtime/type smoke test.

## Candidate 0.1.0-alpha.1 — checklist complete, not released

Candidate identity:

- npm package: `dead-jim`;
- version: `0.1.0-alpha.1`;
- proposed Git tag: `v0.1.0-alpha.1`;
- proposed GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- npm dist-tag: `alpha`.

Evidence:

- merged candidate `main` run 67: PASS;
- candidate checklist run 69: PASS;
- fresh npm registry name check: PASS — no `dead-jim` package record on September 25, 2026;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 intentional files;
- clean consumer runtime/type checks: PASS;
- candidate metadata check: PASS.

Publish posture is unchanged: `private: true`. No npm publication, Git tag, or GitHub release was performed.

## Current execution

The repository is waiting for one explicit maintainer decision: whether to authorize the first public pre-release.

Approval does not bypass the repository merge boundary. If approved, release-posture changes are prepared on a focused branch, validated, and presented for explicit merge approval before tagging/releasing/publishing.

## Release documents

- `docs/RELEASE_POLICY.md` — versioning and release-note policy.
- `CHANGELOG.md` — canonical public release notes.
- `docs/RELEASE_CANDIDATE_0.1.0-alpha.1.md` — exact candidate checklist and proposed release actions.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The current lock is a maintainer release decision. Do not change `private: true`, tag, release, or publish without explicit approval.
