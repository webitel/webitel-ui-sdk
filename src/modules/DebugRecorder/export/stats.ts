// stats.json: volume per channel, app, event type and page load
import {
	type ChannelTally,
	type RecorderEvent,
	type StoredRecord,
	tallyChannel,
} from '../types';

export interface SessionStats {
	sid: string;
	app: string;
	first: number;
	last: number;
	records: number;
	chars: number;
}

// records written before `sid`/`type` were stored need a parse; new ones never do
export function meta(record: StoredRecord): {
	sid: string;
	type: string;
	app: string;
} {
	if (record.sid && record.type) {
		return {
			sid: record.sid,
			type: record.type,
			app: record.app ?? '?',
		};
	}
	const { sid, type, app } = JSON.parse(record.json) as RecorderEvent;
	return {
		sid,
		type,
		app: app ?? '?',
	};
}

export function buildStats(records: StoredRecord[]) {
	const byChannel: ChannelTally = {};
	const byApp: ChannelTally = {};
	const byType: Record<string, number> = {};
	const sessions = new Map<string, SessionStats>();
	let chars = 0;

	for (const record of records) {
		chars += record.n;
		tallyChannel(byChannel, record.ch, record.n);

		const { sid, type, app } = meta(record);
		tallyChannel(byApp, app, record.n);
		const typeKey = `${record.ch}/${type}`;
		byType[typeKey] = (byType[typeKey] ?? 0) + 1;

		const session = sessions.get(sid);
		if (session) {
			session.last = Math.max(session.last, record.t);
			session.records += 1;
			session.chars += record.n;
		} else {
			sessions.set(sid, {
				sid,
				app,
				first: record.t,
				last: record.t,
				records: 1,
				chars: record.n,
			});
		}
	}

	const first = records.length ? records[0].t : null;
	const last = records.length ? records[records.length - 1].t : null;
	const spanHours = first && last ? (last - first) / 3_600_000 : 0;

	return {
		records: records.length,
		chars,
		first: first && new Date(first).toISOString(),
		last: last && new Date(last).toISOString(),
		spanHours: Math.round(spanHours * 100) / 100,
		charsPerHour: spanHours > 0 ? Math.round(chars / spanHours) : null,
		byChannel,
		byApp,
		byType: Object.fromEntries(
			Object.entries(byType).sort(([, a], [, b]) => b - a),
		),
		sessions: [
			...sessions.values(),
		].map((s) => ({
			...s,
			first: new Date(s.first).toISOString(),
			last: new Date(s.last).toISOString(),
		})),
	};
}
