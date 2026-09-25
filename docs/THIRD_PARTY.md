# Third-Party Projects and License Boundaries

Dead Jim is designed to interoperate with public third-party projects while keeping its own MIT-licensed implementation boundary clear.

## SkelForm

Project: https://github.com/Retropaint/skelform

License: GPL-3.0

Role in Dead Jim: external authoring application and source-format target.

Dead Jim does **not** copy or vendor the SkelForm editor implementation. Interoperability should be based on public file-format/runtime documentation and independently written adapter code unless the project's licensing strategy is explicitly changed.

### First compatibility pin

The first Dead Jim SkelForm importer is pinned to the public **SkelForm v0.7.2** release tag at commit `37b268dfa578a2fb2e31c29814c5f609249475f2`.

Upstream's runtime file specification says runtimes parse `armature.json` plus atlas images and that animation vector channels are stored as separate scalar keyframes. The v0.7.2 source tag still declares Cargo package version `0.7.1`, and its save path writes `CARGO_PKG_VERSION` into `armature.json`; therefore the first Dead Jim compatibility fixture identifies itself as armature version `0.7.1`.

References:

- https://github.com/Retropaint/SkelForm/releases/tag/v0.7.2
- https://github.com/Retropaint/SkelForm/blob/v0.7.2/assets/skf_readme.md
- https://github.com/Retropaint/SkelForm/blob/v0.7.2/src/shared.rs
- https://github.com/Retropaint/SkelForm/blob/v0.7.2/src/utils.rs

The Dead Jim fixture is independently authored to exercise the documented public data shape. It does not copy or vendor SkelForm editor implementation code.

## skelform-js

Project: https://github.com/Retropaint/skelform-js

License: MIT

Role in Dead Jim: upstream/reference JavaScript runtime useful for understanding and validating SkelForm runtime behavior.

If Dead Jim later incorporates code from skelform-js rather than independently implementing equivalent behavior, the applicable upstream copyright and MIT notice must be preserved.

## Phaser

Project: https://github.com/phaserjs/phaser

License: MIT

Role in Dead Jim: first renderer/runtime integration target.

Phaser-specific objects and lifecycle behavior belong in the Phaser adapter rather than Dead Jim's normalized skeletal-animation model.

## Independence

Dead Jim is an independent community project and is not endorsed by, affiliated with, or an official component of SkelForm or Phaser.
