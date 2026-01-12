<template>
  <controls-group class="media-control-panel">
    <play-button />

    <time-slider />

    <time-group />
  </controls-group>
</template>

<script setup lang="ts">
import {ControlsGroup} from "../../../../../components/wt-vidstack-player/components";
import PlayButton from "./components/buttons/play-button.vue";
import TimeSlider from "./components/sliders/time-slider.vue";
import TimeGroup from "./components/time-group.vue";

</script>

<style scoped >.media-control-panel {
width: 100%;
  max-width: 100%;
}</style>
