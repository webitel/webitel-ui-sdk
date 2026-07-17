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
	let isViewportTransition = false;
	let viewportTransitionTimer: ReturnType<typeof setTimeout> | null = null;

	const onFullscreenChange = () => {
		isViewportTransition = true;

		if (viewportTransitionTimer) clearTimeout(viewportTransitionTimer);

		viewportTransitionTimer = setTimeout(() => {
			isViewportTransition = false;
			viewportTransitionTimer = null;
		}, 500);
	};

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

			if (!isViewportTransition) callback();

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

	document.addEventListener('fullscreenchange', onFullscreenChange);

	onUnmounted(() => {
		stopObserve();
		document.removeEventListener('fullscreenchange', onFullscreenChange);
		if (viewportTransitionTimer) clearTimeout(viewportTransitionTimer);
	});

	return {
		startObserve,
		stopObserve,
	};
};
