# ui-chats v2 — active chat: message history + composer

- **Issue:** [WS-50](https://webitel.atlassian.net/browse/WS-50) — US_3.2 «Активний чат. Вкладка Chat, Info, Post-processing»
- **Requirements:** Confluence [Е3. Картка активного чату → US_3.2](https://webitel.atlassian.net/wiki/spaces/WPR/pages/1686700110/3.)
- **Design:** Figma [New-WorkSpace → Chats Page DES-730](https://www.figma.com/design/rKBYGGSWuSwpg8hHeHis0Q/New-WorkSpace?node-id=5771-29130)
- **Decisions:** [v2-sdk-models ADR](../../pages/packages/ui-chats/architecture/v2-sdk-models.md), glossary [`packages/ui-chats/CONTEXT.md`](../../../packages/ui-chats/CONTEXT.md)

## 1. Goal

The operator sees the full message history of a thread — client, operators,
bot, system notices, earlier sessions — and can write back. Delivered as a
second-generation UI inside `@webitel/ui-chats`, alongside v1, consumed first by
`agent-workspace-app`.

Success: `agent-workspace-app`'s Chat tab renders v2 and matches DES-730 in
light and dark themes; v1 consumers (`cc-workspaces`) are unaffected.

## 2. Scope

**In v2 (this package):**

- Message history: messages, system notices, date dividers, attachments,
  delivery status, pagination, scroll-to-bottom.
- Composer: text field, attach, emoji, send, extension slot.

**Not in v2 — host app owns it:** top bar (US_3.1), tab strip, Info tab,
Post-processing tab, right drawer rail (search / history / members — not MVP),
Snooze (AC_03.02.03 — thread-level action, like transfer/end).

**Not built at all now:** Messages / Internal toggle (US_3.4, no backend
support), quick-replies panel (WS-53 — only its slot exists), message search,
reactions, replies, forwards, edit history, malware / size-exceeded states.

## 3. Package layout

```
packages/ui-chats/src/
  shared/                     ← NEW: contract-free, used by v1 and v2
    composables/
      useChatScroll.ts            (moved from ui/messaging/composables)
      useScrollToBottomBtn.ts     (moved)
      useObserveHeightUntilStable.ts (moved)
  v2/                         ← NEW
    index.ts                      public entry: @webitel/ui-chats/v2
    types/                        prop types, ChatComposerAction, ChatThreadMode
    ui/
      chat-thread/                ChatThread (composite)
      chat-history/               ChatHistory + internal leaves
        components/               chat-message, chat-system-notice,
                                  chat-date-divider, message-attachments,
                                  message-status, scroll-to-bottom-btn
      chat-composer/              ChatComposer + built-in actions
    scripts/                      pure logic (see §6)
    locale/                       9 locales, merged by setConfig
  ui/ types/ adapters/        ← v1, unchanged except the moved composables
```

**Rules**

- v1 never imports from `v2/`. v2 never imports from v1's `ui/`, `types/`,
  `adapters/`. Both may import `shared/`.
- Moving the scroll composables keeps v1's public API: `src/ui/index.ts`
  re-exports `useChatScroll` and `useObserveHeightUntilStable` from `shared/`.
  `cc-workspaces` imports keep working.
- `useChatScroll`'s `messages` option is widened from v1 `ChatMessageType[]` to a
  structural type — it only reads the last item's "is self" flag and the length.
  The option becomes `{ messages, isSelf?: (item) => boolean }`, defaulting to
  `item.member?.self` so v1 callers are untouched.

**package.json**

- Add export `"./v2": { "types": "./types/v2/index.d.ts", "import": "./src/v2/index.ts" }`.
- `@webitel/chat-web-sdk` stays an **optional** peer (v2 imports types only).
- Declare `@vueuse/core` (already imported by v1, currently undeclared).
- `test:unit` → `vitest run --root ../.. packages/ui-chats/src` (as ui-datalist).

When v1 is retired: delete `ui/`, `types/`, `adapters/`; promote `v2/`.

## 4. Public API (`@webitel/ui-chats/v2`)

Types are imported from `@webitel/chat-web-sdk` with `import type`:
`ThreadModel`, `MessageModel`, `ThreadMemberModel`.

### `ChatThread` — composite, what the app uses

| Prop | Type | Default | Notes |
|---|---|---|---|
| `thread` | `ThreadModel` | — | members + readStates are read from it |
| `messages` | `MessageModel[]` | — | oldest → newest; current and earlier sessions |
| `selfMemberId` | `string` | — | thread-member id of the operator using the UI |
| `mode` | `ChatThreadMode` | `'active'` | `'awaiting' \| 'active' \| 'readonly'` |
| `hasMore` | `boolean` | `false` | older history exists |
| `onLoadMore` | `() => Promise<unknown>` | — | bound via `@load-more` |
| `onSend` | `(text: string) => Promise<unknown>` | — | bound via `@send` |
| `onAttach` | `(files: File[]) => Promise<unknown>` | — | bound via `@attach` |
| `actions` | `ChatComposerAction[]` | all | `'attach' \| 'emoji' \| 'send'` |
| `submitOnEnter` | `boolean` | `true` | kept from v1 (mobile, WTEL-10388) |
| `resolveAvatarUrl` | `(member: ThreadMemberModel) => string \| undefined` | — | none → initials |
| `draft` (v-model) | `string` | internal | optional, for per-thread drafts |

| Emit | Payload | Notes |
|---|---|---|
| `seen` | `MessageModel` | newest message seen at the bottom of the history |

| Slot | Props | Notes |
|---|---|---|
| `actions` | `{ insertText(text), focus(), disabled }` | forwarded to the composer |

`ChatThread` passes props down; `mode` decides what renders (§5.6).

### `ChatHistory`

`thread`, `messages`, `selfMemberId`, `mode`, `hasMore`, `onLoadMore`,
`resolveAvatarUrl`; emits `seen`. Usable alone for read-only views.

### `ChatComposer`

`onSend`, `onAttach`, `actions`, `submitOnEnter`, `disabled`, `v-model:draft`;
slot `actions`. Usable alone in a custom shell.

**Why function props instead of emits:** the composer must know when a send
finishes to clear the draft or keep it. A prop named `onSend` is still bound
with `@send="…"` in the template, and the component can `await` it. This
replaces v1's `(text, { onSuccess, onError, onComplete })` callback dance.

Leaf components stay internal (unexported).

## 5. Behaviour

### 5.1 History items

`ChatHistory` turns `messages` into a render list:

- `message.system` set → **system notice**; otherwise → **message**.
- A **date divider** is inserted before the first item of each calendar day
  (local time, from `createdAt`, Unix ms as string).

Divider label: `Today` → today; `September 15` → this year; `September 15, 2025`
→ other years. Formatted with `Intl.DateTimeFormat` in the i18n locale. No
"Yesterday" (not in the AC).

### 5.2 Message bubble

- **Side.** Right when the sender is on the contact-centre side, left for the
  client. Predicate `isContactCentreSide(sender)`:
  `sender.contact.type === 'webitel' || sender.contact.isBot === true`.
  ⚠ Assumption carried from v1 (`chat-message.vue:129`); not confirmed for the
  new IM backend. The predicate is the only place to change.
- **Avatar** on every bubble (left of client bubbles, right of contact-centre
  bubbles): `wt-avatar` with `resolveAvatarUrl(sender)` or initials from
  `sender.contact.name`. No grouping of consecutive messages.
- **Body.** `body` text with links autolinked (Autolinker, as v1), line breaks
  preserved, emoji as text.
- **Footer.** Time `HH:mm`, plus status ticks on **self** messages only.
- **Deleted** (`deleted: true`): tombstone "Message deleted", no content,
  no status.
- **Max width** a percentage of the history width.

### 5.3 Delivery status

Only for messages whose `sender.id === selfMemberId`.

- `clientMembers` = `thread.members` not on the contact-centre side.
- `deliveredUpTo` / `readUpTo` = **minimum** over client members'
  `thread.readStates[].deliveredUpToSeq` / `readUpToSeq` (as numbers).
- `seq <= readUpTo` → `read`; `seq <= deliveredUpTo` → `delivered`;
  otherwise `sent`.
- No client read state, or no `seq` → `sent`.

Icons: single tick (sent), double tick (delivered), double tick in accent
colour (read) — exact icons/colours from Figma during implementation.

### 5.4 Attachments

From `images[]` and `documents[]`; a message can have several of each, plus
`body` as caption (rendered under the attachments).

- **Images:** all of them, in a grid inside the bubble. Each tile reserves its
  aspect ratio from `width`/`height` so loading does not move the scroll
  position. Missing dimensions → fixed square tile. HEIC → document card
  (browsers can't render it; v1 rule).
- **Gallery:** clicking an image opens `wt-galleria` over **every image in the
  history**, starting at the clicked one. Shared between bubbles and
  `ChatHistory` through a typed `InjectionKey`.
- **Audio / video** (`documents[]` with `audio/*` / `video/*` mime): inline
  `wt-vidstack-player`.
- **Other documents:** card with file icon, `name`, prettified `size`, download
  link (`url`).

### 5.5 System notices

Centred row: small actor avatar, localized text, time.

`system.type` is a free string and `system.metadata` is untyped. v2 keeps one
table:

```ts
SYSTEM_NOTICES: Record<string, { textKey: string; tone: 'positive' | 'neutral' | 'negative' }>
```

| BE type (assumed) | Text | Tone |
|---|---|---|
| thread started | Chat started by {actor} | positive (green) |
| `member_added` | {actor} joined the chat | neutral |
| accepted | {actor} accepted the chat | neutral |
| `transferred` | {actor} transferred the chat | neutral |
| `member_removed` | {actor} left the chat | neutral |
| thread closed | Chat ended by {actor} | negative (red) |

Actor resolution: `metadata` member id if present, else `sender`; matched in
`thread.members` for name/avatar. Unknown type → neutral notice showing `body`
when present, else "System event".

⚠ **Dependency on [WS-22](https://webitel.atlassian.net/browse/WS-22) (backend,
"Need info").** Only `member_added`, `member_removed`, `transferred` are
documented (proto comment on `ProviderSendSystemMessageRequest.eventType`).
The started / accepted / closed strings and the metadata key carrying the actor
must be confirmed there. Building against guesses is accepted because the table
is the only thing that changes.

### 5.6 Modes

| `mode` | History | Composer |
|---|---|---|
| `active` | messages | shown |
| `awaiting` | messages + "Waiting for operator to accept…" line at the bottom | hidden |
| `readonly` | messages | hidden |

The app maps its own state (offer → `awaiting`, closed → `readonly`,
post-processing → its choice). v2 knows nothing about tasks.

### 5.7 Scrolling and pagination

Built on the shared `useChatScroll`:

- First render jumps to the bottom.
- New messages stick to the bottom while the operator is at the bottom; when
  scrolled up, an unseen counter grows on the scroll-to-bottom button.
- Scroll-to-bottom button appears once scrolled up (AC_03.02.04), scrolls to
  the newest message on click (AC_03.02.05).
- A top sentinel calls `onLoadMore()` when `hasMore`; spinner while the promise
  is pending; scroll position is kept on prepend. A rejected promise stops the
  spinner; the sentinel retries on the next intersection.
- `seen(message)` emits when the operator is at the bottom and the newest
  message changes (from `useChatScroll`'s `onSeen`). The app decides what to do
  (e.g. `IMessage.markRead()`); v2 never calls SDK methods.

### 5.8 Composer

- Layout: auto-growing text field on top; actions row below — attach, emoji,
  then the `#actions` slot on the left; send button on the right (Figma).
- `actions` prop filters the built-ins; order is fixed.
- Draft: internal by default; `v-model:draft` makes it controlled.
- Send: Enter sends when `submitOnEnter`, Shift+Enter newlines. Send is a no-op
  for an empty / whitespace draft.
- While `onSend` / `onAttach` is pending: field and actions disabled, send shows
  a spinner, draft stays visible.
- Resolve → draft cleared, field refocused. Reject → draft kept, controls
  re-enabled, error rethrown (the app shows the toast; v2 has no notifications).
- Attach: hidden `<input type=file multiple>`; selected files go to `onAttach`.
- Emoji: `wt-chat-emoji`; picked emoji inserted at the cursor.
- Slot API `{ insertText(text), focus(), disabled }` — `insertText` inserts at
  the cursor (or appends) and updates the draft. WS-53 quick replies plug in
  here.

## 6. Pure logic (`v2/scripts/`)

Plain functions over plain models, kept out of components so they are cheap to
test:

- `isContactCentreSide(member)`
- `getMessageStatus(message, thread, selfMemberId)`
- `toHistoryItems(messages)` → messages / system notices / date dividers
- `formatDividerDate(createdAt, now, locale)`
- `resolveSystemNotice(message, thread)` → `{ textKey, tone, actor }`
- `collectGalleryImages(messages)`
- `classifyDocument(document)` → `'media' | 'file'`

## 7. Styling

- Only `--wt-ws-chat-window-*` and `--wt-ws-message-composer-*` tokens from
  `@webitel/styleguide/agent-workspace-app` (generated from Figma, light and
  dark), e.g. `--wt-ws-chat-window-colors-message-item-chat-message-{agent,client}-{background,color}`,
  `--wt-ws-chat-window-sizes-message-item-chat-message-{padding-x,padding-y,gap,border-radius}`.
  No hard-coded fallbacks.
- Gaps (date pill, system notice tones, status tick colour): semantic
  styleguide tokens, exact values taken from Figma (`get_design_context`) while
  implementing.
- The host must import `@webitel/styleguide/agent-workspace-app`; documented
  in the package docs.
- Scoped styles; no container queries.

## 8. Localization

Keys under `'@webitel/ui-chats'.v2.*`, merged by the existing `setConfig`
(no new init call). ~15 strings: composer placeholder, waiting line, six
system-notice texts + fallback, "Today", "Message deleted", download, action
tooltips.

All 9 locales (en, es, kz, pl, ro, ru, uk, uz, vi). en / uk / ru written with
care; es / kz / pl / ro / uz / vi are drafts flagged for a native-speaker check.

## 9. Testing

Written **after** implementation (no TDD). Vitest from the repo root
(happy-dom + @vue/test-utils), plain `MessageModel` / `ThreadModel` fixtures.

- **Pure logic (§6):** each function — status edge cases (no read state,
  several clients, missing seq), side predicate, divider boundaries (today,
  this year, other year), system table + fallback, gallery order, document
  classification.
- **`ChatComposer`:** awaits `onSend`; clears on resolve; keeps draft and
  re-enables on reject; empty draft no-op; Enter vs `submitOnEnter`; `actions`
  filter; slot `insertText`; `v-model:draft`.
- **`ChatHistory` / `ChatThread`:** item kinds rendered, tombstone, status only on
  self messages, `onLoadMore` spinner lifecycle, `mode` switching.
- **Shared scroll composables:** smoke test after the move (happy-dom can't
  measure scrolling).
- **Browser:** real scrolling and Figma match in both themes, through
  `agent-workspace-app` linked to the local SDK.

Gates: `typecheck`, `lint`, `test:unit`, `lint:package` (publint) pass.

## 10. Delivery

1. **PR 1 — `webitel-ui-sdk`:** shared composables move, `src/v2`, exports,
   locales, docs page for v2 (`docs/pages/packages/ui-chats/v2/*.md`,
   Ukrainian), tests. Published as the next `26.x` patch by CI.
2. **PR 2 — `agent-workspace-app`:** `the-chat-thread.vue` swaps `ChatContainer`
   + `mapMessagesToChatMessages` for `ChatThread`:
   - `selfMemberId` resolved from `thread.members` + the logged-in account;
   - `mode` from the task (`isIncomingChatOffer` → `awaiting`, closed →
     `readonly`);
   - `@send` / `@attach` / `@load-more` straight to the chat-session store;
   - `@seen` → `markRead`;
   - unit test and e2e updated.

v1 stays as is for `cc-workspaces`.

## 11. Open dependencies and assumptions

| Item | Status | Where it lands |
|---|---|---|
| System notice type strings + actor metadata key | WS-22, unconfirmed | `SYSTEM_NOTICES` table |
| `contact.type === 'webitel'` marks internal users in the new IM backend | assumed from v1 | `isContactCentreSide` |
| Avatar photo source | none yet | `resolveAvatarUrl` prop |
| es / kz / pl / ro / uz / vi translations | drafts | locale files |
