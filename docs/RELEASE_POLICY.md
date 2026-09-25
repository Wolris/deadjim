# Release Policy

## Status

Dead Jim is pre-release software.

The first public package, `dead-jim@0.1.0-alpha.1`, was published on **September 25, 2026** from final release commit `35a86f21339e4b5267d052859d7935e3bd888c2d`.

The first release was intentionally executed manually so the project could prove its validation, tagging, authentication, npm publication, and GitHub pre-release path before deciding whether any of those steps should be automated.

## Package identity

npm package name: `dead-jim`.

For the first publication, registry identity was re-checked immediately before publishing. Future releases must continue to verify the intended package/version and must never infer successful publication from a local pack or dry run.

## Versioning

Dead Jim follows Semantic Versioning.

The pre-release line is:

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
- derive GitHub release notes from the matching changelog entry rather than maintaining a competing source of truth.

## First pre-release boundary

The completed `0.1.0-alpha.1` release covers the proven Phase 1 boundary:

- SkelForm v0.7.2 / serialized armature version 0.7.1 import;
- normalized skeleton, animation, playback, attachment selection, pose evaluation, and two-pose blending;
- Phaser 4.2.1 renderer adapter;
- ESM JavaScript plus TypeScript declarations;
- validated package exports/files boundary;
- clean packed-artifact consumer import/typecheck;
- public Phase 1 browser demo.

Known intentional limitations remain documented in the Design Bible and changelog.

## Release execution boundary

For future public releases:

1. prepare the version/changelog/package metadata on a focused branch;
2. run the full deterministic repository/package validation required by the release lock;
3. obtain explicit maintainer approval before merging the release-preparation PR;
4. validate merged `main`;
5. create the approved Git tag at the exact validated release commit;
6. publish the exact approved version to npm with the intended dist-tag;
7. create the matching GitHub release or pre-release from the same tag and changelog entry;
8. reconcile canonical repository status after public verification.

Explicit maintainer approval remains mandatory even if parts of this sequence are automated later.

If authenticated npm publication is unavailable, stop before publication rather than inventing credentials, sharing secrets in chat, or bypassing the configured security policy.

## Release automation decision — September 25, 2026

**Publication remains manual for now.**

One manual release is not enough evidence to justify adding a second high-impact release path. Existing CI already automates the deterministic build, test, browser-demo build, packed-artifact boundary, clean consumer checks, and Windows/Node 24 package validation. Tag creation, npm publication, and GitHub release creation remain explicit maintainer actions until repeated release work demonstrates that automation would reduce risk or meaningful repetition.

Revisit publication automation after a second manual pre-release or when release cadence makes the manual sequence materially repetitive.

When publication automation is revisited:

- prefer npm **Trusted Publishing** with GitHub Actions OIDC rather than a long-lived npm write token;
- use a GitHub-hosted runner and a narrowly scoped release workflow;
- bind npm trust to the exact repository and workflow filename;
- preserve an explicit maintainer approval boundary before publication;
- verify version, changelog, tag, package contents, and validated commit identity before any publish step;
- keep npm publication and the GitHub release tied to the same approved version/tag;
- use short-lived credentials and repository/environment protections rather than storing reusable publishing secrets.

References:

- https://docs.npmjs.com/trusted-publishers/
- https://docs.github.com/en/actions/reference/security/oidc
