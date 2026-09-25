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

This document is a release **candidate checklist**, not release authorization.

## Required evidence

Before requesting public release authorization:

- [ ] merged candidate `main` passes full `npm run validate`;
- [ ] `npm run release:check` passes, including a fresh npm registry identity lookup;
- [ ] packed artifact reports `dead-jim@0.1.0-alpha.1`;
- [ ] packed contents remain limited to `dist/lib/`, `README.md`, `LICENSE`, and npm-generated `package.json`;
- [ ] clean consumer runtime import passes;
- [ ] clean consumer TypeScript import passes;
- [ ] `CHANGELOG.md` and `docs/RELEASE_POLICY.md` describe the same candidate;
- [ ] no tag, GitHub release, npm publication, or publish-posture change has occurred.

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

Completing this checklist does **not** authorize any action in the section above.

Stop and obtain explicit maintainer authorization before changing
`private: true`, tagging, creating a GitHub release, or running `npm publish`.
