<template>
  <controls-group class="video-call-controls-panel">
    <wt-button
      v-if="props.screenshotCallback"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :loading="props.screenshotIsLoading"
      :size="size"
      :icon="screenShotIcon"
      @click="props.screenshotCallback"
    />

    <wt-button
      v-if="props.recordingsCallback"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      :icon="recordIcon"
      @click="props.recordingsCallback"
    />

    <wt-button
      v-if="props.micCallback"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      :icon="microphoneIcon"
      @click="props.micCallback"
    />

    <wt-button
      v-if="props.videoCallback"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      :icon="videoCamIcon"
      @click="props.videoCallback"
    />

    <wt-button
      v-if="props.settingsCallback"
      :size="size"
      icon="settings"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="props.settingsCallback"
    />

    <wt-button
      v-if="props.chatCallback"
      :size="size"
      icon="chat"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="props.chatCallback"
    />

    <wt-button
      v-if="props.callStateCallback"
      :size="size"
      :icon="callStateIcon"
      :color="callStateButtonColor"
      rounded
      contains-icon
      @click="props.callStateCallback"
    />
  </controls-group>
</template>

<script setup lang="ts">
import {computed, inject} from 'vue';

import {ControlsGroup} from '../../../../../components/wt-vidstack-player/components'
import {ScreenshotStatus} from '../../../../../modules/CallSession/types';

interface Props {
  recordings: boolean
  isMicMuted: boolean
  isVideoMuted: boolean
  isCallStarted: boolean
  screenshotIsLoading: boolean
  screenshotStatus: ScreenshotStatus | null

  screenshotCallback?: () => void
  recordingsCallback?: () => void
  micCallback?: () => void
  videoCallback?: () => void
  settingsCallback?: () => void
  chatCallback?: () => void
  callStateCallback?: () => void
}

const props = defineProps<Props>();

const {size} = inject('size');

const microphoneIcon = computed(() => (props.isMicMuted ? 'mic' : 'mic-muted'));
const videoCamIcon = computed(() => (props.isVideoMuted ? 'video-cam' : 'video-cam-off'));
const recordIcon = computed(() => (props.recordings ? 'record-stop' : 'record-start'));
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
const callStateIcon = computed(() => (props.isCallStarted ? 'call-end--filled' : 'call--filled'));
const callStateButtonColor = computed(() => (props.isCallStarted ? 'error' : 'success'));
</script>

<style scoped lang="scss">
.video-call-controls-panel {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>


