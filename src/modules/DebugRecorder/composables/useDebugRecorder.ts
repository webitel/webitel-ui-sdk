import { onBeforeUnmount, onMounted, ref } from 'vue';

import { STORAGE } from '../config';

const REFRESH_INTERVAL_MS = 5_000;

/**
 * State and actions of the debug recorder for a settings UI. Headless: each app
 * renders it with its own components and texts. Needs `installDebugRecorder()`
 * to have run in the app; otherwise `available` stays false.
 */
export function useDebugRecorder() {
	const available = ref(false);
	const recording = ref(false);
	const enabledUntil = ref<number | null>(null);
	/** recording stopped by itself; its archive can still be downloaded or deleted */
	const archived = ref(false);
	const records = ref<number | null>(null);
	const since = ref<number | null>(null);
	const busy = ref(false);

	const refresh = async () => {
		const api = window.webitelDebug;
		available.value = Boolean(api);
		if (!api) return;
		recording.value = api.recording;
		// `?? null`: an older SDK copy has no `enabledUntil`
		enabledUntil.value = api.enabledUntil ?? null;
		archived.value = api.archived ?? false;
		const stats = await api.stats().catch(() => null);
		records.value = stats?.records ?? null;
		since.value = stats?.firstT ?? null;
	};

	const run = async (action: () => unknown) => {
		if (busy.value) return;
		busy.value = true;
		try {
			await action();
		} finally {
			busy.value = false;
			await refresh();
		}
	};

	/** on: records in every app for 1 h, starting in this tab right away; off: stops and deletes everything */
	const setRecording = (on: boolean) =>
		run(() =>
			on ? window.webitelDebug?.enable() : window.webitelDebug?.disable(),
		);

	const download = () => run(() => window.webitelDebug?.download());

	/** deletes everything recorded: the archive of a stopped recording, or a live one with it */
	const deleteData = () => run(() => window.webitelDebug?.disable());

	// another tab switched it on or off, or deleted the archive
	const onStorage = (event: StorageEvent) => {
		if (event.key === STORAGE.enabled || event.key === STORAGE.hasData) {
			void refresh();
		}
	};
	let timer: ReturnType<typeof setInterval> | null = null;

	onMounted(() => {
		void refresh();
		timer = setInterval(() => void refresh(), REFRESH_INTERVAL_MS);
		window.addEventListener('storage', onStorage);
	});
	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
		window.removeEventListener('storage', onStorage);
	});

	return {
		available,
		recording,
		enabledUntil,
		archived,
		records,
		since,
		busy,
		refresh,
		setRecording,
		download,
		deleteData,
	};
}
