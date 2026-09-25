# Project Status

## Project

Dead Jim — an MIT-licensed open-source TypeScript bridge/runtime for bringing SkelForm-authored 2D skeletal animation into Phaser 4.

Repository: `Wolris/deadjim`

## Phase 1 evidence

The Phase 1 runtime discriminator is complete and proven through both automated validation and a public browser demo:

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

The browser sandbox lives in `examples/phase1/` and uses the real public runtime APIs rather than reimplementing animation behavior in demo code.

Validation evidence:

- GitHub Actions run 51: PASS for typecheck, unit/integration tests, and production demo build;
- maintainer browser validation: **4/4 PASS** for continuous animation, blend control, attachment swap, and swap-back.

## Current execution

The single current execution lock is the Phase 1 milestone review. It reconciles the Design Bible, backlog, project status, and release-readiness gaps before any new phase, package publishing, tagging, or release work begins.

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

Read `AGENTS.md`, then fresh `docs/roadmap/ACTIVE_TODO.md`. The next work is the Phase 1 milestone review; do not start new runtime features before that review leaves one explicit successor lock.
