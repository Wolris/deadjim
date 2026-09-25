# Engineering Roadmap Process

## Purpose

Keep Dead Jim implementation restartable, evidence-based, public-safe, and small enough to finish.

## Canonical task state

- `ACTIVE_TODO.md` is the sole active engineering queue.
- `BACKLOG.md` contains approved future work that is not active.
- `PROJECT_STATUS.md` summarizes state but is not a second queue.
- `DESIGN_BIBLE.md` owns durable public product principles and scope.
- `docs/architecture/` owns material engineering decisions.

## Task states

Use:

- **LOCKED** — the single current execution lock.
- **NEXT** — immediate successor work, not yet active.
- **DEFERRED** — intentionally outside the current phase.
- **AWAITING VALIDATION** — implementation exists, evidence is outstanding.
- **DONE** — closure evidence is recorded.

## Atomic lock rule

The current execution lock should be the smallest independently useful durable transaction that can reach a truthful completion gate.

## Execution cycle

1. Read fresh `ACTIVE_TODO.md`.
2. Recover the single lock.
3. Load only needed public repository owners/evidence.
4. Execute until complete or a real stop gate is reached.
5. Validate against the actual acceptance criteria.
6. Reconcile canonical repository files.
7. Record exactly one successor lock.

## Evidence rules

- Automated tests prove only the configuration exercised.
- Browser behavior does not prove mobile behavior.
- One renderer adapter does not prove the normalized runtime boundary is engine-independent.
- Mixed PASS/FAIL evidence remains open until reconciled.
- User-reported evidence must be recorded as user-reported.
- Never put private workflow details, personal-storage references, secrets, or unrelated consumer-project information into public evidence.

## Fresh-chat rule

A fresh engineering chat should normally need:

1. `AGENTS.md`;
2. fresh `docs/roadmap/ACTIVE_TODO.md`;
3. only the public repository document, ADR, test, or source file required by the lock.
