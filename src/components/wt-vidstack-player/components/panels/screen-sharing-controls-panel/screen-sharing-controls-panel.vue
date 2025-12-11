<template>
  <controls-group class="screen-sharing-controls-panel">
    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :loading="props.screenshotIsLoading"
      :size="buttonSizeMap[size]"
      :icon="screenShotIcon"
      @click="makeScreenshot"
    />

    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="buttonSizeMap[size]"
      :icon="recordIcon"
      @click="emit('toggle-record')"
    />

    <wt-button
      icon="sharing-end"
      class="screen-sharing-control-panel__sharing-end"
      color="error"
      variant="outlined"
      :size="buttonSizeMap[size]"
      rounded
      contains-icon
      @click="closeSession"
    />
  </controls-group>
</template>

<script setup lang="ts">
import {computed, defineEmits, inject} from 'vue';

import {ControlsGroup} from '../../../../../components/wt-vidstack-player/components'
import {ComponentSize} from "../../../../../enums";
import {ScreenSharingSession, ScreenshotStatus} from "../../../../../modules/CallSession/types";
import {WtVidstackPlayerSizeProvider} from "../../../types/WtVidstackPlayerSizeProvider";

interface Props {
  session: ScreenSharingSession
  screenshotStatus: ScreenshotStatus | null
  screenshotIsLoading: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'close-session': [],
  'make-screenshot': [],
  'toggle-record': [],
}>()

const {size} = inject<WtVidstackPlayerSizeProvider>('size');

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

const closeSession = () => {
  emit('close-session')
};

const makeScreenshot = () => {
  emit('make-screenshot')
};

const buttonSizeMap = {
  [ComponentSize.SM]: ComponentSize.SM,
  [ComponentSize.MD]: ComponentSize.MD,
  [ComponentSize.LG]: ComponentSize.MD,
}
</script>

<style scoped lang="scss">
.screen-sharing-controls-panel {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>


