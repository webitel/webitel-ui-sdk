import type { Component } from 'vue';

import { originalConsole } from './collectors/console';
import type { IndicatorActions } from './components/debug-recorder-indicator.vue';
import type { DebugRecorderText } from './i18n';

export type { IndicatorActions };

const PREFIX = '[debug-recorder]';

function bodyReady(): Promise<void> {
	if (document.body) return Promise.resolve();
	return new Promise((resolve) =>
		document.addEventListener('DOMContentLoaded', () => resolve(), {
			once: true,
		}),
	);
}

// Vue, the components and the SDK locales load only once recording starts, so the first import of the app stays small
async function mountLazily(
	load: () => Promise<{
		default: Component;
	}>,
	props: Record<string, unknown>,
): Promise<() => void> {
	const [{ createApp }, { default: component }] = await Promise.all([
		import('vue'),
		load(),
	]);
	await bodyReady();
	const host = document.createElement('div');
	document.body.appendChild(host);
	const app = createApp(component, props);
	app.mount(host);
	return () => {
		app.unmount();
		host.remove();
	};
}

/** red REC chip in the corner, with a menu to download the archive or stop and delete the data; returns hide() */
export function showIndicator(actions: IndicatorActions): () => void {
	let hide: (() => void) | null = null;
	let hidden = false;
	mountLazily(() => import('./components/debug-recorder-indicator.vue'), {
		actions,
	})
		.then((unmount) => {
			if (hidden) unmount();
			else hide = unmount;
		})
		.catch((err) => originalConsole.warn(PREFIX, 'REC chip failed', err));
	return () => {
		hidden = true;
		hide?.();
	};
}

/** short-lived note in the chip's corner, e.g. after the recording was stopped */
export function flash(textKey: DebugRecorderText, ms = 4_000): void {
	mountLazily(() => import('./components/debug-recorder-note.vue'), {
		textKey,
	})
		.then((unmount) => setTimeout(unmount, ms))
		.catch(() => {});
}
