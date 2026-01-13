<template>
  <div
    class="recording-indicator"
  >
    <wt-indicator
      color="error"
      size="md"
    />

    <span class="recording-indicator__time">{{ durationTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import convertDuration from '../../../../scripts/convertDuration';

const secondsElapsed = ref(0);
const timerId = ref<number | null>(null);

const startTimer = () => {
	secondsElapsed.value = 0;
	stopTimer();
	timerId.value = window.setInterval(() => {
		secondsElapsed.value++;
	}, 1000);
};

const stopTimer = () => {
	if (timerId.value !== null) {
		clearInterval(timerId.value);
		timerId.value = null;
	}
};

const durationTime = computed(() => convertDuration(secondsElapsed.value));

onMounted(() => {
	startTimer();
});
</script>

<style>
.recording-indicator {
  background: var(--content-wrapper-color);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--p-player-counter-gap);
  padding: var(--p-player-counter-padding);
  border-radius: var(--p-player-counter-border-radius);
  box-shadow: var(--elevation-10);

  /* Agreed with @Evgeniy Trahtenberg */
  width: 100px;
}

.recording-indicator .recording-indicator__time {
  font-family: 'Montserrat', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-transform: none;
}
</style>
