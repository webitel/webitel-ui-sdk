<template>
  <section class="call-wave-playback-controls">
    <div class="call-wave-playback-controls__group">
      <wt-button
        v-for="rate of Object.values(PlaybackRate)"
        :key="rate"
        :color="rate === playbackRate ? ButtonColor.PRIMARY : ButtonColor.SECONDARY"
        variant="outlined"
        @click="emit('toggle-rate', rate)"
      >
        x{{ rate }}
      </wt-button>
      <wt-button
        :color="isPlaying ? ButtonColor.PRIMARY : ButtonColor.SECONDARY"
        variant="outlined"
        :icon="isPlaying ? 'pause' : 'play'"
        @click="emit('play-pause')"
      />
    </div>

    <div class="call-wave-playback-controls__group">
      <wt-button
        :disabled="zoomInDisabled"
        :color="ButtonColor.SECONDARY"
        variant="outlined"
        icon="zoom-in"
        @click="emit('zoom-in')"
      />
      <wt-button
        :disabled="zoomOutDisabled"
        :color="ButtonColor.SECONDARY"
        variant="outlined"
        icon="zoom-out"
        @click="emit('zoom-out')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ButtonColor } from '../../../../enums';

import { PlaybackRate } from '../../types/callWave';

defineProps<{
	playbackRate: number;
	isPlaying: boolean;
	zoomInDisabled: boolean;
	zoomOutDisabled: boolean;
}>();

const emit = defineEmits<{
	'toggle-rate': [
		value: number,
	];
	'play-pause': [];
	'zoom-in': [];
	'zoom-out': [];
}>();
</script>

<style scoped>
.call-wave-playback-controls {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xs);
  padding: var(--spacing-2xs);
}

.call-wave-playback-controls__group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
