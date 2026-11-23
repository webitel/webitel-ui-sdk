# 2. Client-side debug recorder: opt-in, browser-local, one store for all apps

Date: 2026-11-23

## Status

Accepted. Task: [WTEL-11037](https://webitel.atlassian.net/browse/WTEL-11037).
Module: `src/modules/DebugRecorder`, docs: `docs/pages/packages/ui-sdk/modules/DebugRecorder`.

## Context

Support investigates call and chat problems reported by operators and admins:
no audio, a call that drops, a login that never finishes, a page that freezes.
What they need is on the client: HTTP and WebSocket traffic, the SIP dialog
(JsSIP over WebSocket), WebRTC statistics, microphone and headset state, console
errors, and whether the page froze or crashed. Today it is collected by hand,
if at all.

Constraints that shaped the choice:

- **The failure is often the network or the login itself.** Whatever collects
  data must keep it locally and survive F5, a frozen tab and a crash; it must
  also work before sign-in.
- **Customer data.** Call participants, phone numbers, chat texts and tokens must
  not end up in a log. Nothing should leave the user's browser by default.
- **SIP and WebRTC level.** Generic browser tools see HTTP and console; they do
  not parse SIP frames or poll `getStats()`.
- **Many apps, one site.** Admin, Workspace, CRM, auth and the rest are separate
  Vue apps served from one origin. A user's problem often spans several of them
  (sign in → admin → flow diagram).
- **Several state-management generations, no shared logout.** Each app wired its
  own header and logout button, but all of them call the Userinfo store from this
  repo to log out.

Options compared before writing code:

| option | why not |
|---|---|
| Sentry (errors, Session Replay, Logs) | data leaves the browser by design; paid per event/replay; no SIP or `getStats()` level; replay sessions capped at 60 min |
| Grafana Faro (+ Alloy, Loki) | no offline persistence (lost on freeze/crash), needs collector infrastructure, no Vue or SIP integration |
| OpenReplay / rrweb | session replay, not network/SIP diagnostics; heavy; self-hosting cost |
| per-app copy of a recorder | a dozen apps to keep in sync; no view across apps |

## Decision

**A self-built, opt-in recorder lives in this repo as `modules/DebugRecorder`. It
writes locally, in the browser, into one store shared by every webitel app of
the origin, and hands support a zip only when the user downloads it.**

### Where and how it runs

- `installDebugRecorder({ app, version })` is called from a file imported
  **first** in the app's `main.ts`. It wraps the globals (`WebSocket`,
  `RTCPeerConnection`, `fetch`, XHR, `console`, `getUserMedia`) before the SDK
  and JsSIP open anything. The entry file imports no Vue and no SDK i18n, so the
  first import stays small.
- Importing the module does nothing by itself; it is off by default and then
  only defines `window.webitelDebug`.
- Records are serialized on the main thread and written by a **Dedicated Worker**
  into an IndexedDB ring buffer (100 000 events, 48 h). The worker also runs the
  heartbeat watchdog, so a frozen main thread is detected and recorded. If the
  worker cannot start, the same logic runs on the main thread without freeze
  detection.

### One store per origin

- Every app writes into one database (`wt-debug`). Each record carries `app`;
  the report filters and groups by it, so one archive shows the whole path.
- Several tabs and apps write at once. Every page load has a `sid` and a session
  entry with a heartbeat; a clean exit is marked synchronously in
  `localStorage` on `pagehide`, per `sid`. A page load without that mark is
  reported as dead after 15 s of silence (3 min for a hidden tab), once.
- This replaces an earlier draft that kept one store per app. That draft made
  `?debug=1` in one app useless for a problem that crossed apps, and logout in
  one app (which ends the session for all of them) left the others' data behind.

### Lifecycle through session hooks, not app wiring

