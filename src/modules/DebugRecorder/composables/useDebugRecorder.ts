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
	const records = ref<number | null>(null);
	const since = ref<number | null>(null);
	const busy = ref(false);

	const refresh = async () => {
		const api = window.webitelDebug;
		available.value = Boolean(api);
		if (!api) return;
		recording.value = api.recording;
		enabledUntil.value = api.enabledUntil;
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

	/** on: records in every app for 24 h, starting in this tab right away; off: stops and deletes everything */
	const setRecording = (on: boolean) =>
		run(() =>
			on ? window.webitelDebug?.enable() : window.webitelDebug?.disable(),
		);

	const download = () => run(() => window.webitelDebug?.download());

	// another tab switched it on or off
	const onStorage = (event: StorageEvent) => {
		if (event.key === STORAGE.enabled) void refresh();
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
		records,
		since,
		busy,
		refresh,
		setRecording,
		download,
	};
}
