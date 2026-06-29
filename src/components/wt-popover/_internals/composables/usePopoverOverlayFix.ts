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

		if (target?.closest('.p-select-overlay, .p-multiselect-overlay')) {
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
		innerPopover.value.hide?.();
	};

	onMounted(() =>
		document.addEventListener('pointerdown', onDocumentPointerdown, true),
	);
	onBeforeUnmount(() =>
		document.removeEventListener('pointerdown', onDocumentPointerdown, true),
	);
};
