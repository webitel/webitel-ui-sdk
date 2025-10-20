<template>
  <media-controls-group class="screen-sharing-control-panel" :class="`screen-sharing-control-panel--${size}`">

    <div
      class="screen-sharing-control-panel__actions"
      :class="`screen-sharing-control-panel--${size}__actions`"
    >
      <wt-button
        rounded
        contains-icon
        variant="outlined"
        color="secondary"
        :size="size"
        :icon="screenShotIcon"
        @click="makeScreenshot"
      />

      <wt-button
        rounded
        contains-icon
        variant="outlined"
        color="secondary"
        :size="size"
        :icon="recordIcon"
        @click="toggleRecordAction"
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
import {computed, inject, onUnmounted, ref, watch} from 'vue';

import {WtVidstackPlayerSession} from "../../../types/WtVidstackPlayerSession";

interface Props {
  screenshotStatus?: 'done' | 'false'
  session: WtVidstackPlayerSession
}
const props = defineProps<Props>();

const {size} = inject('size');

const recordIcon = computed(() => (props.session.recordings ? 'record-stop' : 'record-start'));
const getScreenshotIcon = (status?: string) => {
  switch (status) {
    case 'done':
      return 'screenshot-done';
    case 'false':
      return 'screenshot-false';
    default:
      return 'screenshot';
  }
}

const screenShotIcon = computed(() => getScreenshotIcon(props.screenshotStatus));
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

const toggleRecordAction = () => {
  if (isRecording.value) {
    props.session.stopRecord();
  } else {
    props.session.startRecord();
  }
};
const makeScreenshot = () => {
  props.session.screenshot()
};
const closeSession = () => {
  props.session.close()
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
    padding: var(--p-player-control-bar-position-padding-sm);

    &__actions {
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
    padding: var(--p-player-control-bar-position-padding-md);

    .screen-sharing-control-panel__indicator {
      right: var(--p-player-counter-position-padding-md);
      bottom: var(--p-player-counter-position-padding-md);
    }
  }

  &--lg {
    padding: var(--p-player-control-bar-position-padding-lg);

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


