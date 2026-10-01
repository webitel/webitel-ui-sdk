import { onUnmounted, type Ref } from 'vue';

/**
 * @author PolinaSukhorukova-webitel
 *
 * Fires the callback on every resize of the target element and stops
 * either after the given timeout or on unmount.
 */

export const useObserveHeightUntilStable = (
	target: Ref<HTMLElement | null>,
	callback: () => void,
	timeout?: number,
) => {
	let observer: ResizeObserver | null = null;
	let stopTimer: ReturnType<typeof setTimeout> | null = null;
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

		if (stopTimer) {
			clearTimeout(stopTimer);
			stopTimer = null;
		}
	};

	const startObserve = () => {
		if (!target.value) return;

		observer = new ResizeObserver(() => {
			if (!isViewportTransition) callback();
		});

		observer.observe(target.value);

		if (timeout !== undefined) {
			stopTimer = setTimeout(stopObserve, timeout);
		}
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
