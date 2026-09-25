# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 — complete

The runtime path is proven end to end. Maintainer browser validation: **4/4 PASS**.

## Package boundary — proven

Dead Jim emits ESM JavaScript and TypeScript declarations, defines explicit package exports/files, retains Phaser as a peer dependency, and passes clean packed-artifact consumer runtime/type smoke tests.

## First public pre-release — authorized, release blocker fix in progress

Release identity:

- npm package: `dead-jim`;
- version: `0.1.0-alpha.1`;
- Git tag: `v0.1.0-alpha.1`;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- npm dist-tag: `alpha`.

Release-preparation PR #13 merged at `90e8b7e`, with merged-`main` validation run 77 passing. Final registry validation run 79 also passed and confirmed `dead-jim` remained unclaimed.

A local Windows/Node 24 package validation then exposed a release-blocking portability bug: direct `spawnSync("npm.cmd", ...)` failed with `EINVAL`. No npm publication occurred.

The fix branch replaces direct `npm.cmd` spawning with npm's JavaScript entrypoint through Node when available and adds permanent Windows/Node 24 package-check CI. GitHub Actions run 81 proves Linux validation and the Windows package check pass, including the 23-file artifact and clean consumer runtime/type checks.

The existing tag currently points at the pre-fix release commit and must be moved to the final fixed release commit after this fix is merged.

## Current execution

The single current lock is the Windows package-validation release blocker fix. Do not publish to npm or create the GitHub pre-release until that fix is merged, `main` is green, and the tag is corrected.

## Release documents

- `docs/RELEASE_POLICY.md`
- `CHANGELOG.md`
- `docs/RELEASE_CANDIDATE_0.1.0-alpha.1.md`

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The release remains authorized but unpublished. Finish the Windows package-validation fix, retag the final green release commit, then continue the manual alpha publication path.
