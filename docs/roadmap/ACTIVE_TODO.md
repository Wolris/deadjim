# ACTIVE TODO

## Current phase

**Post-Phase 1 — Release Readiness**

Phase 1, package distribution, pre-release metadata, and the first candidate checklist are complete.

## CURRENT EXECUTION LOCK

**AWAITING MAINTAINER AUTHORIZATION — First public pre-release `dead-jim@0.1.0-alpha.1`.**

The candidate is fully checked and remains non-published.

Maintainer decision required:

- **Approve release** — authorize preparation of the release-posture change for `0.1.0-alpha.1`, followed by a separate merge boundary before tagging/releasing/publishing.
- **Decline / defer release** — keep `private: true`, create no tag/release/publication, and leave the candidate parked until later direction.

No release action may occur until the maintainer explicitly approves the public pre-release.

## NEXT

If release is approved, promote exactly one release-execution lock for the publish-posture preparation branch. If release is deferred, choose no successor release work until new maintainer direction.

## Recently closed

### First pre-release candidate checklist — DONE

Closure basis:

- merged candidate `main` GitHub Actions run 67: PASS;
- candidate checklist GitHub Actions run 69: PASS;
- fresh npm identity lookup in run 69: PASS — `dead-jim` had no registry package record on September 25, 2026;
- packed artifact: `dead-jim@0.1.0-alpha.1`, 23 intentional files;
- clean consumer runtime import: PASS;
- clean consumer TypeScript import: PASS;
- candidate metadata validation: PASS;
- `private: true` remains unchanged;
- no npm publication, Git tag, or GitHub release was performed.

Exact candidate identity:

- npm package: `dead-jim`;
- version: `0.1.0-alpha.1`;
- proposed Git tag: `v0.1.0-alpha.1`;
- proposed GitHub pre-release: **Dead Jim v0.1.0-alpha.1**;
- proposed npm dist-tag: `alpha`.

See `docs/RELEASE_CANDIDATE_0.1.0-alpha.1.md`.

### Pre-release metadata/versioning — DONE

Durable result:

- package identity and candidate version are defined;
- release/versioning policy and changelog are canonical;
- the package remains protected by `private: true`.

### Library distribution/package boundary — DONE

Durable result:

- emitted ESM JavaScript and TypeScript declarations;
- explicit exports/types/files package boundary;
- clean packed-artifact consumer runtime/type validation.

### Phase 1 runtime discriminator — DONE

Proven capabilities:

- SkelForm v0.7.2 import boundary;
- normalized hierarchy and transform animation;
- playback/looping;
- attachment/style selection;
- two-pose blending;
- Phaser 4.2.1 renderer;
- public browser demo with maintainer 4/4 PASS.

## Explicitly deferred

- all npm publishing, Git tagging, and GitHub release actions until explicit maintainer release authorization;
- changing `private: true` before release authorization;
- release automation until after the first manual pre-release path is proven;
- new runtime features while the release decision is pending;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints/interpolation;
- additional adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
