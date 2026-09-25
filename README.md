# Dead Jim

<img src="assets/dead-jim-avatar.png" align="left" alt="Dead Jim — grinning neon skeleton project artwork" width="80">

**Dead Jim** is an open-source TypeScript bridge/runtime for bringing [SkelForm](https://skelform.org/)-authored 2D skeletal animation into [Phaser 4](https://github.com/phaserjs/phaser).

Bones: "He's dead, Jim."

<br/>

The reference pipeline is:

```text
SkelForm authoring
      ↓
Dead Jim source adapter
      ↓
normalized skeletal runtime
      ↓
Phaser 4 renderer adapter
```

## Why Dead Jim?

SkelForm provides a free and open-source 2D skeletal-animation authoring workflow. Phaser is a mature, MIT-licensed HTML5 game framework. Dead Jim bridges those worlds with a small, explicit TypeScript runtime layer rather than requiring a proprietary skeletal-animation runtime.

Dead Jim is an independent community project maintained by **Curadh Creative / Wolris**. It is not an official SkelForm or Phaser project.

## Current status

**Phase 1 complete / pre-release.**

The completed Phase 1 runtime discriminator proves:

- SkelForm v0.7.2 source import through an isolated adapter;
- normalized bones, transforms, sprite attachments, and animation clips;
- renderer-independent pose evaluation;
- deterministic clip playback and looping;
- modular attachment/style swapping;
- deterministic two-pose blending;
- Phaser 4.2.1 rendering through an adapter;
- a public browser sandbox exercising the complete path.

The library distribution boundary is also validated: Dead Jim emits ESM JavaScript and TypeScript declarations, packs an intentional file set, and installs/imports successfully in a clean consumer smoke test.

**Dead Jim is not published yet.** The package remains `private: true` at version `0.0.0` while pre-release metadata/versioning is reviewed.

Advanced mesh deformation, IK, physics, state machines, multiple adapters, and a custom animation editor remain deliberately deferred until real runtime evidence requires them.

## Repository structure

- `assets/` — public project artwork and repository assets
- `examples/phase1/` — self-contained browser sandbox for the Phase 1 runtime path
- `docs/DESIGN_BIBLE.md` — public product principles and scope
- `docs/architecture/` — architecture decision records
- `docs/roadmap/` — active execution lock, process, and backlog
- `docs/THIRD_PARTY.md` — upstream projects and license boundaries
- `AGENTS.md` — repository rules for AI-assisted development
- `src/` — runtime implementation
- `tests/` — deterministic runtime/import/renderer tests
- `scripts/` — package/build validation helpers
- `validate.cmd` — Windows validation entrypoint

## Phase 1 browser demo

From the repository root:

```bash
npm install
npm run demo:dev
```

PASS when the arm keeps animating, the blend slider changes the motion continuously, and the style button swaps cyan/magenta attachments without interrupting playback.

## Library artifact validation

Build the emitted ESM library and declarations:

```bash
npm run build:lib
```

Validate the package boundary without publishing:

```bash
npm run package:check
```

That command builds the library, packs it locally, verifies the packed contents, installs the tarball into a clean temporary consumer, imports representative runtime APIs, and typechecks representative public types. It does **not** publish the package.

## Validation

On Windows:

```bat
validate.cmd
```

Or directly with npm:

```bash
npm install
npm run validate
```

Full validation covers typechecking, 45 deterministic tests, the Phase 1 production demo build, and the package consumer smoke path.

## Licensing

Dead Jim software and documentation are released under the **MIT License**. See [LICENSE](LICENSE).

Important upstream boundaries:

- **SkelForm editor** — GPL-3.0; used as an external authoring tool and format target, not copied into Dead Jim.
- **skelform-js** — MIT; useful upstream/reference runtime for interoperability.
- **Phaser** — MIT; the first renderer target and a peer dependency for the Phaser adapter.

Project artwork and branding are **not** granted under the MIT software license. See [assets/README.md](assets/README.md).

See [docs/THIRD_PARTY.md](docs/THIRD_PARTY.md) for upstream license details.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.
