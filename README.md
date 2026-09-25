<p align="center">
  <img src="https://raw.githubusercontent.com/Wolris/deadjim/main/assets/dead-jim-avatar.jpg" alt="Dead Jim — grinning neon skeleton project artwork" width="256">
</p>

# Dead Jim

**Dead Jim** is an open-source TypeScript bridge/runtime for bringing [SkelForm](https://skelform.org/)-authored 2D skeletal animation into [Phaser 4](https://github.com/phaserjs/phaser).

The intended pipeline is:

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

SkelForm provides a free and open-source 2D skeletal-animation authoring workflow. Phaser is a mature, MIT-licensed HTML5 game framework. Dead Jim is intended to bridge those worlds with a small, explicit TypeScript runtime layer rather than requiring a proprietary skeletal-animation runtime.

Dead Jim is an independent community project maintained by **Curadh Creative / Wolris**. It is not an official SkelForm or Phaser project.

## Current status

**Early development / experimental.**

The first milestone is intentionally small:

- import SkelForm data through an isolated source adapter;
- normalize bones, transforms, sprite attachments, and animation clips;
- evaluate animation poses independently of any renderer;
- render the evaluated pose through a Phaser 4 adapter;
- support modular attachment swapping and basic animation blending.

Advanced mesh deformation, IK, physics, and a custom animation editor are deliberately deferred until real runtime evidence requires them.

The TypeScript scaffold is currently being developed on the focused implementation branch before it is merged into `main`.

## Repository structure

- `assets/` — public project artwork and repository assets
- `docs/DESIGN_BIBLE.md` — public product principles and scope
- `docs/architecture/` — architecture decision records
- `docs/roadmap/` — active execution lock, process, and backlog
- `docs/THIRD_PARTY.md` — upstream projects and license boundaries
- `AGENTS.md` — repository rules for AI-assisted development
- `src/`, `tests/`, and `validate.cmd` — runtime implementation and validation as they land from the current implementation branch

## Validation

Once the runtime scaffold is present on your branch:

On Windows:

```bat
validate.cmd
```

Or directly with npm:

```bash
npm install
npm run validate
```

## Licensing

Dead Jim software and documentation are released under the **MIT License**. See [LICENSE](LICENSE).

Important upstream boundaries:

- **SkelForm editor** — GPL-3.0; used as an external authoring tool and format target, not copied into Dead Jim.
- **skelform-js** — MIT; useful upstream/reference runtime for interoperability.
- **Phaser** — MIT; the first renderer target.

Project artwork and branding are **not** granted under the MIT software license. See [assets/README.md](assets/README.md).

See [docs/THIRD_PARTY.md](docs/THIRD_PARTY.md) for upstream license details.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Name

Bones. He's dead, Jim.
