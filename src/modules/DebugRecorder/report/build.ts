// report.html: one self-contained page, no network; data embedded as JSON
import {
	clock,
	day,
	duration,
	type TimelineEntry,
	utcOffset,
} from '../timeline';
import type { StoredRecord } from '../types';
import { SCRIPT } from './script';
import { STYLE } from './style';

export interface ReportMeta {
	generatedAt: string;
	recorder: string;
	app: string;
	origin: string;
	userAgent: string;
}

export interface SessionRow {
	no: number;
	sid: string;
	app: string;
	start: string;
	end: string;
	events: number;
	problems: number;
}

export function sessionRows(entries: TimelineEntry[]): SessionRow[] {
	const rows: SessionRow[] = [];
	for (const entry of entries) {
		let row = rows[entry.session - 1];
		if (!row) {
			row = {
				no: entry.session,
				sid: entry.sid.slice(0, 8),
				app: entry.app,
				start: `${day(entry.t)} ${clock(entry.t)}`,
				end: '',
				events: 0,
				problems: 0,
			};
			rows.push(row);
		}
		row.end = clock(entry.t);
		row.events += 1;
		if (entry.problem) row.problems += 1;
	}
	return rows;
}

// `<` escaped so recorded text can never close the script tag
export const embed = (json: string) => json.replace(/</g, '\\u003c');

/** self-contained page: no network, everything renders through textContent */
export function buildReport(
	records: StoredRecord[],
	entries: TimelineEntry[],
	meta: ReportMeta,
): string {
	const first = entries[0]?.t;
	const last = entries[entries.length - 1]?.t;
	const payload = {
		meta: {
			...meta,
			timezone: utcOffset(first ?? Date.now()),
			span:
				first && last
					? `${day(first)} ${clock(first)} – ${day(last)} ${clock(last)} (${duration(last - first)})`
					: '—',
			records: records.length,
		},
		sessions: sessionRows(entries),
		rows: entries.map((e) => [
			`${day(e.t)} ${clock(e.t)}`,
			e.session,
			e.ch,
			e.type,
			e.text,
			e.problem ? 1 : 0,
			e.index,
			e.app,
		]),
	};
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">
<title>Webitel debug report</title>
<style>${STYLE}</style>
</head>
<body>
<header>
	<h1>Webitel debug report</h1>
	<dl id="meta"></dl>
</header>
<main>
	<section>
		<h2>Page loads</h2>
		<p class="hint">A new page load starts after every F5, crash, reopened tab and in every open tab. All webitel apps of this site write into one archive, so moving from one app to another shows up here as a new page load of the other app.</p>
		<table id="sessions"><thead><tr><th>#</th><th>App</th><th>Started</th><th>Last event</th><th>Events</th><th>Problems</th></tr></thead><tbody></tbody></table>
	</section>
	<section>
		<h2>Likely problems <span id="problem-count" class="count"></span></h2>
		<ol id="problems"></ol>
	</section>
	<section>
		<h2>Timeline</h2>
		<p class="hint">Click a row for the full recorded data. Times are the recording machine's local time.</p>
		<div class="controls">
			<input id="search" type="search" placeholder="Filter text, e.g. INVITE, 401, pc#1">
			<select id="app"><option value="">All apps</option></select>
			<select id="session"><option value="">All page loads</option></select>
			<label><input id="only-problems" type="checkbox"> Problems only</label>
		</div>
		<div id="channels" class="controls"></div>
		<p id="shown" class="hint"></p>
		<table id="timeline"><thead><tr><th>Time</th><th>Page load</th><th>Channel</th><th>Event</th></tr></thead><tbody></tbody></table>
		<button id="more" type="button" hidden>Show more</button>
	</section>
</main>
<script type="application/json" id="report-data">${embed(JSON.stringify(payload))}</script>
<script type="application/json" id="event-data">${embed(`[${records.map((r) => r.json).join(',')}]`)}</script>
<script>${SCRIPT}</script>
</body>
</html>
`;
}
