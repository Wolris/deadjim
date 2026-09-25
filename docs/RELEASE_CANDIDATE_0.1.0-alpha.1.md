# Dead Jim 0.1.0-alpha.1 — Pre-release Candidate Checklist

## Candidate identity

- npm package: `dead-jim`
- semantic version: `0.1.0-alpha.1`
- proposed Git tag: `v0.1.0-alpha.1`
- proposed GitHub pre-release title: **Dead Jim v0.1.0-alpha.1**
- proposed npm dist-tag: `alpha`
- license: MIT
- module format: ESM
- Phaser peer dependency: `^4.2.1`
- current publish safety gate: `private: true`

Maintainer release authorization was granted on **September 25, 2026**. This document remains the candidate evidence record; repository rules still require separate merge approval for the release-preparation PR before tagging/releasing/publishing.

## Required evidence — complete

- [x] merged candidate `main` passes full `npm run validate` — GitHub Actions run **67: PASS**;
- [x] one-time `npm run release:check` passes, including a fresh npm registry identity lookup — run **69: PASS**;
- [x] packed artifact reports `dead-jim@0.1.0-alpha.1` — run 69;
- [x] packed contents remain limited to `dist/lib/`, `README.md`, `LICENSE`, and npm-generated `package.json` — **23 files**, run 69;
- [x] clean consumer runtime import passes — run 69;
- [x] clean consumer TypeScript import passes — run 69;
- [x] `CHANGELOG.md` and `docs/RELEASE_POLICY.md` describe the same candidate — candidate metadata check PASS, run 69;
- [x] publish posture remains unchanged — `private: true`; this checklist performed no tag, GitHub release, or npm publication.

Fresh npm identity evidence from checklist run 69 and authorized release-preparation run **74**: **PASS — `dead-jim` had no registry package record on September 25, 2026.**

Authorized release-preparation run **74: PASS** also reconfirmed the publish-ready metadata, `dead-jim@0.1.0-alpha.1` packed artifact, 23-file boundary, and clean consumer runtime/type checks after removing `private: true`.

Routine `npm run validate` remains deterministic and does not query the live npm registry. `npm run release:check` is the explicit release-time guard.

## Release notes source

`CHANGELOG.md` is canonical.

If authorized, the GitHub pre-release body must be derived from the
`0.1.0-alpha.1 — unreleased candidate` entry by preserving its **Added** and
**Known limitations** sections. Do not create a competing release-note source.

## Exact publish-posture changes that require authorization

Authorization to release `0.1.0-alpha.1` would permit a later release lock to:

1. re-run `npm run package:name-check` immediately before the first publication attempt;
2. remove `"private": true` from `package.json`;
3. change the changelog candidate heading from `unreleased candidate` to the actual release date;
4. commit those release-preparation changes on a focused release branch;
5. run full `npm run validate` plus `npm run release:check`;
6. merge the release-preparation PR only with explicit merge approval;
7. create Git tag `v0.1.0-alpha.1` at the approved merged release commit;
8. publish `dead-jim@0.1.0-alpha.1` to npm with dist-tag `alpha`;
9. create GitHub **pre-release** **Dead Jim v0.1.0-alpha.1** from the existing tag, using the matching changelog entry as release notes.

npm publication also requires authenticated npm access. Do not assume credentials
or a publishing secret exist; if no authorized npm publishing path is available,
stop before publication rather than substituting release automation.

## Stop condition

The checklist is complete and maintainer release authorization has been granted. The active release-preparation branch may change publish posture, but it must stop for explicit merge approval before creating the Git tag, GitHub pre-release, or running `npm publish`.
