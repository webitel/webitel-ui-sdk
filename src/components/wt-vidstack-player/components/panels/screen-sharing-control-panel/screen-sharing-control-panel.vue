<template>
  <media-controls-group
    class="screen-sharing-control-panel controls-group"
    :class="`screen-sharing-control-panel--${size}`"
  >
    <div
      class="screen-sharing-control-panel__actions"
    >
      <wt-button
        rounded
        contains-icon
        variant="outlined"
        color="secondary"
        :size="size"
        :icon="screenShotIcon"
        @click="emit('make-screenshot')"
      />

      <wt-button
        rounded
        contains-icon
        variant="outlined"
        color="secondary"
        :size="size"
        :icon="recordIcon"
        @click="emit('toggle-record')"
      />

      <wt-button
        icon="sharing-end"
        class="screen-sharing-control-panel__sharing-end"
        color="error"
        variant="outlined"
        :size="size"
        rounded
        contains-icon
        @click="closeSession"
      />
    </div>

    <div
      v-if="isRecording" class="screen-sharing-control-panel__indicator"
    >
      <wt-indicator
        color="error"
        size="md"
      />

      <span class="screen-sharing-control-panel__time">{{ convertDuration(secondsElapsed) }}</span>
    </div>
  </media-controls-group>
</template>

<script setup lang="ts">
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import {computed, defineEmits, inject, onUnmounted, ref, watch} from 'vue';

import {ScreenshotStatus} from "../../../types/ScreenshotStatus";
import {WtVidstackPlayerSession} from "../../../types/WtVidstackPlayerSession";

interface Props {
  session: WtVidstackPlayerSession
  screenshotStatus: ScreenshotStatus | null
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'close-session': [],
  'make-screenshot': [],
  'toggle-record': [],
}>()

const {size} = inject('size');

const recordIcon = computed(() => (props.session.recordings ? 'record-stop' : 'record-start'));

const screenShotIcon = computed(() => {
  switch (props.screenshotStatus) {
    case 'done':
      return 'screenshot-done';
    case 'error':
      return 'screenshot-false';
    default:
      return 'screenshot';
  }
});
const isRecording = computed(() => props.session.recordings);

const secondsElapsed = ref(0);
const timerId = ref<number | null>(null);

function startTimer() {
  secondsElapsed.value = 0;
  stopTimer();
  timerId.value = window.setInterval(() => {
    secondsElapsed.value++;
  }, 1000);
}

function stopTimer() {
  if (timerId.value !== null) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
}

const closeSession = () => {
  emit('close-session')
};

onUnmounted(() => {
  stopTimer();
});

watch(isRecording, (newVal) => {
  if (newVal) {
    startTimer();
  } else {
    stopTimer();
  }
});
</script>

<style scoped lang="scss">
@use '@webitel/styleguide/typography' as *;

.screen-sharing-control-panel {
  position: relative;
  display: flex;
  justify-content: center;

  &--sm {
    .screen-sharing-control-panel__actions {
      width: 100%;
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
    }

    .screen-sharing-control-panel__indicator {
      right: var(--p-player-counter-position-padding-sm);
      bottom: calc(100% + var(--p-player-counter-position-padding-sm));
    }
  }

  &--md {
    .screen-sharing-control-panel__indicator {
      right: var(--p-player-counter-position-padding-md);
      bottom: var(--p-player-counter-position-padding-md);
    }
  }

  &--lg {
    .screen-sharing-control-panel__indicator {
      right: var(--p-player-counter-position-padding-lg);
      bottom: var(--p-player-counter-position-padding-lg);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--p-player-control-bar-background);
    box-shadow: var(--elevation-10);
  }

  &__indicator {
    background: var(--content-wrapper-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--p-player-counter-gap);
    padding: var(--p-player-counter-padding);
    border-radius: var(--p-player-counter-border-radius);
    box-shadow: var(--elevation-10);
    position: absolute;

    // Agreed with @Evgeniy Trahtenberg
    width: 100px;
  }

  &__time {
    @extend %typo-body-1;
  }
}
</style>