- `@webitel/ui-sdk/scripts` exposes `onBeforeLogout` and `onSessionUser`. The
  Userinfo store runs them: `logoutUser()` awaits the before-logout hooks
  (time-bounded, a failing hook cannot block logout), `initialize()` reports the
  signed-in user. The recorder subscribes to both.
- Apps therefore add nothing for logout. The hook registry is kept on
  `globalThis`, because an app may load this file twice (pre-bundled in one
  dependency, served as source in another).
- A plain `eventBus` emit was rejected: it does not wait, and the redirect to
  the auth page would run before the data is deleted.

### Privacy

- Everything is sanitized **before** it is written: secret keys and parameters,
  `Authorization` and SIP auth headers, URL user info, SDP ICE passwords and SRTP
  keys are removed; phone numbers, e-mails and call participant names are
  masked; chat texts and call variables are replaced by their size. URL redaction
  fails closed: an unparseable value that looks like a secret is dropped whole.
- Records belong to a user: the one who switched recording on, or the first one
  who signs in while it records. Only that user can download them or read their
  stats; before sign-in and for another user both are refused. Records that no
  one owns yet (sign-in itself fails) stay readable, which is the case the
  recorder exists for.
- Another user signing in deletes the records and stops recording, unless the
  new user switched it on, or it was switched on before sign-in after the
  previous user was last seen. Switching recording on from off starts with an
  empty store.

### Activation

- A toggle in Admin settings, through the headless `useDebugRecorder()`
  (`modules/DebugRecorder/composables`); each app renders it with its own
  components and texts. It records for 24 h in all apps and starts in the
  current tab right away.
- `?debug=1` in any app, for when settings are unreachable (white screen, broken
  sign-in); `?debug=0` switches it off.
- A red REC chip shows while recording, with *Download archive* and
  *Stop and delete data*. Stopping it anywhere stops every open tab (`storage`
  event) and deletes the store. The chip is a Vue component mounted as its own
  small app and loaded lazily, with the SDK locales, only once recording starts;
  its language comes from `localStorage.lang`.

### The archive

`report.html` (offline, filterable timeline with likely problems on top),
`timeline.txt`, `sip.txt`, `events.ndjson` (everything, for `jq`), `stats.json`,
`manifest.json`.

## Consequences

- **Support gets the client side of a problem without new infrastructure or
  per-event cost**, but only after the user switches recording on and reproduces
  it. Problems that happened before switching on are not recorded.
- **Connections opened before recording starts are not seen.** Switching on
  mid-session covers only what opens afterwards; the UI asks to reload.
- **One origin, one archive.** The Electron app and any app on another domain
  keep their own store and produce their own archive.
- **Browser limits stay.** A page cannot see remote IP:port of HTTP requests,
  DNS/TLS failure reasons or real WebSocket close codes (mostly 1006). Media IPs
  are visible through WebRTC stats.
- **Heuristics, not guarantees, for page-load endings.** A tab frozen in the
  background for over 3 min is reported as "did not close normally" even if it
  later resumes.
- **The recorder must never break the app.** Collectors swallow their own errors;
  any new collector has to follow that rule.
- **Vite 7 dev needs two lines** (`optimizeDeps.exclude` for the module,
  `include: ['jszip']`) for the worker to load from `node_modules`; Vite 8 and
  production builds need nothing. `jszip` stays an optional peer, loaded only
  when the archive is built.
- **The chip loads Vue, its component and the SDK locales lazily**, when
  recording starts. Until then the first import carries none of them.
- **Logout cleanup depends on the Userinfo store.** An app that logs out some
  other way must call `wipeDebugRecorder()` itself.

## Enforcement

- Unit tests in `src/modules/DebugRecorder/__tests__` cover sanitizing (including
  ReDoS timing), multi-tab session reports, ownership and user change, the hooks
  (`src/scripts/__tests__/sessionHooks.spec.ts`) and the REC chip component.
- Connecting an app: the install file imported first in `main.ts`, plus the
  Vite 7 dev lines where needed. Nothing else.
