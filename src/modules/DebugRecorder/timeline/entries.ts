// records -> timeline entries: page loads numbered, HTTP starts folded into their ends
import { REQUEST_TIMEOUT_MS } from '../config';
import type { RecorderEvent, StoredRecord } from '../types';
import { describe } from './describe';
import { bad, type Data, duration, ok } from './format';

export interface TimelineEntry {
	/** index into the sorted records, to look up the full event */
	index: number;
	t: number;
	/** 1-based page-load number, in order of first appearance */
	session: number;
	sid: string;
	/** the app of the page load; `?` for records from before the store was shared */
	app: string;
	ch: string;
	type: string;
	text: string;
	problem: boolean;
}

/** records must be sorted by time; HTTP starts and SIP keep-alives are folded away */
export function timelineEntries(records: StoredRecord[]): TimelineEntry[] {
	const events = records.map((r) => JSON.parse(r.json) as RecorderEvent);
	const ended = new Set<string>();
	const sessionEnd = new Map<string, number>();
	for (const event of events) {
		sessionEnd.set(event.sid, event.t);
		if (event.ch === 'http' && !event.type.endsWith(':start')) {
			ended.add(`${event.sid}:${(event.data as Data)?.id}`);
		}
	}

	const entries: TimelineEntry[] = [];
	// tabs and apps write at the same time, so page loads interleave: number them once, by first appearance
	const sessions = new Map<string, number>();
	events.forEach((event, index) => {
		let line = describe(event);
		if (
			!line &&
			event.ch === 'http' &&
			!ended.has(`${event.sid}:${(event.data as Data)?.id}`)
		) {
			const d = event.data as Data;
			const text = `${d.method} ${d.url} → no response recorded`;
			// the page closing mid-request is not a hang
			const waited = (sessionEnd.get(event.sid) ?? event.t) - event.t;
			line =
				waited >= REQUEST_TIMEOUT_MS
					? bad(`${text} in ${duration(waited)}`)
					: ok(`${text} (page closed or export taken first)`);
		}
		if (!line) return;
		let session = sessions.get(event.sid);
		if (session === undefined) {
			session = sessions.size + 1;
			sessions.set(event.sid, session);
		}
		entries.push({
			index,
			t: event.t,
			session,
			sid: event.sid,
			app: event.app ?? records[index].app ?? '?',
			ch: event.ch,
			type: event.type,
			text: line.text,
			problem: Boolean(line.problem),
		});
	});
	return entries;
}
