<template>
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
    v-on="attrs"
  >
    <slot />
  </p-popover>
</template>

<script setup lang="ts">
import { PopoverEmitsOptions, PopoverProps } from 'primevue';
import { defineExpose, useAttrs, useTemplateRef } from 'vue';

const attrs = useAttrs();
const innerPopover = useTemplateRef('innerPopover');

withDefaults(defineProps<PopoverProps>(), {
  appendTo: 'body',
  baseZIndex: 0,
  autoZIndex: true,
  breakpoints: null,
  dt: null,
  pt: null,
  ptOptions: null,
  closeOnEscape: true,
});
defineEmits<PopoverEmitsOptions>();

// Expose useful Popover methods
defineExpose({
  toggle: (...args) => innerPopover.value?.toggle?.(...args),
  show: (...args) => innerPopover.value?.show?.(...args),
  hide: (...args) => innerPopover.value?.hide?.(...args),
});
</script>
