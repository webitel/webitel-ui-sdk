<template>
  <media-controls-group
    class="media-control-panel controls-group"
    :class="`media-control-panel--${size}`"
  >
    <div class="media-control-panel__actions">
      <play-button />
      <time-slider />
      <time-group />
    </div>
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
  display: flex;
  justify-content: center;

  &--sm {
    .media-control-panel__actions {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
      gap: calc(var(--p-player-control-bar-sm-gap) * 2);
    }
  }

  &__actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--p-player-control-bar-background);
    box-shadow: var(--elevation-10);
  }
}
</style>
