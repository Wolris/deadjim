# Third-Party Projects and License Boundaries

Dead Jim is designed to interoperate with public third-party projects while keeping its own MIT-licensed implementation boundary clear.

## SkelForm

Project: https://github.com/Retropaint/skelform

License: GPL-3.0

Role in Dead Jim: external authoring application and source-format target.

Dead Jim does **not** copy or vendor the SkelForm editor implementation. Interoperability should be based on public file-format/runtime documentation and independently written adapter code unless the project's licensing strategy is explicitly changed.

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
