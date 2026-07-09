import { onUnmounted, type Ref } from 'vue';

/**
 * @author PolinaSukhorukova-webitel
 *
 * Fires the callback on every resize and disconnects itself
 * once clientHeight is unchanged twice in a row.
 */

export const useObserveHeightUntilStable = (
	chatContainer: Ref<HTMLElement | null>,
	callback: () => void,
) => {
	let observer: ResizeObserver | null = null;

	const stopObserve = () => {
		observer?.disconnect();
		observer = null;
	};

	const startObserve = () => {
		if (!chatContainer.value) return;

		let lastClientHeight = chatContainer.value.clientHeight;
		let stableCount = 0;

		observer = new ResizeObserver(() => {
			const currentClientHeight = chatContainer.value?.clientHeight;
			callback();

			if (currentClientHeight === lastClientHeight) {
				stableCount++;
				if (stableCount >= 2) stopObserve();
			} else {
				stableCount = 0;
				lastClientHeight = currentClientHeight;
			}
		});

		observer.observe(chatContainer.value);
	};

	onUnmounted(stopObserve);

	return {
		startObserve,
		stopObserve,
	};
};
