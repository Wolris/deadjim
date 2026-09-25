# Release Policy

## Status

Dead Jim is pre-release software. The first intentional public package candidate is `0.1.0-alpha.1`.

Maintainer authorization for the first public pre-release was granted on **September 25, 2026**. That authorization permits preparation of the publish-ready branch. Repository rules still require a separate explicit merge approval before the release-preparation branch reaches `main`, and no Git tag, GitHub release, or npm publication occurs before that merge boundary.

## Package identity

Intended npm package name: `dead-jim`.

Evidence is re-checked at release time with:

```bash
npm run package:name-check
```

Registry state can change, so that check must pass immediately before the first publication attempt.

## Versioning

Dead Jim follows Semantic Versioning.

The initial pre-release line is:

- `0.1.0-alpha.N` — early public-package candidates; API changes are still expected.
- `0.1.0-beta.N` — the intended `0.1.0` public API is feature-complete; fixes and compatibility adjustments may still occur.
- `0.1.0-rc.N` — release-candidate builds with no planned API changes except release-blocking fixes.
- `0.1.0` — first non-prerelease package milestone.

While Dead Jim remains below `1.0.0`, intentional breaking public-API changes after `0.1.0` increment the minor version. Backward-compatible fixes and small compatible additions increment the patch version.

Version changes are made through reviewed repository changes. Do not use an automatic version command that also creates a Git tag unless an active release lock explicitly authorizes tagging.

## Changelog and release notes

`CHANGELOG.md` is the canonical human-readable release-note source.

For each candidate/release:

- add the version heading and date when the release-preparation branch is authorized;
- use only the sections that apply: Added, Changed, Fixed, Known limitations;
- describe public behavior and compatibility, not internal implementation churn;
- GitHub release notes are derived from the matching changelog entry rather than maintained as a competing source of truth.

## First pre-release boundary

The `0.1.0-alpha.1` release covers the proven Phase 1 boundary:

- SkelForm v0.7.2 / serialized armature version 0.7.1 import;
- normalized skeleton, animation, playback, attachment selection, pose evaluation, and two-pose blending;
- Phaser 4.2.1 renderer adapter;
- ESM JavaScript plus TypeScript declarations;
- validated package exports/files boundary;
- clean packed-artifact consumer import/typecheck;
- public Phase 1 browser demo.

Known intentional limitations remain documented in the Design Bible and changelog.

## Release execution boundary

After the publish-ready branch is validated and separately approved for merge:

1. merge the release-preparation PR;
2. create Git tag `v0.1.0-alpha.1` at the approved merged commit;
3. publish `dead-jim@0.1.0-alpha.1` with npm dist-tag `alpha`;
4. create GitHub pre-release **Dead Jim v0.1.0-alpha.1** from that tag using the matching changelog entry.

If authenticated npm publication is not available, stop before npm publication rather than inventing credentials or substituting automation.
