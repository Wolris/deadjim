# Release Policy

## Status

Dead Jim is pre-release software. The first intentional package candidate is `0.1.0-alpha.1`.

The repository remains `private: true` in `package.json` until a later explicit release lock and maintainer approval authorize changing publish posture. This policy does not itself authorize npm publication, Git tags, or GitHub releases.

## Package identity

Intended npm package name: `dead-jim`.

Evidence: GitHub Actions validation run 64 queried the npm registry on September 25, 2026 and found no package record for `dead-jim`.

Because registry state can change, the release checklist must run:

```bash
npm run package:name-check
```

again immediately before any first publication attempt.

## Versioning

Dead Jim follows Semantic Versioning.

The initial pre-release line is:

- `0.1.0-alpha.N` — early public-package candidates; API changes are still expected.
- `0.1.0-beta.N` — the intended `0.1.0` public API is feature-complete; fixes and compatibility adjustments may still occur.
- `0.1.0-rc.N` — release-candidate builds with no planned API changes except release-blocking fixes.
- `0.1.0` — first non-prerelease package milestone.

While Dead Jim remains below `1.0.0`, intentional breaking public-API changes after `0.1.0` increment the minor version. Backward-compatible fixes and small compatible additions increment the patch version.

Version changes are made through reviewed repository changes. Do not use an automatic version command that also creates a Git tag unless a release lock explicitly authorizes tagging.

## Changelog and release notes

`CHANGELOG.md` is the canonical human-readable release-note source.

For each candidate/release:

- add a version heading and date only when the release is actually created;
- before release, mark the entry as an unreleased candidate;
- use only the sections that apply: Added, Changed, Fixed, Known limitations;
- describe public behavior and compatibility, not internal implementation churn;
- GitHub release notes should be derived from the matching changelog entry rather than maintained as a competing source of truth.

## First pre-release boundary

The `0.1.0-alpha.1` candidate covers the proven Phase 1 boundary:

- SkelForm v0.7.2 / serialized armature version 0.7.1 import;
- normalized skeleton, animation, playback, attachment selection, pose evaluation, and two-pose blending;
- Phaser 4.2.1 renderer adapter;
- ESM JavaScript plus TypeScript declarations;
- validated package exports/files boundary;
- clean packed-artifact consumer import/typecheck;
- public Phase 1 browser demo.

Known intentional limitations remain documented in the Design Bible and changelog.
