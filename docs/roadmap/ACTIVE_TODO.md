# ACTIVE TODO

## Current phase

**Post-Phase 1 — Release Readiness**

Phase 1 is complete. The library distribution boundary is now proven without publishing: Dead Jim emits ESM JavaScript and TypeScript declarations, packs only intentional files, and installs/imports successfully in a clean consumer smoke test.

## CURRENT EXECUTION LOCK

**LOCKED — Define pre-release package metadata, versioning, and release-note policy without publishing.**

Acceptance criteria:

- begin from current `main` after the package-distribution branch is merged;
- verify the intended npm package identity/name before changing publish posture;
- choose an intentional initial pre-release semantic version and document the versioning policy;
- define the smallest changelog/release-notes convention for the first public pre-release;
- review package metadata for the public artifact: name, description, license, repository, keywords, peer dependency, exports, types, and files;
- keep the proven ESM/declaration build and clean packed-consumer smoke validation green;
- keep `private: true` unless a later explicit release lock and maintainer approval authorize changing publish posture;
- do not run `npm publish`, create Git tags, create GitHub releases, or add release automation in this lock;
- do not add new runtime features, editor work, additional adapters, or consumer-specific integration.

## NEXT

After metadata/versioning passes, prepare the smallest first pre-release candidate/release checklist and stop for an explicit maintainer decision before changing `private`, tagging, releasing, or publishing.

## Recently closed

### Library distribution/package boundary — DONE

Closure basis: GitHub Actions validation run 59 completed successfully on `feature/package-distribution-boundary` for commit `d68d556`.

Durable result:

- `tsconfig.build.json` emits ESM JavaScript plus TypeScript declarations from the public `src/index.ts` surface;
- package `main`, `types`, and explicit `exports` resolve to `dist/lib`;
- package `files` limits the artifact to the built library plus required README/LICENSE/package metadata;
- Phaser remains a peer dependency and is not bundled into the core library artifact;
- `npm run package:check` cleans/builds, runs `npm pack` without publishing, validates the packed-file boundary, installs the tarball into a clean temporary consumer, imports representative public APIs at runtime, and typechecks representative public types;
- CI packed exactly 23 intentional files and reported `Dead Jim packed runtime import: PASS` and `Dead Jim package boundary: PASS`;
- `private: true` and version `0.0.0` remain intentionally unchanged pending the metadata/versioning lock;
- no npm publish, Git tag, GitHub release, or release automation was performed.

### Phase 1 milestone review — DONE

Findings:

- Phase 1 capabilities are recorded as proven rather than aspirational;
- completed Phase 1 work is removed from the future backlog;
- release readiness, not additional animation features, is the current project boundary.

### Phase 1 runtime discriminator — DONE

Proven capabilities:

- normalized skeleton hierarchy and world transforms;
- linear transform keyframe interpolation;
- SkelForm v0.7.2 source import boundary;
- deterministic playback/looping;
- renderer-neutral attachment/style swapping;
- deterministic two-pose blending;
- Phaser 4.2.1 renderer adapter;
- public browser proof with maintainer 4/4 PASS.

## Explicitly deferred

- npm publishing, Git tags, GitHub releases, and release automation until later explicit approval;
- changing `private: true` until an explicit release lock authorizes it;
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
