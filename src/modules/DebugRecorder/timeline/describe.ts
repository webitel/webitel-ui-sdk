// one recorded event -> one human-readable line, or null to leave it out
import type { RecorderEvent } from '../types';
import { device } from './device';
import {
	bad,
	clip,
	compact,
	type Data,
	duration,
	errorText,
	type Line,
	ok,
} from './format';
import { http, socket } from './network';
import { recorder } from './recorder';
import { webrtc } from './webrtc';

export function describe(event: RecorderEvent): Line | null {
	const d = (event.data ?? {}) as Data;
	switch (event.ch) {
		case 'console': {
			const args = ((d.args as unknown[] | undefined) ?? [])
				.map((a) => compact(a, 200))
				.join(' ');
			const text = `${event.type.padEnd(5)} ${clip(args)}`;
			return event.type === 'error' ? bad(text) : ok(text);
		}
		case 'error':
			switch (event.type) {
				case 'resource':
					return bad(`failed to load <${d.tag}> ${d.url}`);
				case 'uncaught':
					return bad(
						`uncaught ${errorText(d.error ?? d.message)}${d.source ? ` · at ${d.source}:${d.line}:${d.column}` : ''}`,
					);
				case 'unhandledrejection':
					return bad(`unhandled promise rejection · ${errorText(d.reason)}`);
				case 'csp':
					return bad(`CSP blocked ${d.blocked} (${d.directive})`);
				default:
					return bad(`${event.type} ${compact(d)}`);
			}
		case 'http':
			return http(event.type, d);
		case 'ws':
		case 'sip':
			return socket(event.ch, event.type, d);
		case 'webrtc':
			return webrtc(event.type, d);
		case 'device':
			return device(event.type, d);
		case 'env':
			if (event.type === 'snapshot') {
				return ok(
					`${d.app}${d.appVersion ? ` ${d.appVersion}` : ''} · recorder ${d.recorder} · ${d.origin}${d.path} · electron: ${d.electron ? 'yes' : 'no'} · ${d.userAgent}`,
				);
			}
			return ok(`${event.type} ${compact(d)}`);
		case 'lifecycle':
			switch (event.type) {
				case 'offline':
					return bad('browser went offline');
				case 'online':
					return ok('browser back online');
				case 'visibility':
					return ok(`tab ${d.state}`);
				case 'pagehide':
				case 'pageshow':
					return ok(
						`${event.type}${d.persisted ? ' (back/forward cache)' : ''}`,
					);
				default:
					return ok(event.type);
			}
		case 'perf': {
			const scripts = ((d.scripts as Data[] | undefined) ?? []).map((s) =>
				`${s.fn || '?'} ${s.source ?? ''} ${s.durationMs} ms`.trim(),
			);
			const text = `long frame ${duration(Number(d.durationMs))} · blocking ${duration(Number(d.blockingMs))}${scripts.length ? ` · ${scripts.join('; ')}` : ''}`;
			return Number(d.durationMs) >= 1_000 ? bad(text) : ok(text);
		}
		case 'recorder':
			return recorder(event.type, d);
		default:
			return ok(`${event.type} ${compact(d)}`);
	}
}
