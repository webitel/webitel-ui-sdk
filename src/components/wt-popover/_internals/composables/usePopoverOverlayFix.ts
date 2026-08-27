import { onBeforeUnmount, onMounted, type Ref } from 'vue';

// https://github.com/primefaces/primevue/issues/8529
// When a select/multiselect overlay closes before the click event fires (single select),
// the click retargets to body and PrimeVue's outside-click closes the popover.
// Fix: on pointerdown inside a teleported overlay, suppress the popover's outside-click
// listener for one click cycle so it doesn't fire on the retargeted body click.
//
/*
 * @author @Oleksandr Palonnyi
 *
 * Additionally: vidstack's media-button calls stopPropagation() on click events to prevent
 * the media player from intercepting them. This stops PrimeVue's bubble-phase document click
 * listener from ever firing, so any popover inside a media-button stays open when the user
 * clicks outside. A capture-phase pointerdown listener on document fires top-down before any
 * element handler runs, so stopPropagation on click cannot affect it.
 *
 * [WTEL-9770](https://webitel.atlassian.net/browse/WTEL-9770)
 */
export const usePopoverOverlayFix = (
	innerPopover: Ref<{
		outsideClickListener?: EventListener;
		visible?: boolean;
		container?: HTMLElement | null;
		hide?: () => void;
	} | null>,
	wrapperElement: Ref<HTMLElement | null>,
) => {
	const onDocumentPointerdown = (event: PointerEvent) => {
		const target = event.target as Element;

		if (
			target?.closest(
				'.p-select-overlay, .p-multiselect-overlay, .p-datepicker-panel, .p-popover',
			) ||
			wrapperElement.value?.contains(target)
		) {
			const outsideClickListener = innerPopover.value?.outsideClickListener;
			if (!outsideClickListener) return;
			document.removeEventListener('click', outsideClickListener);
			document.addEventListener(
				'click',
				() => {
					setTimeout(() => {
						const listenerToRestore = innerPopover.value?.outsideClickListener;
						if (listenerToRestore) {
							document.addEventListener('click', listenerToRestore);
						}
					}, 0);
				},
				{
					once: true,
					capture: true,
				},
			);
			return;
		}

		if (!innerPopover.value?.visible) return;
		if (!innerPopover.value.container) return;
		if (innerPopover.value.container.contains(target)) return;
		if (wrapperElement.value?.contains(target)) return;

		// @author @HlukhovYe
		//
		// https://webitel.atlassian.net/browse/WTEL-10240
		//
		// A click fully outside the popover can also be the same click that closes an
		// open select/multiselect/datepicker overlay belonging to a field inside this
		// popover. Those overlays are teleported to `body` as DOM siblings, so they can't
		// be detected via containment — but the field they belong to keeps focus while
		// its overlay is open, so check focus instead: if focus is still inside this
		// popover (either the popover's own container, e.g. a select/datepicker trigger,
		// or the open overlay panel itself, e.g. a multiselect's in-panel filter input)
		// and a PrimeVue overlay panel is currently open, let that overlay's own
		// outside-click handler close it and leave this popover open.
		const openFieldOverlay = document.querySelector(
			'.p-select-overlay, .p-multiselect-overlay, .p-datepicker-panel',
		);
		const hasOwnOpenFieldOverlay =
			openFieldOverlay &&
			(innerPopover.value.container.contains(document.activeElement) ||
				openFieldOverlay.contains(document.activeElement));
		if (hasOwnOpenFieldOverlay) return;

		innerPopover.value.hide?.();
	};

	onMounted(() =>
		document.addEventListener('pointerdown', onDocumentPointerdown, true),
	);
	onBeforeUnmount(() =>
		document.removeEventListener('pointerdown', onDocumentPointerdown, true),
	);
};
