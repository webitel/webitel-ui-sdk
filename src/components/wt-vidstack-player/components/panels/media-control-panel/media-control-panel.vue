<template>
  <media-controls-group
    class="media-control-panel controls-group"
    :class="`media-control-panel--${size}`"
  >
    <play-button />
    <time-slider />
    <time-group />
  </media-controls-group>
</template>

<script setup lang="ts">
import {inject} from "vue";

import PlayButton from "./components/buttons/play-button.vue";
import TimeSlider from "./components/sliders/time-slider.vue";
import TimeGroup from "./components/time-group.vue";

const { size } = inject('size');

</script>

<style scoped lang="scss">
.media-control-panel {
  padding: var(--p-player-control-bar-sm-padding);
  background-color: var(--p-player-control-bar-background);
  gap: var(--p-player-control-bar-sm-gap);

  &--md {
    padding: var(--p-player-control-bar-md-padding);
    gap: var(--p-player-control-bar-md-gap);
  }
}
</style>
