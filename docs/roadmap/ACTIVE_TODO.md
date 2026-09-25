# ACTIVE TODO

## Current phase

**Post-Phase 1 — Public Alpha**

Dead Jim `0.1.0-alpha.1` was published on September 25, 2026.

## CURRENT EXECUTION LOCK

**LOCKED — Decide the smallest safe release automation for the next pre-release.**

The first manual public-release path is now proven end to end. Before adding automation, decide what should remain deliberately manual and what can be made repeatable without weakening the repository's explicit maintainer-approval boundary.

Acceptance criteria:

- preserve explicit maintainer approval before any release reaches `main`;
- preserve explicit maintainer approval before a version is tagged or published;
- evaluate whether GitHub-hosted release automation is worth adding now that the manual path is proven;
- prefer short-lived/trusted authentication over long-lived publish credentials if automation is adopted;
- keep npm package publication and GitHub release creation tied to the same approved version/tag;
- document the chosen release path in the canonical release policy;
- if automation is approved, implement it in a separate focused branch/PR with dry-run or non-publishing validation before any real release;
- if automation is not justified yet, record that decision and return to runtime/source-adapter work.

## NEXT

After the release-automation decision, promote the next evidence-backed runtime, source-adapter, renderer, or tooling item from `BACKLOG.md`.

## Recently closed

### First public pre-release — DONE

`dead-jim@0.1.0-alpha.1` is publicly released.

Evidence:

- final release commit: `35a86f21339e4b5267d052859d7935e3bd888c2d`;
- merged-`main` validation run 85: PASS;
- Linux full validation: PASS;
- Windows/Node 24 package validation: PASS;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 files;
- npm publication: live under dist-tag `alpha`;
- Git tag: `v0.1.0-alpha.1` at the final release commit;
- GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- clean consumer runtime/type checks: PASS.

### Windows package-validation release blocker — DONE

The Windows `spawnSync npm.cmd EINVAL` failure was fixed before publication and permanent Windows/Node 24 package validation was added to CI.

### Publish-ready release preparation — DONE

Release-preparation PR #13 and Windows-fix PR #14 were merged and validated before publication.

## Explicitly deferred

- new runtime features while the release-automation decision is active;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints/interpolation;
- additional adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
