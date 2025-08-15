<template>
  <wt-transition
    :name="transitionName"
    :appear="props.appear"
    :duration="props.duration"
    :mode="props.mode"
    class="wt-replace-transition"
  >
    <template #default>
      <slot />
    </template>
  </wt-transition>
</template>

<script setup>
import { computed } from 'vue';

import WtTransition from '../wt-transition.vue';

const props = defineProps({
  // can choose replace pattern [opacity, slide-up ets]
  pattern: {
    type: String,
    default: 'opacity',
    options: ['opacity', 'slide-up'],
  },
  duration: {
    type: String,
    default: 'fast',
  },
  appear: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'out-in',
  },
});

const transitionName = computed(() => `fade-${props.pattern}`);
</script>

<style lang="scss" scoped></style>
