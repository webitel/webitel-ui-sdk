// timeline.txt: likely problems on top, then every entry grouped by page load
import type { TimelineEntry } from './entries';
import { clock, day, duration, utcOffset } from './format';

export const QUIET_GAP_MS = 60_000;

export const MAX_PROBLEMS = 100;

/** one line per event, grouped by page load; problems are marked with `!` and repeated at the top */
export function buildTimeline(entries: TimelineEntry[]): string {
	const body: string[] = [];
	const problems: string[] = [];
	const started = new Set<number>();
	const appWidth = Math.max(3, ...entries.map((e) => e.app.length));
	let previousT = 0;
	let currentDay = '';
	for (const entry of entries) {
		if (day(entry.t) !== currentDay) {
			currentDay = day(entry.t);
			body.push('', `─── ${currentDay} ───`);
		}
		if (!started.has(entry.session)) {
			started.add(entry.session);
			body.push(
				'',
				`══════ Page load #${entry.session} · ${entry.app} · ${clock(entry.t)} · session ${entry.sid.slice(0, 8)} ══════`,
			);
		} else if (entry.t - previousT >= QUIET_GAP_MS) {
			body.push(
				`              ··· ${duration(entry.t - previousT)} without events ···`,
			);
		}
		previousT = entry.t;

		const where = `#${entry.session}`.padEnd(4);
		const row = `${clock(entry.t)} ${entry.problem ? '!' : ' '} ${where} ${entry.app.padEnd(appWidth)} ${entry.ch.padEnd(9)} ${entry.text}`;
		body.push(row);
		if (entry.problem) problems.push(`${day(entry.t)} ${row}`);
	}

	const first = entries[0]?.t ?? Date.now();
	const header = [
		'Webitel debug timeline',
		`Times are local (${utcOffset(first)}). "!" marks a likely problem. Every line has its full data in events.ndjson.`,
		'HTTP requests show once, when they finish. SIP keep-alives are left out.',
		'Each row: time, "!", page load (#N; a new one after every reload or in every tab), app, channel, event.',
		'',
		problems.length
			? `Likely problems (${problems.length}):`
			: 'No likely problems found.',
		...problems.slice(0, MAX_PROBLEMS).map((p) => `  ${p}`),
		...(problems.length > MAX_PROBLEMS
			? [
					`  … and ${problems.length - MAX_PROBLEMS} more below`,
				]
			: []),
	];
	return `${[
		...header,
		...body,
	].join('\n')}\n`;
}
