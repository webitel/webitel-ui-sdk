import type { App, Component } from 'vue';

import { originalConsole } from './collectors/console';
import type { IndicatorActions } from './components/debug-recorder-indicator.vue';

export type { IndicatorActions };

const PREFIX = '[debug-recorder]';

/** where the chip's texts live in the SDK locales */
export const DEBUG_RECORDER_LOCALE_KEY = 'webitelUI.debugRecorder';

// browsers say `kk` for Kazakh, webitel's locale is `kz`
const LOCALE_ALIASES: Record<string, string> = {
	kk: 'kz',
};

/**
 * The SDK i18n does not follow the app's locale: take the one every webitel app
 * keeps in `localStorage.lang` (like reloadOnStaleChunk); before an app stored
 * one (sign-in page, first visit), the page's and the browser's languages.
 */
export function pickLocale(available: readonly string[]): string {
	let stored: string | null = null;
	try {
		stored = localStorage.getItem('lang');
	} catch {
		// storage blocked
	}
	const candidates = [
		stored,
		document.documentElement.lang,
		...(navigator.languages ?? [
			navigator.language,
		]),
	];
	for (const candidate of candidates) {
		if (!candidate) continue;
		const base = candidate.toLowerCase().split('-')[0];
		const locale = LOCALE_ALIASES[base] ?? base;
		if (available.includes(locale)) return locale;
	}
	return 'en';
}

function bodyReady(): Promise<void> {
	if (document.body) return Promise.resolve();
	return new Promise((resolve) =>
		document.addEventListener('DOMContentLoaded', () => resolve(), {
			once: true,
		}),
	);
}

// the chip is its own small Vue app: the recorder runs before, and apart from, the app's one
async function createRecorderApp(
	component: Component,
	props: Record<string, unknown>,
): Promise<App> {
	const [
		{ createApp },
		{ default: i18n },
		{ default: initPrimevue },
		{ default: WtLoader },
		{ default: WtIconBtn },
	] = await Promise.all([
		import('vue'),
		import('../../locale/i18n'),
		import('../../plugins/primevue/primevue.plugin'),
		// wt-button and wt-chip resolve these globally
		import('../../components/wt-loader/wt-loader.vue'),
		import('../../components/wt-icon-btn/wt-icon-btn.vue'),
	]);
	i18n.global.locale.value = pickLocale(
		i18n.global.availableLocales,
	) as typeof i18n.global.locale.value;
	const app = createApp(component, props);
	app.use(i18n);
	initPrimevue(app);
	app.component('WtLoader', WtLoader);
	app.component('WtIconBtn', WtIconBtn);
	return app;
}

// Vue, the components, PrimeVue and the SDK locales load only once recording starts, so the app's first import stays small
async function mountLazily(
	load: () => Promise<{
		default: Component;
	}>,
	props: Record<string, unknown>,
): Promise<() => void> {
	const { default: component } = await load();
	const app = await createRecorderApp(component, props);
	await bodyReady();
	const host = document.createElement('div');
	document.body.appendChild(host);
	app.mount(host);
	return () => {
		app.unmount();
		host.remove();
	};
}

/** red REC chip in the corner, with a panel to download the archive or stop and delete the data; returns hide() */
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

/** short-lived note in the chip's corner, e.g. after the recording was stopped; `textKey` is under DEBUG_RECORDER_LOCALE_KEY */
export function flash(textKey: string, ms = 4_000): void {
	mountLazily(() => import('./components/debug-recorder-note.vue'), {
		textKey,
	})
		.then((unmount) => setTimeout(unmount, ms))
		.catch(() => {});
}
