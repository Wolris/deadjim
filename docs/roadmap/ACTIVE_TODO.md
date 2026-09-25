# ACTIVE TODO

## Current phase

**Post-Phase 1 — Release Readiness**

Phase 1 and the package distribution boundary are proven. The intended npm identity and first pre-release metadata are now defined without changing publish posture.

## CURRENT EXECUTION LOCK

**LOCKED — Prepare the first pre-release candidate checklist and stop for explicit release authorization.**

Acceptance criteria:

- begin from current `main` after the pre-release metadata/versioning branch is merged;
- re-run and record the full repository/package validation against the candidate version;
- re-run `npm run package:name-check` immediately before any proposed first publication;
- inspect the packed tarball contents and confirm package name/version/exports/types/peer dependency/files match the reviewed metadata;
- prepare the exact proposed release identity: npm package `dead-jim`, version `0.1.0-alpha.1`, Git tag `v0.1.0-alpha.1`, and matching GitHub pre-release title/notes;
- verify `CHANGELOG.md` and `docs/RELEASE_POLICY.md` match the candidate;
- identify the exact actions that would change publish posture: remove/change `private: true`, commit that change, create the Git tag, create the GitHub pre-release, and run `npm publish`;
- stop for explicit maintainer authorization before performing any publish-posture change, tag, GitHub release, or npm publication;
- do not add new runtime features, editor work, additional adapters, or consumer-specific integration.

## NEXT

**MAINTAINER DECISION — First public pre-release authorization.**

After the checklist is complete, the maintainer must explicitly approve or decline changing publish posture and releasing `0.1.0-alpha.1`. No tag, GitHub release, or npm publication may occur without that approval.

## Recently closed

### Pre-release package metadata, versioning, and release-note policy — DONE

Closure basis:

- npm identity validation run 64: PASS — `dead-jim` had no registry package record on September 25, 2026;
- final branch validation must remain green before merge.

Durable result:

- intended package identity is `dead-jim`;
- first intentional candidate version is `0.1.0-alpha.1`;
- `private: true` remains the publish-safety gate;
- `docs/RELEASE_POLICY.md` defines the pre-release progression and changelog/release-note rules;
- `CHANGELOG.md` contains the unreleased `0.1.0-alpha.1` public capability/limitation summary;
- package metadata remains MIT-licensed, repository-linked, ESM-only, declaration-enabled, Phaser-peer-based, and constrained by explicit exports/files;
- `npm run package:name-check` remains available for release-time revalidation but is not part of routine deterministic CI;
- no npm publication, Git tag, GitHub release, or release automation was performed.

### Library distribution/package boundary — DONE

Durable result:

- emitted ESM JavaScript and TypeScript declarations;
- explicit exports/types/files package boundary;
- clean `npm pack` consumer runtime/type smoke validation;
- Phaser remains a peer dependency.

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

- npm publishing, Git tags, and GitHub releases until explicit maintainer authorization;
- changing `private: true` before that authorization;
- release automation until after the first manual pre-release path is proven;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints and interpolation;
- multiple renderer/source adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, and state machines;
- animation events until a real consumer requires them;
- speed curves and custom scheduling;
- consumer-specific integration;
- new runtime features while release readiness is active.
