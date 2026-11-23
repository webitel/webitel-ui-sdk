// the recorder's own events: start, how earlier page loads ended, main-thread freezes
import {
	bad,
	clock,
	compact,
	type Data,
	duration,
	type Line,
	ok,
} from './format';

export function recorder(type: string, d: Data): Line {
	switch (type) {
		case 'start': {
			const failed = (d.failedCollectors as string[] | undefined) ?? [];
			const text = `recording started · ${d.worker ? 'worker' : 'inline storage'}`;
			return failed.length
				? bad(`${text} · failed collectors: ${failed.join(', ')}`)
				: ok(text);
		}
		case 'previous-session': {
			const which = `page load ${String(d.sid ?? '').slice(0, 8)}${d.app ? ` (${d.app})` : ''}`;
			if (d.cleanExit) return ok(`${which} closed normally`);
			const last = d.lastHeartbeat
				? ` · last sign of life ${clock(Number(d.lastHeartbeat))}`
				: '';
			const frozen = d.stallSince
				? ` · frozen since ${clock(Number(d.stallSince))}`
				: '';
			return bad(
				`${which} did NOT close normally (crash, kill or frozen tab)${last}${frozen}`,
			);
		}
		case 'main-thread-stall-start':
			return bad(`page frozen · no heartbeat for ${duration(Number(d.gapMs))}`);
		case 'main-thread-stall-end':
			return bad(`page unfrozen after ${duration(Number(d.durationMs))}`);
	}
	return ok(`${type} ${compact(d)}`);
}
