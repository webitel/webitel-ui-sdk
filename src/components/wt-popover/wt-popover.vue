<template>
  <popover
    ref="innerPopover"
    v-bind="attrs"
    :close-on-escape="closeOnEscape"
    v-on="attrs"
  >
    <slot />
  </popover>
</template>

<script setup lang="ts">
import { PopoverEmitsOptions, PopoverProps } from 'primevue';
import Popover from 'primevue/popover';
import { defineExpose, useAttrs, useTemplateRef } from 'vue';

const attrs = useAttrs();
const innerPopover = useTemplateRef('innerPopover');

withDefaults(defineProps<PopoverProps>(), {
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
