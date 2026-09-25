# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 — complete

Phase 1 is closed as a proven runtime discriminator:

```text
SkelForm v0.7.2 armature.json shape
        ↓
Dead Jim SkelForm source adapter
        ↓
normalized skeleton / animation data
        ↓
validated hierarchy
        ↓
clip playback / looping
        ↓
attachment/style selection
        ↓
pose evaluation
        ↓
two-pose crossfade/blending
        ↓
Phaser 4.2.1 renderer adapter
        ↓
public browser sandbox
```

Evidence:

- merged `main` validation run 55: PASS;
- Phase 1 demo branch validation runs 51 and 53: PASS;
- maintainer browser validation: **4/4 PASS** for continuous animation, live blend control, attachment swap, and swap-back.

The public sandbox under `examples/phase1/` uses the real runtime APIs rather than duplicating runtime behavior.

## Milestone review finding

The next boundary is **release readiness**, not additional animation features.

The repository currently proves runtime behavior but does not yet define a publishable library artifact:

- `package.json` remains `private: true` at version `0.0.0`;
- TypeScript validation uses `noEmit`;
- there is no emitted library build;
- there are no package `exports`, declaration entry points, or intentional published-file boundary;
- there is no clean packed-artifact consumer import smoke test;
- pre-release versioning/release-note policy has not yet been established.

Those gaps should be addressed before package publishing, tagging, or a public release.

## Current execution

The single current execution lock is to establish and validate the **library distribution/package boundary without publishing it**.

The lock should prove emitted JavaScript/declarations, explicit exports/files, and a clean consumer import from the packed artifact while keeping actual npm publishing, Git tags, and GitHub releases behind a later explicit maintainer decision.

## Current reference stack

- SkelForm v0.7.2 as the first source-format compatibility target;
- TypeScript normalized engine-independent runtime;
- Phaser 4.2.1 as the first renderer target;
- Vite-powered public browser sandbox for Phase 1 validation.

## Licensing

- Dead Jim software: MIT.
- SkelForm editor: GPL-3.0 external authoring tool / source-format target.
- skelform-js: MIT reference/runtime.
- Phaser: MIT renderer target.

See `LICENSE` and `docs/THIRD_PARTY.md`.

## Public-project rule

Repository documentation, fixtures, examples, source, logs, and screenshots must remain self-contained and free of private workflow, personal storage, secrets, or unrelated consumer-project information.

## Fresh-chat handoff

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. Phase 1 is complete. The next work is release-readiness packaging; do not publish, tag, release, or add new runtime features unless the active lock explicitly changes.
