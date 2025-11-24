<template>
  <media-fullscreen-button
    class="fullscreen-button"
    @media-enter-fullscreen-request="emit('toggle', true)"
    @media-exit-fullscreen-request="emit('toggle', false)"
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
  </media-fullscreen-button>
</template>

<script setup lang="ts">
import {defineEmits} from "vue";

import WtIconBtn from '../../../../../../wt-icon-btn/wt-icon-btn.vue';

const emit = defineEmits<{
  'toggle': [value: boolean];
}>();

</script>

<style scoped>
.fullscreen-button[data-active] .fullscreen-button__enter,
.fullscreen-button:not([data-active]) .fullscreen-button__exit {
  display: none;
}

</style>
