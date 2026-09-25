# ACTIVE TODO

## Current phase

**Post-Phase 1 — First Public Pre-release**

Maintainer authorization for `dead-jim@0.1.0-alpha.1` was granted on September 25, 2026.

## CURRENT EXECUTION LOCK

**LOCKED — Fix Windows package validation before publishing `0.1.0-alpha.1`.**

Release-preparation PR #13 was merged at `90e8b7e` and merged-`main` validation run 77 passed. A local Windows/Node 24 release check then exposed a real portability defect: `scripts/validate-package.mjs` attempted to spawn `npm.cmd` directly and failed with `spawnSync npm.cmd EINVAL`.

Acceptance criteria:

- keep package identity/version exactly `dead-jim@0.1.0-alpha.1`;
- make package-check npm subprocess invocation work on Windows/Node 24 without weakening Linux behavior;
- add permanent Windows/Node 24 package-check CI coverage;
- preserve the 23-file package boundary and clean consumer runtime/type imports;
- leave runtime behavior unchanged;
- open a focused PR and stop for explicit merge approval;
- after merge and green `main`, move tag `v0.1.0-alpha.1` from pre-fix commit `90e8b7e` to the final fixed release commit;
- re-run the npm package-name check immediately before publication;
- publish only after the corrected tag and exact release commit are verified.

## NEXT

After the Windows validation fix is merged and `main` is green:

1. delete/recreate `v0.1.0-alpha.1` on the final fixed release commit;
2. verify `npm whoami` and `npm run package:name-check`;
3. run `npm publish --tag alpha`;
4. create GitHub pre-release **Dead Jim v0.1.0-alpha.1** from the corrected tag.

No npm publication has occurred yet.

## Recently closed

### Publish-ready release preparation — DONE

Evidence:

- PR #13 merged at `90e8b7e`;
- release validation run 74: PASS;
- deterministic PR validation runs 75 and 76: PASS;
- merged `main` validation run 77: PASS;
- fresh npm identity check run 79: PASS.

### First public pre-release authorization — APPROVED

Maintainer authorization received September 25, 2026 for `dead-jim@0.1.0-alpha.1`.

## Explicitly deferred

- release automation until after the first manual pre-release path is proven;
- new runtime features while the first public pre-release is active;
- custom visual rigging/animation editor;
- weighted mesh deformation;
- IK and physics;
- advanced constraints/interpolation;
- additional adapters without evidence;
- multi-layer blending, blend trees, additive animation, masks, state machines, speed curves, and custom scheduling.
