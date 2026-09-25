# ACTIVE TODO

## Current phase

**Post-Phase 1 — First Public Pre-release**

Maintainer authorization for `dead-jim@0.1.0-alpha.1` was granted on September 25, 2026.

## CURRENT EXECUTION LOCK

**LOCKED — Prepare the publish-ready `0.1.0-alpha.1` branch and stop at the merge boundary.**

Acceptance criteria:

- begin from merged `main` after the candidate checklist;
- remove the `private: true` publish-safety gate from `package.json`;
- date the `0.1.0-alpha.1` changelog entry September 25, 2026;
- keep package identity/version exactly `dead-jim@0.1.0-alpha.1`;
- preserve ESM exports, declarations, package file boundary, MIT license, and Phaser peer dependency;
- run full deterministic repository/package validation;
- run `npm run release:check` with a fresh npm registry identity check on the publish-ready candidate — **run 74: PASS**;
- prove packed artifact identity and clean consumer runtime/type import again;
- restore routine CI to deterministic validation after the one-time registry-backed release check — **done; final deterministic PR validation pending**;
- open a focused release-preparation PR;
- stop for explicit merge approval before tagging, creating a GitHub release, or running `npm publish`.

## NEXT

After explicit merge approval and successful merged-`main` validation:

1. re-run `npm run package:name-check` immediately before first publication;
2. create Git tag `v0.1.0-alpha.1`;
3. publish `dead-jim@0.1.0-alpha.1` to npm with dist-tag `alpha` if authenticated npm access is available;
4. create GitHub pre-release **Dead Jim v0.1.0-alpha.1** using the matching changelog entry.

If npm publishing credentials are unavailable, stop at that concrete blocker rather than bypassing it.

## Recently closed

### First public pre-release authorization — APPROVED

Maintainer authorization received September 25, 2026 for `dead-jim@0.1.0-alpha.1`.

Authorization permits the publish-ready preparation branch and, after a separate explicit merge approval, the planned tag/release/publication sequence.

### First pre-release candidate checklist — DONE

Evidence:

- candidate `main` run 67: PASS;
- checklist run 69: PASS;
- merged checklist `main` run 72: PASS;
- npm identity check: PASS;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 intentional files;
- clean consumer runtime/type checks: PASS.

## Explicitly deferred

- release automation until after the first manual pre-release path is proven;
- new runtime features while the first public pre-release is active;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints/interpolation;
- additional adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
