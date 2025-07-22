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
  unstyled: false
});
defineEmits<PopoverEmitsOptions>();

const toggle = (event?: Event) => {
  innerPopover.value?.toggle(event);
};

const show = (event?: Event) => {
  innerPopover.value?.show(event);
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
