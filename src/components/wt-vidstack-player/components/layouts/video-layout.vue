<template>
  <media-controls
    class="video-layout controls"
    :class="`video-layout--${size}`"
  >
    <video-display-panel
      :title="props.title"
      :username="props.username"
      :closable="props.closable"
      @close="emit('close-player')"
    />

    <wt-loader size="sm" color="on-dark"/>

    <template v-if="props.mode === 'media'">
      <media-control-panel />
    </template>

    <template v-if="props.mode === 'stream'">
      <screen-sharing-control-panel
        :session="props.session"
        :screenshot-status="props.screenshotStatus"
        @close-session="emit('close-session')"
        @make-screenshot="emit('make-screenshot')"
        @toggle-record="emit('toggle-record')"
      />
    </template>
  </media-controls>
</template>

<script setup lang="ts">
import {defineEmits, inject} from "vue";

import WtLoader from "../../../wt-loader/wt-loader.vue";
import {ScreenshotStatus} from "../../types/ScreenshotStatus";
import {WtVidstakPlayerControlsMode} from "../../types/WtVidstackPlayerControlsMode";
import {WtVidstackPlayerSession} from "../../types/WtVidstackPlayerSession";
import MediaControlPanel from "../panels/media-control-panel/media-control-panel.vue";
import ScreenSharingControlPanel from "../panels/screen-sharing-control-panel/screen-sharing-control-panel.vue";
import VideoDisplayPanel from "../panels/video-display-panel/video-display-panel.vue";

const { size } = inject('size');

const props = defineProps<{
  title?: string;
  username?: string;
  closable?: boolean;
  mode: WtVidstakPlayerControlsMode;
  session: WtVidstackPlayerSession
  screenshotStatus: ScreenshotStatus
}>();

const emit = defineEmits<{
  'close-player': [],
  'close-session': [],
  'make-screenshot': [],
  'toggle-record': [],
}>();
</script>

<style scoped lang="scss">
.video-layout {
  &--sm {
    border-radius: var(--p-player-wrapper-sm-border-radius);
  }

  &--md {
    .media-control-panel {
      border-radius: var(--p-player-control-bar-md-border-radius);
    }
  }
}

.controls {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: space-between;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all var(--transition) ease-out;
}

.controls-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.wt-loader {
  display: flex;
  align-items: center;
  width: 100%;
}

.video-layout:not([data-buffering]) .wt-loader {
  display: none;
}

</style>
