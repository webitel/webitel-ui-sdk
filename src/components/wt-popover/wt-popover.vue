<template>
  <div>
    <slot name="activator" v-bind="{ show, toggle, hide }" />

    <p-popover
      ref="innerPopover"
      v-bind="attrs"
      :append-to="appendTo"
      :base-z-index="baseZIndex"
      :auto-z-index="autoZIndex"
      :breakpoints="breakpoints"
      :dt="dt"
      :pt="pt"
      :pt-options="ptOptions"
      :close-on-escape="closeOnEscape"
      :unstyled="unstyled"
      v-on="attrs"
    >
      <slot name="default" v-bind="{ hide, toggle }" />
    </p-popover>
  </div>
</template>

<script setup lang="ts">
import type { PopoverEmitsOptions, PopoverProps } from 'primevue';
import {
	defineExpose,
	onBeforeUnmount,
	onMounted,
	useAttrs,
	useTemplateRef,
} from 'vue';

interface Props extends PopoverProps {
	disabled?: boolean;
}

const attrs = useAttrs();
const innerPopover = useTemplateRef('innerPopover');
const props = withDefaults(defineProps<Props>(), {
	appendTo: 'body',
	baseZIndex: 0,
	autoZIndex: true,
	breakpoints: null,
	dt: null,
	pt: null,
	ptOptions: null,
	closeOnEscape: true,
	unstyled: false,
	disabled: false,
});
defineEmits<PopoverEmitsOptions>();

// When a select/multiselect overlay closes before the click event fires (single select),
// the click retargets to body and PrimeVue's outside-click closes the popover.
// Fix: on pointerdown inside a teleported overlay, suppress the next outside-click check.
const onDocumentPointerdown = (event: PointerEvent) => {
	const target = event.target as Element;
	if (!target?.closest('.p-select-overlay, .p-multiselect-overlay')) return;
	const listener = innerPopover.value?.outsideClickListener;
	if (!listener) return;
	// temporarily replace the listener with a no-op for this click cycle
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

const toggle = (event?: Event, target?: HTMLElement | null | undefined) => {
	if (props.disabled) return;

	innerPopover.value?.toggle(event, target ?? undefined);
};

const show = (event?: Event, target?: HTMLElement | null | undefined) => {
	if (props.disabled) return;
	// Opens the popover.
	// `target` is the element the popover will be positioned relative to.
	// If not provided, the popover will be positioned relative to the `activator` slot element by default.
	//https://webitel.atlassian.net/browse/WTEL-7349
	innerPopover.value?.show(event, target ?? undefined);
};

const hide = (event?: Event) => {
	innerPopover.value?.hide(event);
};

// Expose useful Popover methods
defineExpose({
	toggle,
	show,
	hide,
});
</script>

<style>
.p-popover {
  box-shadow: var(--elevation-5);
}
</style>
