# Engineering Backlog

Approved future work that is not active.

Completed Phase 1, package-boundary work, the first public pre-release, release-automation decision, and the semantic-SVG discriminator are intentionally omitted here. See `docs/roadmap/ACTIVE_TODO.md` and `docs/PROJECT_STATUS.md` for milestone evidence.

The current priority is proving one sustainable SVG-native authoring workflow against real asset requirements. Do not promote speculative runtime capability work ahead of that evidence.

## Release process

- Revisit automated publication after a second manual pre-release or when release cadence makes the manual path materially repetitive.
- If automated publication is adopted, prefer npm Trusted Publishing with GitHub Actions OIDC over long-lived npm write tokens while preserving explicit maintainer approval.

## Core runtime

- Animation events if a real consumer requires them.
- Tint/visibility animation only when a concrete authored example requires it as an animation channel; static semantic appearance resolution is a separate concern.
- Consider richer interpolation only when source-format evidence requires it.
- Consider more than two blended layers only when a real consumer proves the need.

## Source adapters

- Preserve the released SkelForm adapter as a supported compatibility path.
- Add an SVG-native authoring-source adapter only after the active external-tool discriminator identifies the concrete project/file format to support.
- Define a stable normalized serialized fixture format only if real cross-adapter or compatibility testing later benefits from it.

## Renderer adapters

- Evaluate a second renderer only after a real consumer requires one.

## Advanced animation

- Weighted mesh deformation.
- IK/constraints in the Dead Jim runtime.
- Physics/spring behavior.
- Advanced curve interpolation.
- Additive animation, masks, blend trees, and state machines.

These remain deferred until real animation evidence proves they are needed.

## Promotion and adoption

### Public promotional website — after representative SVG-native asset proof

Promote this only after the selected open SVG-native authoring workflow -> Dead Jim -> Phaser 4 path has been proven with a short, representative asset set and any blocking compatibility/runtime gaps are closed.

The site should:

- explain Dead Jim's purpose and the free/open authoring/runtime path clearly;
- showcase a small set of polished, real Dead Jim animation examples rather than synthetic capability claims;
- provide installation/getting-started links for `dead-jim@alpha` and the public repository;
- give prominent credit and high praise to **SkelForm / Retropaint** for enabling the original runtime proof and to **Phaser** as the first renderer target;
- link directly to SkelForm and Phaser;
- credit the selected SVG-native authoring project prominently if one is adopted;
- include a Dead Jim support/donation path;
- verify whether Retropaint and the selected authoring project have public donation/support links at implementation time and, if appropriate, link to them prominently;
- avoid implying endorsement, partnership, or affiliation before any such relationship actually exists;
- after the finished site is public, contact relevant upstream maintainers with the site/demo and ask whether they are interested in cross-promotion or linking to Dead Jim;
- treat any resulting collaboration, quote, logo permission, or endorsement language as explicit follow-up work rather than assuming permission.

## Tooling

- CLI validator/inspector for source files if repeated integration work makes it useful.
- Debug bone/attachment overlay if real consumer debugging requires it.
- Hosted/demo infrastructure may be implemented as part of the promotional website milestone when that milestone is promoted.

## Editor

A custom Dead Jim authoring editor remains deferred while viable external authoring tools are being discriminated.

Promote editor development only if bounded real-tool tests show that available no-cost workflows cannot preserve the required combination of semantic SVG assets, hierarchical transforms, practical pivots, reusable animation clips, and inspectable export/project data.
