<template>
  <div
    class="fullscreen-button"
    :class="{ 'fullscreen-button--active': fullscreen }"
    @click="emit('toggle', !fullscreen)"
  >
    <wt-icon-btn
      icon="player-enter-fullscreen"
      color="on-dark"
      class="fullscreen-button__enter"
    />
    <wt-icon-btn
      icon="player-exit-fullscreen"
      color="on-dark"
      class="fullscreen-button__exit"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import type { WtVidstackPlayerSizeProvider } from '../../types/WtVidstackPlayerSizeProvider';
import WtIconBtn from '../../../wt-icon-btn/wt-icon-btn.vue';

const { fullscreen } = inject<WtVidstackPlayerSizeProvider>('size');

const emit = defineEmits<{
	toggle: [
		value: boolean,
	];
}>();
</script>

<style scoped>
.fullscreen-button {
  display: inline-flex;
  padding: 0;
  cursor: pointer;
}

.fullscreen-button--active .fullscreen-button__enter,
.fullscreen-button:not(.fullscreen-button--active) .fullscreen-button__exit {
  display: none;
}
</style>
