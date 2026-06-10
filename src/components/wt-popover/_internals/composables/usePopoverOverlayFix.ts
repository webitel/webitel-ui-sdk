import { onBeforeUnmount, onMounted, type Ref } from 'vue';

// https://github.com/primefaces/primevue/issues/8529
// When a select/multiselect overlay closes before the click event fires (single select),
// the click retargets to body and PrimeVue's outside-click closes the popover.
// Fix: on pointerdown inside a teleported overlay, suppress the popover's outside-click
// listener for one click cycle so it doesn't fire on the retargeted body click.
export const usePopoverOverlayFix = (
	innerPopover: Ref<{
		outsideClickListener?: EventListener;
	} | null>,
) => {
	const onDocumentPointerdown = (event: PointerEvent) => {
		const target = event.target as Element;
		if (!target?.closest('.p-select-overlay, .p-multiselect-overlay')) return;
		const listener = innerPopover.value?.outsideClickListener;
		if (!listener) return;
		document.removeEventListener('click', listener);
		document.addEventListener(
			'click',
			() => {
				document.addEventListener('click', listener);
			},
			{
				once: true,
				capture: false,
			},
		);
	};

	onMounted(() =>
		document.addEventListener('pointerdown', onDocumentPointerdown, true),
	);
	onBeforeUnmount(() =>
		document.removeEventListener('pointerdown', onDocumentPointerdown, true),
	);
};
