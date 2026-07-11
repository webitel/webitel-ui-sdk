import { onUnmounted } from 'vue';

// Prevents PrimeVue's currentView watcher from:
// - widening the overlay when switching to the month/year grid
// - flipping the overlay between above/below the input when panel height changes
export function useOverlayAnchor() {
	let observer: MutationObserver | null = null;

	// https://webitel.atlassian.net/browse/WTEL-9906
	function lockWidth(panel: HTMLElement, lockedWidth: string) {
		if (panel.style.width !== lockedWidth) {
			panel.style.width = lockedWidth;
			panel.style.minWidth = '';
		}
	}

	// https://webitel.atlassian.net/browse/WTEL-9860?focusedCommentId=766440
	function lockSide(panel: HTMLElement, lockedSide: string, lockedTop: string) {
		if (panel.style.transformOrigin !== lockedSide) {
			panel.style.transformOrigin = lockedSide;
			panel.style.top = lockedTop;
		}
	}

	function lock(panel: HTMLElement) {
		observer?.disconnect();

		const lockedWidth = panel.style.width;
		const lockedSide = panel.style.transformOrigin; // 'top' = below input, 'bottom' = above
		const lockedTop = panel.style.top;

		observer = new MutationObserver(() => {
			lockWidth(panel, lockedWidth);
			lockSide(panel, lockedSide, lockedTop);
		});

		observer.observe(panel, {
			attributes: true,
			attributeFilter: [
				'style',
			],
		});
	}

	function unlock() {
		observer?.disconnect();
		observer = null;
	}

	onUnmounted(unlock);

	return {
		lock,
		unlock,
	};
}
