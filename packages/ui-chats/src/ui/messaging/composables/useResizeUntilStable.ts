import { onUnmounted, type Ref } from 'vue';

export const useResizeUntilStable = (
	element: Ref<HTMLElement | null>,
	onResize: () => void,
) => {
	let observer: ResizeObserver | null = null;

	const stop = () => {
		observer?.disconnect();
		observer = null;
	};

	const start = () => {
		if (!element.value) return;

		let lastClientHeight = element.value.clientHeight;
		let stableCount = 0;

		observer = new ResizeObserver(() => {
			const currentClientHeight = element.value?.clientHeight;
			onResize();

			if (currentClientHeight === lastClientHeight) {
				stableCount++;
				// height is stable twice in a row — the layout has settled
				if (stableCount >= 2) stop();
			} else {
				stableCount = 0;
				lastClientHeight = currentClientHeight;
			}
		});

		observer.observe(element.value);
	};

	onUnmounted(stop);

	return {
		start,
		stop,
	};
};
