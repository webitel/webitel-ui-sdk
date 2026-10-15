// [Claude] Reload on a stale chunk after a new deploy invalidates old asset hashes.
// Vite fires this on any failed lazy chunk/CSS load: routes and async components alike.
// https://vite.dev/guide/build#load-error-handling
// https://webitel.atlassian.net/browse/WTEL-10598

import i18n from '../locale/i18n.js';
import eventBus from './eventBus.js';

const LAST_RELOAD_KEY = 'stale-chunk-reload-at';
const RELOAD_COOLDOWN_MS = 10_000;

const notifyChunkLoadError = () => {
	// [Claude] lib i18n doesn't follow app locale, so take it from storage
	const locale = localStorage.getItem('lang') || i18n.global.locale.value;
	eventBus.$emit('notification', {
		type: 'error',
		text: i18n.global.t(
			'errorNotifications.chunkLoadError',
			{},
			{
				locale,
			},
		),
	});
};

export const reloadOnStaleChunk = () => {
	window.addEventListener('vite:preloadError', (event) => {
		// [Claude] skip if just reloaded – chunk is really broken, avoid a reload loop
		const lastReloadAt = Number(sessionStorage.getItem(LAST_RELOAD_KEY));
		if (Date.now() - lastReloadAt < RELOAD_COOLDOWN_MS) {
			notifyChunkLoadError();
			return;
		}

		sessionStorage.setItem(LAST_RELOAD_KEY, String(Date.now()));
		event.preventDefault();
		window.location.reload();
	});
};
