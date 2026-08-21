import { onUnmounted } from 'vue';

/**
 * @author @HlukhovYe
 *
 * https://webitel.atlassian.net/browse/WTEL-10175
 *
 * PrimeVue's DatePicker only closes its overlay on window resize or on scroll
 * of the input's scrollable ancestors — it has no way to notice the input
 * itself disappearing (e.g. a tab switch, a `v-if`, or a collapsing parent
 * that doesn't fire scroll/resize). When that happens the overlay is left
 * open and detached from its anchor.
 *
 * Watches the datepicker's root element with an IntersectionObserver, which
 * also fires when the element is hidden via `display: none` or detached from
 * the layout, and force-closes the overlay when that happens.
 */
export function useCloseOnAnchorHidden(
	getAnchor: () => HTMLElement | null,
	getDatepicker: () => {
		overlayVisible?: boolean;
	} | null,
) {
	let observer: IntersectionObserver | null = null;

	function watch() {
		unwatch();
		const anchor = getAnchor();
		if (!anchor) return;

		observer = new IntersectionObserver((entries) => {
			const isHidden = entries.some((entry) => !entry.isIntersecting);
			if (!isHidden) return;
			const datepicker = getDatepicker();
			if (datepicker) datepicker.overlayVisible = false;
		});
		observer.observe(anchor);
	}

	function unwatch() {
		observer?.disconnect();
		observer = null;
	}

	onUnmounted(unwatch);

	return {
		watch,
		unwatch,
	};
}
