<template>
  <controls-group class="video-call-controls-panel">
    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      :icon="microphoneIcon"
      @click="toggleMic"
    />

    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      :icon="videoCamIcon"
      @click="toggleVideo"
    />

    <wt-button
      :size="size"
      icon="settings"
      class="video-call-controls-panel__sharing-end"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="toggleSettings"
    />

<!--    <wt-button-->
<!--      :size="size"-->
<!--      :icon="callStateIcon"-->
<!--      class="video-call-controls-panel__sharing-end"-->
<!--      :color="callStateButtonColor"-->
<!--      rounded-->
<!--      contains-icon-->
<!--      @click="toggleCall"-->
<!--    />-->
  </controls-group>
</template>

<script setup lang="ts">
import {computed, defineEmits, inject} from 'vue';

import {ControlsGroup} from '../../../../../components/wt-vidstack-player/components'

interface Props {
  recordings: boolean
  isMicMuted: boolean
  isVideoMuted: boolean
  isCallStarted: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'make-screenshot': [],
  'toggle-record': [],
  'toggle-settings': [],
  'toggle-call': [],
  'toggle-mic': [],
  'toggle-video': [],
}>()

const {size} = inject('size');

const microphoneIcon = computed(() => (props.isMicMuted ? 'mic' : 'mic-muted'));
const videoCamIcon = computed(() => (props.isVideoMuted ? 'video-cam' : 'video-cam-off'));
const recordIcon = computed(() => (props.recordings ? 'record-stop' : 'record-start'));
const callStateIcon = computed(() => (props.isCallStarted ? 'call-end--filled' : 'call--filled'));
const callStateButtonColor = computed(() => (props.isCallStarted ? 'error' : 'success'));

const toggleSettings = () => {
  emit('toggle-settings')
};

const toggleCall = () => {
  emit('toggle-call')
};

const toggleMic = () => {
  emit('toggle-mic')
};

const toggleVideo = () => {
  emit('toggle-video')
};
</script>

<style scoped lang="scss">
.video-call-controls-panel {
  position: relative;
  display: flex;
  justify-content: center;

  .p-button {
    margin: 0;
  }
}
</style>


