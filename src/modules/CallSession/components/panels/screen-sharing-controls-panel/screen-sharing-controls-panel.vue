<template>
  <controls-group class="screen-sharing-controls-panel">
    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :loading="props.screenshotIsLoading"
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
  </controls-group>
</template>

<script setup lang="ts">
import {computed, defineEmits, inject, onUnmounted, ref, watch} from 'vue';

import {ControlsGroup} from '../../../../../components/wt-vidstack-player/components'
import {ScreenSharingSession, ScreenshotStatus} from "../../../types";

interface Props {
  session: ScreenSharingSession
  screenshotStatus: ScreenshotStatus | null
  screenshotIsLoading: boolean
}

const props = defineProps<Props>();
console.log(props, ' props')

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

const makeScreenshot = () => {
  emit('make-screenshot')
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
.screen-sharing-controls-panel {
  position: relative;
  display: flex;
  justify-content: center;

  .p-button {
    margin: 0;
  }
}
</style>


