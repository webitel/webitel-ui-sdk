# 1. CalVer lockstep versioning for the packages published from this repo

Date: 2026-09-01

## Status

Accepted.

## Context

Webitel products ship as `vYY.MM` release trains (`v26.06`), and every app repo
carries a `vYY.MM` release branch. This repo does too — `v25.02 … v26.06`.

The packages published from here did not agree on a scheme:

| package | version before | scheme |
|---|---|---|
| `@webitel/ui-sdk` (root) | `26.8.71` | CalVer `YY.M.patch` |
| `@webitel/styleguide` | `26.2.20` | CalVer, stuck on an old train |
| `@webitel/api-services` | `1.0.17` | semver |
| `@webitel/ui-datalist` | `1.1.83` | semver |
| `@webitel/ui-chats` | `0.1.54` | semver |

Three problems followed from the split.

**Frozen apps were not frozen.** Apps pinned `ui-sdk: ~26.8` — a tilde on `YY.M`
means "patches of this train only", which is exactly right. But they pinned
`ui-datalist: ^1.1.82` and `api-services: ^1.0.11`, and a caret on `1.x` means
"anything below 2.0". An app on `v26.06` silently pulled a `ui-datalist` published
from `main` months later. `wfm-app` was the live case: `ui-sdk: ~25.12` alongside
`ui-datalist: ^1.0.84`, a nine-month-old SDK against a current datalist.

**Hotfixes had nowhere to go in version space.** All five publish workflows are
`workflow_dispatch` → `npm version patch` → publish, from whichever branch is
dispatched. A `ui-datalist` hotfix published from `v26.06` produced `1.1.84` — the
same number `main` would produce next.

**Per-package freeze is impossible by construction.** All packages live in one repo
with one branch set. The unit of freeze is the repo, not the package, so "keep a
release branch per package" was never available.

Semver cannot fix the first two. Its `major` signal is unenforceable for packages
consumed only by our own frontend team, and — the decisive point — a semver number
does not say which product train it belongs to.

## Decision

**Every package published from this repo versions as `YY.M.PATCH`, in lockstep with
the release train.**

- `main` carries the **upcoming** train. A release branch `vYY.MM` keeps publishing
  its own train forever. Since the minors differ, the per-branch patch counters can
  never collide, and the existing `npm version patch` workflows become correct by
  construction rather than by discipline.
- Only `YY.M` is lockstepped. Patch counters drift apart between packages, because
  each publishes on its own dispatch. That is expected.
- Consumers pin `~YY.M`. Moving to the next train is one explicit edit.

### Branch names vs npm versions

npm normalises the zero padding away, so the two forms differ by one character and
always will:

| product / branch / git tag | npm version |
|---|---|
| `v26.06` | `26.6.x` |
| `v26.08` | `26.8.x` |
| `v26.10` | `26.10.x` |

Do not try to make npm keep `26.06`. `scripts/check-release-train.mjs` and
`scripts/bump-release-train.mjs` both accept either form and map between them.

### Exclusion: `@webitel/chat-web-sdk`

`chat-web-sdk` lives in its own repo and is integrated by developers **outside** our
frontend team. For them the breaking-change signal is worth more than the train
marker, so it stays on semver and is excluded from both guard scripts.

One consequence to keep in mind: `chat-web-sdk` depends on
`@webitel/api-services: ^0.1.36`, a range that can no longer reach a lockstepped
release. It was already stranded before this change — published `api-services` was
`1.0.17`, also out of reach — but the fix is now explicit: pin the api-services
dependency there exactly, and bump it deliberately per train.

### Carve-out: pre-lockstep release branches

Lockstep starts at train `26.08`. Older trains have no `26.x` build of the converted
packages, so existing release branches — and app `main`s still parked on an older
train — are **not** converted. They get exact pins at the versions their lockfile
already resolves, which stops the drift without pretending they are on a train that
does not exist for them. Today that is `wfm-app` (train 25.12) and
`agent-workspace-app` (train 26.6).

## Consequences

- A package unchanged for a year still bumps its train (`26.6` → `27.2`). Accepted
  noise; the version names the train, not the amount of change.
- The version no longer signals breaking changes. For internal packages this costs
  nothing we were actually getting: nobody was enforcing it.
- Moving an app to the next train means editing every `@webitel/*` range at once.
  This is deliberate — it makes the move one explicit act instead of a drift.
- `libs.update.yml` in the apps runs `npm update <pkg>`, which stays inside a `~`
  range. It keeps working within a train and, correctly, will not carry an app
  across trains on its own.

## Enforcement

- `scripts/check-release-train.mjs [package-dir]` — refuses to publish a version, or
  an intra-repo `@webitel/*` range, whose train does not match the branch. Wired
  into all five `*.publish.yml` workflows before `npm version patch`.
- `scripts/bump-release-train.mjs <train>` — moves every manifest in the repo onto a
  new train. Called by `ui-sdk.next-release-cycle.yml` after the branch is cut, which
  also verifies the cut branch against the guard.
- Each app repo carries `scripts/check-webitel-train.mjs` plus a
  `check-libs-train.yml` PR workflow, asserting its `@webitel/*` ranges are all
  `~`-pinned to one train (or all exact, for the parked apps).
