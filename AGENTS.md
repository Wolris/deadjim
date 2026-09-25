# Repository Rules

These rules are mandatory for any AI assistant, coding agent, or automation working in this repository.

## 1. Project authority

- The maintainer's latest explicit direction controls current intent and priority.
- This public repository must be self-contained. Do not require or reference private notes, personal storage, private project-management systems, or unrelated consumer projects.
- `docs/DESIGN_BIBLE.md` owns durable product principles and scope.
- `docs/architecture/` owns accepted engineering decisions.
- Source code and tests own implementation truth.
- Do not maintain competing canonical versions of the same decision.

Canonical repository owners:

- `AGENTS.md` — repository and agent rules.
- `docs/DESIGN_BIBLE.md` — public product principles, scope, and non-goals.
- `docs/roadmap/ACTIVE_TODO.md` — sole current engineering execution queue.
- `docs/roadmap/PROCESS.md` — engineering task lifecycle.
- `docs/roadmap/BACKLOG.md` — approved future engineering work.
- `docs/PROJECT_STATUS.md` — concise fresh-chat handoff.
- `docs/architecture/` — accepted engineering decisions.

## 2. Startup and execution lock

When task state is unknown, stale, or materially changed:

1. read fresh `docs/roadmap/ACTIVE_TODO.md`;
2. recover exactly one `CURRENT EXECUTION LOCK`;
3. load only the specific public repository owner, architecture record, source evidence, or code owner needed for that lock;
4. execute the lock rather than stopping at discovery when the next safe step is available.

A response may stop when the atomic lock is complete, a genuine maintainer decision is required, manual evidence is required, a permission/safety boundary blocks continuation, or bounded recovery establishes a concrete blocker.

## 3. Scope discipline

- Keep exactly one current execution lock.
- Do not create a second active queue in issues, chat, README, or another document.
- New approved future work goes to `BACKLOG.md` unless explicitly promoted.
- Do not opportunistically widen a runtime/adapter task into editor development.
- Do not silently weaken a named requirement after implementation begins.

## 4. Product and architecture guardrails

- Dead Jim bridges skeletal-animation authoring data into game runtimes, beginning with **SkelForm -> Dead Jim -> Phaser 4**.
- Dead Jim's software implementation is MIT-licensed.
- The core workflow must not require a commercial skeletal-animation runtime license unless the project explicitly changes that goal.
- Dead Jim begins as a runtime and adapter project, not a custom visual editor.
- Prefer import adapters and renderer adapters around a normalized runtime model.
- Keep the normalized model independent of Phaser where practical.
- Do not make consumer-specific concepts part of the core API unless a general requirement proves the abstraction.
- Prefer small, inspectable data formats and explicit TypeScript APIs.
- Avoid dependencies when a small internal implementation is clearer and safer.

## 5. Engineering style

- Use TypeScript for runtime/reference implementation code unless an accepted ADR says otherwise.
- Favor small modules, explicit types, deterministic math, and readable names.
- Keep source import, normalized runtime state, animation evaluation, and renderer integration separate.
- Do not generalize a one-off pattern until real use earns the abstraction.
- No secrets or personal/private data in source, fixtures, docs, examples, logs, or screenshots.

## 6. Validation and evidence

A passing build proves only that the build passed.

For changed behavior, use the smallest combination of:

- unit tests for transforms/interpolation/runtime state;
- format/import tests;
- renderer integration tests;
- browser/runtime smoke validation;
- consumer integration validation;
- device validation only when a renderer/consumer requires it.

When handing manual validation to a maintainer or reviewer:

- batch related checks;
- number reportable checks consecutively;
- state shared setup once;
- say exactly what constitutes PASS;
- do not make the reviewer rediscover commands the repository should provide.

## 7. Git safety

- Use focused feature branches for implementation work unless direct-main work is explicitly requested.
- Prefer small commits with clear messages.
- Never force-push, rewrite shared history, delete branches, merge PRs, tag releases, or create releases without explicit approval.
- Before updating an existing file through an API/connector, fetch its current content/SHA first.

## 8. AI-assisted development

- AI output is proposal or implementation work, not project authority by itself.
- Use agents for bounded, non-overlapping investigations with one synthesis owner.
- Automate repetitive validation before automating design decisions.
- Prefer repository evidence over copied chat context.
- A fresh chat should normally need only `AGENTS.md`, fresh `ACTIVE_TODO.md`, and the one relevant public repository owner/ADR.

## 9. External formats and licenses

- Dead Jim code is MIT-licensed.
- SkelForm's editor is GPL-3.0 and must remain an external tool/source-format target unless the project explicitly changes its licensing strategy.
- Do not copy GPL-licensed SkelForm editor code into the MIT-licensed Dead Jim core.
- `skelform-js` is MIT-licensed; preserve its upstream copyright/license notice if code is incorporated from it.
- Phaser is MIT-licensed and is the first renderer target.
- Keep source-format support modular so one authoring tool can be replaced without rewriting the core runtime.
- Do not imply official affiliation with SkelForm or Phaser.
- See `docs/THIRD_PARTY.md`.
