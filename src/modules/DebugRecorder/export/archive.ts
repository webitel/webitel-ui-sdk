// the zip support gets: report, timeline, SIP, raw events, stats
import { RECORDER_VERSION } from '../config';
import { buildReport } from '../report';
import { buildTimeline, timelineEntries } from '../timeline';
import type { RecorderApp, StoredRecord } from '../types';
import { README } from './readme';
import { buildSipText } from './sip';
import { buildStats } from './stats';

export type JsZipClass = typeof import('jszip');

// CommonJS package: usable only through the bundler's interop
export async function loadJsZip(): Promise<JsZipClass> {
	const mod = (await import('jszip')) as unknown as {
		default?: JsZipClass;
	} & JsZipClass;
	const candidate = mod.default ?? mod;
	if (typeof candidate !== 'function') {
		throw new Error(
			'jszip could not be loaded: install it in the app (npm i jszip)',
		);
	}
	return candidate;
}

/** sorts, packs into a zip and triggers a browser download */
export async function downloadArchive(
	records: StoredRecord[],
	currentSid: string | null,
	app: RecorderApp,
): Promise<void> {
	const JSZip = await loadJsZip();
	const sorted = [
		...records,
	].sort((a, b) => a.t - b.t);
	const generatedAt = new Date();
	const manifest = {
		generatedAt: generatedAt.toISOString(),
		recorder: RECORDER_VERSION,
		exportedFrom: app.name,
		appVersion: app.version,
		origin: location.origin,
		userAgent: navigator.userAgent,
		currentSession: currentSid,
	};
	const entries = timelineEntries(sorted);

	const zip = new JSZip();
	zip.file('README.txt', README);
	zip.file('manifest.json', JSON.stringify(manifest, null, 2));
	zip.file(
		'report.html',
		buildReport(sorted, entries, {
			...manifest,
			app: app.version ? `${app.name} ${app.version}` : app.name,
		}),
	);
	zip.file('timeline.txt', buildTimeline(entries));
	zip.file('stats.json', JSON.stringify(buildStats(sorted), null, 2));
	zip.file('events.ndjson', sorted.map((r) => r.json).join('\n'));
	zip.file('sip.txt', buildSipText(sorted));

	const blob = await zip.generateAsync({
		type: 'blob',
		compression: 'DEFLATE',
		compressionOptions: {
			level: 6,
		},
	});
	const stamp = generatedAt.toISOString().replace(/[:.]/g, '-').slice(0, 19);
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `webitel-debug-${stamp}.zip`;
	document.body.appendChild(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
