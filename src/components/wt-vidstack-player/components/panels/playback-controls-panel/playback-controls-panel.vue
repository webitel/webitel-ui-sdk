<template>
  <controls-group class="playback-control-panel">
    <play-button />

    <time-slider />

    <time-group :countdown="props.countdownTimeMode"/>
  </controls-group>
</template>

<script setup lang="ts">
import { ControlsGroup } from '../../../../../components/wt-vidstack-player/components';
import PlayButton from './components/buttons/play-button.vue';
import TimeSlider from './components/sliders/time-slider.vue';
import TimeGroup from './components/time-group.vue';

import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
	defineProps<{
		countdownTimeMode?: boolean;
	}>(),
	{
		countdownTimeMode: false,
	},
);
</script>

<style scoped>
.playback-control-panel {
  width: 100%;
  max-width: 100%;
}
</style>
