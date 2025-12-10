<template>
  <controls-group class="video-call-controls-panel">
    <wt-button
      v-if="shownActionsMap[VideoCallAction.Screenshot]"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :loading="isScreenshotLoading"
      :size="size"
      :icon="screenShotIcon"
      @click="onScreenshotClick"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Recordings]"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      :icon="recordIcon"
      @click="emit(VideoCallAction.Recordings)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Mic]"
      :disabled="!props['mic:accessed']"
      :size="size"
      :icon="microphoneIcon"
      badge="!"
      badge-severity="danger"
      badge-absolute-position
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      @click="emit(VideoCallAction.Mic)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Video]"
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :disabled="!props['video:accessed']"
      :size="size"
      :icon="videoCamIcon"
      @click="emit(VideoCallAction.Video)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Settings]"
      :size="size"
      icon="settings"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Settings)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Chat]"
      :size="size"
      icon="chat"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Chat)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Hangup]"
      :size="size"
      icon="call-end--filled"
      color="error"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Hangup)"
    />
  </controls-group>
</template>

<script setup lang="ts">
import {computed, inject, ref} from 'vue';

import {ControlsGroup} from '../../../../../components/wt-vidstack-player/components'
import { ComponentSize } from '../../../../../enums';
import { VideoCallAction } from '../../../../../modules/CallSession/modules/VideoCall/enums/VideoCallAction.enum';
import {ScreenshotStatus} from '../../../../../modules/CallSession/types';
import { ResultCallbacks } from '../../../../../types';

const props = defineProps<{
  'actions': VideoCallAction[];

  'mic:enabled': boolean;
  'mic:accessed': boolean;
  'video:enabled': boolean;
  'video:accessed': boolean;
  'screenshot:status': ScreenshotStatus | null;
  'screenshot:loading': boolean;
  'recordings': boolean;
}>();

const emit = defineEmits<{
  (e: typeof VideoCallAction.Screenshot, payload?: unknown, options?: ResultCallbacks): void;
  (e: typeof VideoCallAction.Recordings, payload?: unknown, options?: ResultCallbacks): void;
  (e: typeof VideoCallAction.Mic, payload?: unknown, options?: ResultCallbacks): void;
  (e: typeof VideoCallAction.Video, payload?: unknown, options?: ResultCallbacks): void;
  (e: typeof VideoCallAction.Settings, payload?: unknown, options?: ResultCallbacks): void;
  (e: typeof VideoCallAction.Chat, payload?: unknown, options?: ResultCallbacks): void;
  (e: typeof VideoCallAction.Hangup, payload?: unknown, options?: ResultCallbacks): void;
}>();

const { size } = inject('size') as { size: ComponentSize };

const shownActionsMap = computed(() => {
  return props.actions.reduce<Record<VideoCallAction, boolean>>((acc, action) => {
    acc[action] = true;
    return acc;
  }, {} as Record<VideoCallAction, boolean>);
});

const microphoneIcon = computed(() => {
  if (props['mic:accessed']) {
    return 'mic'; // todo
  }

  if (!props['mic:enabled']) {
    return 'mic-muted';
  }

  return 'mic';
});

const videoCamIcon = computed(() => {
  if (!props['video:accessed']) {
    return 'video-cam'; // todo
  }

  if (!props['video:enabled']) {
    return 'video-cam-off';
  }

  return 'video-cam';
});

const recordIcon = computed(() => (props.recordings ? 'record-stop' : 'record-start'));

const screenShotIcon = computed(() => {
  switch (props['screenshot:status']) {
    case 'done':
      return 'screenshot-done';
    case 'error':
      return 'screenshot-false';
    default:
      return 'screenshot';
  }
});

const isScreenshotLoading = ref(false);

const onScreenshotClick = () => {
  isScreenshotLoading.value = true;
  emit(VideoCallAction.Screenshot, {}, {
    onComplete: () => {
      isScreenshotLoading.value = false;
    },
  });
};
</script>

<style scoped lang="scss">
.video-call-controls-panel {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>


