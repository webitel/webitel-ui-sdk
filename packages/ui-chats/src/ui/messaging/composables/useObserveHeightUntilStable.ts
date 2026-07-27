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
		}, 1000);
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

	/**
	 * @author PolinaSukhorukova-webitel
	 *
	 * WTEL-9968 (https://webitel.atlassian.net/browse/WTEL-9968)
	 * to avoid extra bottom scroll when chat is in fullscreen
	 */
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
