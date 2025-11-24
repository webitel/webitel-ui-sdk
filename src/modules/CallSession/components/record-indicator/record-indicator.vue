<template>
  <div
    class="record-indicator"
  >
    <wt-indicator
      color="error"
      size="md"
    />

    <span class="record-indicator__time">{{ convertDuration(secondsElapsed) }}</span>
  </div>
</template>

<script setup lang="ts">
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import {onMounted, ref} from 'vue';

const secondsElapsed = ref(0);
const timerId = ref<number | null>(null);

const startTimer = () => {
  secondsElapsed.value = 0;
  stopTimer();
  timerId.value = window.setInterval(() => {
    secondsElapsed.value++;
  }, 1000);
}

const stopTimer = () => {
  if (timerId.value !== null) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
}

onMounted(() => {
  startTimer();
})
</script>

<style lang="scss">
@use '@webitel/styleguide/typography' as *;

.record-indicator {
  background: var(--content-wrapper-color);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--p-player-counter-gap);
  padding: var(--p-player-counter-padding);
  border-radius: var(--p-player-counter-border-radius);
  box-shadow: var(--elevation-10);

  // Agreed with @Evgeniy Trahtenberg
  width: 100px;

  &__time {
    @extend %typo-body-1;
  }
}
</style>
