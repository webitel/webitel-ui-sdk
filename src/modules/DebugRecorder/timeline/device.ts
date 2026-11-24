// microphone/camera permissions, devices, getUserMedia and tracks as one timeline line
import { bad, compact, type Data, errorText, type Line, ok } from './format';

export function track(t?: Data): string {
	if (!t) return '';
	return `${t.kind} "${t.label || '?'}" ${t.readyState}${t.muted ? ' muted' : ''}${t.enabled === false ? ' disabled' : ''}`;
}

export function device(type: string, d: Data): Line {
	switch (type) {
		case 'devices': {
			const list = (d.devices as Data[] | undefined) ?? [];
			const byKind = (kind: string) => list.filter((x) => x.kind === kind);
			const names = (kind: string) =>
				byKind(kind)
					.map((x) => `"${x.label || '?'}"`)
					.join(', ');
			return ok(
				`devices (${d.reason}) · mics ${byKind('audioinput').length}: ${names('audioinput') || '—'} · speakers ${byKind('audiooutput').length}: ${names('audiooutput') || '—'} · cameras ${byKind('videoinput').length}`,
			);
		}
		case 'devices-error':
			return bad(`device list failed · ${errorText(d.error)}`);
		case 'permission': {
			const text = `${d.name} permission: ${d.state}${d.changed ? ' (changed)' : ''}`;
			return d.state === 'denied' ? bad(text) : ok(text);
		}
		case 'getUserMedia':
			return ok(`getUserMedia ${compact(d.constraints, 200)}`);
		case 'getUserMedia:ok':
			return ok(
				`getUserMedia ok · ${((d.tracks as Data[] | undefined) ?? []).map(track).join(', ')}`,
			);
		case 'getUserMedia:fail':
			return bad(
				`getUserMedia failed · ${d.name}: ${d.message}${d.constraint ? ` (${d.constraint})` : ''}`,
			);
		case 'unavailable':
			return bad(
				`mediaDevices unavailable · secure context: ${d.secureContext}`,
			);
	}
	if (type.startsWith('track:')) {
		const event = type.slice('track:'.length);
		const text = `track ${event} · ${track(d)}`;
		return event === 'mute' ? bad(text) : ok(text);
	}
	return ok(`${type} ${compact(d)}`);
}
