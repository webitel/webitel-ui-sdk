// sip.txt: SIP signalling as plain text
import type { RecorderEvent, StoredRecord } from '../types';

/** only SIP records are parsed, once each */
export function buildSipText(records: StoredRecord[]): string {
	const lines: string[] = [];
	for (const record of records) {
		if (record.ch !== 'sip') continue;
		const event = JSON.parse(record.json) as RecorderEvent & {
			data: {
				id?: number;
				text?: string;
				keepAlive?: boolean;
			};
		};
		const time = new Date(event.t).toISOString();
		const { data } = event;
		if (data.keepAlive) continue;
		if (event.type === 'ws:out' || event.type === 'ws:in') {
			const arrow = event.type === 'ws:out' ? '>>> sent' : '<<< received';
			lines.push(`${time} ${arrow} (ws#${data.id})\n${data.text ?? ''}\n`);
		} else {
			lines.push(
				`${time} --- ${event.type} (ws#${data.id}) ${JSON.stringify(data)}\n`,
			);
		}
	}
	return lines.join('\n');
}
