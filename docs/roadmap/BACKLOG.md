# Engineering Backlog

Approved future work that is not active.

Completed Phase 1, package-boundary work, the first public pre-release, and the release-automation decision are intentionally omitted here. See `docs/roadmap/ACTIVE_TODO.md` and `docs/PROJECT_STATUS.md` for milestone evidence.

The current priority is real SkelForm workflow adoption. Do not promote speculative capability work ahead of concrete consumer evidence.

## Release process

- Revisit automated publication after a second manual pre-release or when release cadence makes the manual path materially repetitive.
- If automated publication is adopted, prefer npm Trusted Publishing with GitHub Actions OIDC over long-lived npm write tokens while preserving explicit maintainer approval.

## Core runtime

- Animation events if a real consumer requires them.
- Tint/visibility animation only when a concrete authored example requires it.
- Consider richer interpolation only when source-format evidence requires it.
- Consider more than two blended layers only when a real consumer proves the need.

## Source adapters

- **No alternative source-adapter work is planned.**
- Revisit another authoring format only if SkelForm proves inadequate for a concrete required workflow.
- Define a stable normalized serialized fixture format only if real cross-adapter or compatibility testing later benefits from it.

## Renderer adapters

- Evaluate a second renderer only after a real consumer requires one.

## Advanced animation

- Weighted mesh deformation.
- IK/constraints.
- Physics/spring behavior.
- Advanced curve interpolation.
- Additive animation, masks, blend trees, and state machines.

These remain deferred until real animation evidence proves they are needed.

## Tooling

- CLI validator/inspector for source files if repeated integration work makes it useful.
- Debug bone/attachment overlay if real consumer debugging requires it.
- Optional hosted/demo deployment if it materially improves public adoption or validation.

## Editor

A custom Dead Jim authoring editor is explicitly deferred. SkelForm is the selected free/open authoring workflow. Revisit editor development only if repeated real use demonstrates that SkelForm cannot satisfy the required workflow.
