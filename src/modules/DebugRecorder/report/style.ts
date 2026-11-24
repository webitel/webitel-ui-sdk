// report.html styles, light and dark
export const STYLE = `
:root { color-scheme: light dark; --bg: #fff; --fg: #1d1d1f; --muted: #6b6b70; --line: #e4e4e8; --soft: #f5f5f7; --bad: #c0362c; --bad-bg: #fdecea; --accent: #2a6fdb; }
@media (prefers-color-scheme: dark) { :root { --bg: #18181b; --fg: #ececf0; --muted: #9a9aa3; --line: #2e2e33; --soft: #222226; --bad: #ff7b6e; --bad-bg: #3a1f1c; --accent: #6ea2ff; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); font: 14px/1.45 system-ui, -apple-system, "Segoe UI", sans-serif; }
header, main { max-width: 1280px; margin: 0 auto; padding: 16px; }
h1 { margin: 8px 0 12px; font-size: 22px; }
h2 { margin: 28px 0 6px; font-size: 17px; }
.hint { margin: 0 0 10px; color: var(--muted); font-size: 13px; }
.count { color: var(--bad); }
dl { display: grid; grid-template-columns: max-content 1fr; gap: 4px 16px; margin: 0; }
dt { color: var(--muted); }
dd { margin: 0; overflow-wrap: anywhere; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; font-weight: 600; color: var(--muted); border-bottom: 1px solid var(--line); padding: 6px 8px; position: sticky; top: 0; background: var(--bg); }
td { border-bottom: 1px solid var(--line); padding: 4px 8px; vertical-align: top; }
#timeline td:first-child, #timeline td.load, #sessions td, .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; white-space: nowrap; }
#timeline td:last-child { overflow-wrap: anywhere; }
#timeline tbody tr.row { cursor: pointer; }
#timeline tbody tr.row:hover { background: var(--soft); }
tr.problem td { background: var(--bad-bg); }
tr.problem td:last-child { color: var(--bad); }
tr.session-start td { border-top: 2px solid var(--accent); }
.ch { display: inline-block; min-width: 64px; padding: 0 6px; border-radius: 4px; background: var(--soft); font-size: 12px; }
pre.raw { margin-top: 6px; }
pre { margin: 0;padding: 10px; background: var(--soft); border-radius: 6px; overflow: auto; max-height: 420px; font-size: 12px; white-space: pre-wrap; overflow-wrap: anywhere; }
.controls { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; margin-bottom: 8px; }
.controls label { display: inline-flex; gap: 4px; align-items: center; }
input[type=search], select { font: inherit; padding: 5px 8px; border: 1px solid var(--line); border-radius: 6px; background: var(--bg); color: var(--fg); }
input[type=search] { flex: 1 1 260px; }
#problems { padding-left: 22px; margin: 0; }
#problems li { margin: 2px 0; }
#problems a { color: var(--bad); text-decoration: none; overflow-wrap: anywhere; }
#problems a:hover { text-decoration: underline; }
button { font: inherit; margin: 12px 0; padding: 6px 14px; border-radius: 6px; border: 1px solid var(--line); background: var(--soft); color: var(--fg); cursor: pointer; }
@media (max-width: 640px) { #timeline td:first-child { white-space: normal; } dl { grid-template-columns: 1fr; } }
`;
