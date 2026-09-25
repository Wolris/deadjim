# Contributing to Dead Jim

Thanks for your interest in Dead Jim.

## Before contributing

Please read:

- `README.md`
- `docs/DESIGN_BIBLE.md`
- `AGENTS.md`
- `docs/roadmap/ACTIVE_TODO.md`
- relevant records under `docs/architecture/`

## Development principles

- Keep the normalized runtime independent of Phaser where practical.
- Keep SkelForm-specific parsing inside source adapters.
- Do not introduce consumer-specific domain concepts into the core runtime.
- Prefer small, deterministic TypeScript modules and explicit data contracts.
- Add or update tests for changed behavior.
- Keep private information, credentials, local paths, private project-management details, and unrelated consumer-project data out of the repository.

## Licensing boundary

Dead Jim is MIT-licensed.

The SkelForm editor is GPL-3.0. Do not copy GPL-licensed SkelForm editor source into Dead Jim's MIT-licensed core. Interoperability work should use public specifications/documentation or independently written implementation unless the project explicitly changes its licensing strategy.

The separate `skelform-js` runtime is MIT-licensed. If code is incorporated from it, preserve the required upstream copyright and license notice.

See `docs/THIRD_PARTY.md`.

## Validation

Before opening a pull request:

```bash
npm install
npm run validate
```

On Windows, the repository also provides:

```bat
validate.cmd
```

## Pull requests

Keep pull requests focused. Explain:

- what changed;
- why it changed;
- how it was validated;
- any remaining limitations or deferred work.

Do not mix unrelated cleanup into a feature change unless it is required to complete the change safely.
