<template>
  <aside
    ref="floating"
    class="wt-tooltip-floating"
  >
    <slot />
  </aside>
</template>

<script setup>
/*
 * We need to create separate floating component so that we could set
 * eventListeners on it at mount
 *
 * wt-tooltip itself can't do it, because floating is rendered conditionally
 * through v-if so that there's no way to attach eventListeners to floating
 * on tooltip mount
 * */

import { ref } from 'vue';
import { useTooltipTriggerSubscriptions } from './useTooltipTriggerSubscriptions.js';

const props = defineProps({
  triggers: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['show', 'hide']);

const floating = ref(null);

useTooltipTriggerSubscriptions({
  target: floating,
  triggers: props.triggers,
  show: () => emit('show'),
  hide: () => emit('hide'),
});
</script>

<style lang="scss" scoped>

</style>
