# `@webitel/ui-chats` — Two-line versioning

Status: **Accepted** · Date: 2026-07-07 · Package: `@webitel/ui-chats`

## Context

`@webitel/ui-chats` must serve two consumers at once:

- **Old chats app** — in production, rarely updated.
- **New chats app** — in active development, not yet in production.

The package lives in the `webitel-ui-sdk` npm-workspaces monorepo alongside other
**actively developed** packages (`@webitel/ui-sdk`, `@webitel/styleguide`,
`@webitel/api-services`, `@webitel/ui-datalist`). The two chats lines must diverge
**without** freezing or forking the rest of the monorepo.

### Constraint that drives the design

One `package.json` holds **one** `version` field. The publish workflow runs
`npm version patch` on it. Two independent version lines (old `0.1.x`, new `2.x`)
cannot share a single `version` field — publishing one line would bump/collide with
the other. Each line therefore needs its **own version source**. A git branch
supplies that.

## Decision

Keep **one package name**, split into **two semver major lines** distinguished by
**npm dist-tags**, with the new/experimental line isolated on a **release branch**.

| Line | Branch | `version` | dist-tag | Consumer range |
|------|--------|-----------|----------|----------------|
| Old (prod) | `main` | `0.1.x` (→ `1.x` if a stable major is wanted) | `latest` | `@webitel/ui-chats@^1` |
| New (dev) | `release/ui-chats-v2` | `2.x` (`2.0.0-next.N` …) | `next` / `ws2` | `@webitel/ui-chats@next` |

- Stable/prod line stays on `main` — normal flow, untouched.
- New line is developed on `release/ui-chats-v2` (PRs target that branch).
- The branch = the per-line version source, so the two lines never collide.

### Why the new line is the branch (not the old)

The new app is the churny, experimental one. Isolating it on a branch keeps `main`
stable and shipping to production, while the branch absorbs the fast-moving work.

### Why not a second package name

A second name (`@webitel/ui-chats-next`) would avoid the branch but forces the new
app to import a different specifier and eventually a rename/swap. One name + dist-tags
keeps consumers on a single specifier, switching lines via semver range. Revisit this
only if the old line stops being frozen (see *When this stops fitting*).

## Keeping sibling packages current on the branch

Two separate concerns:

### 1. Runtime dependencies — handled by peerDependencies

`ui-chats` declares siblings (`@webitel/styleguide`, `@webitel/api-services`) as
**peerDependencies**. Peers resolve at the **consuming app**, not at ui-chats build
time. So each app picks its own sibling versions; a published `ui-chats` artifact
neither pins nor bundles sibling source. Branch staleness does not affect runtime.

### 2. Build-time source on the branch — track `main`, pin one folder

Only the sibling **source** on the branch can drift (used for `build:types`, local
dev, typecheck). The branch tracks `main`, with divergence confined to the
`packages/ui-chats` folder via a `merge=ours` driver:

```bash
# on release/ui-chats-v2
printf 'packages/ui-chats/** merge=ours\n' >> .gitattributes
git config merge.ours.driver true      # local config — per clone AND in any CI job that merges
```

Then routinely:

```bash
git checkout release/ui-chats-v2
git merge main    # ui-sdk / styleguide / api-services / ui-datalist → current
                  # packages/ui-chats → stays at v2 code (pinned)
```

Result: every sibling on the branch stays current with `main`; the `ui-chats` folder
keeps its v2 code; merge-conflict surface is ~zero.

## Publishing

`.github/workflows/ui-chats.publish.yml` is `workflow_dispatch` with a `version_tag`
input (`latest` / `next` / `ws2`). Publish each line from its branch:

- `main` + tag `latest` → old/prod line.
- `release/ui-chats-v2` + tag `next` (or `ws2`) → new line.

`npm version patch` then bumps within the checked-out branch's line. Pick the branch
in the "Run workflow" ref selector. (Optional hardening: guard so `next`/`ws2` publish
only from `release/*` and `latest` only from `main`.)

## Consuming

```jsonc
// old app
"@webitel/ui-chats": "^1"          // or "^0.1"
// new app
"@webitel/ui-chats": "next"        // pre-release; switch to "^2" once 2.0.0 is on latest
```

When the new app goes to production, promote the line:

```bash
npm dist-tag add @webitel/ui-chats@1.x.y legacy   # park the old line
npm dist-tag add @webitel/ui-chats@2.0.0 latest   # new line becomes default
```

## Consequences

- **Pro:** one package name; two lines coexist; `main` stays stable; rest of the
  monorepo keeps moving; siblings stay current on the branch automatically.
- **Con:** `merge=ours` freezes the **whole** `ui-chats` folder against `main`. A fix
  landed on the old line (`main`) that the new line also needs must be **cherry-picked**:
  ```bash
  git checkout release/ui-chats-v2
  git cherry-pick <fix-sha>   # resolve within packages/ui-chats
  ```
- **Con:** the `merge.ours.driver` config is not committed; it must be set in every
  clone and in any CI job that performs the merge.

## When this stops fitting

This design assumes the **old line is effectively frozen** (only critical patches). If
the old line starts evolving in parallel — real two-way feature work — cherry-picks
pile up and `merge=ours` fights you. That is the signal to switch to a **folder split**:
`packages/ui-chats` (old) + `packages/ui-chats-next` (new), both on `main`, both
current by construction, no release branch. Trade: a second package name + eventual
rename.
