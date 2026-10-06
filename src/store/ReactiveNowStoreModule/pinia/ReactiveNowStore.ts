import { defineStore } from 'pinia';
import { ref } from 'vue';

export const createReactiveNowStore = () => {
	const namespace = 'now';

	const store = defineStore(namespace, () => {
		const now = ref(Date.now());
		let interval: ReturnType<typeof setInterval> | null = null;

		const startWatcher = () => {
			if (interval) return;
			interval = setInterval(() => {
				now.value = Date.now();
			}, 1000);
		};

		const stopWatcher = () => {
			if (interval) clearInterval(interval);
			interval = null;
		};

		return {
			now,
			startWatcher,
			stopWatcher,
		};
	});

	return store;
};
