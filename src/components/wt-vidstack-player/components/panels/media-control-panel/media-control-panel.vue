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
  height: var(--wt-player-control-bar-height-sm);
  padding: var(--wt-player-control-bar-padding-sm);
  gap: var(--wt-player-control-bar-gap-sm);
  background-color: var(--wt-player-video-control-bar-background);

  &--md {
    height: var(--wt-player-control-bar-height-md);
    padding: var(--wt-player-control-bar-padding-md);
    background-color: var(--wt-player-video-control-bar-background);
    gap: var(--wt-player-control-bar-gap-md);
  }
}
</style>
