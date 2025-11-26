<template>
  <media-controls
    class="video-layout controls"
    :class="`video-layout--${size}`"
  >
    <video-display-panel
      v-if="!props.hideDisplayPanel"
      :title="props.title"
      :username="props.username"
      :closable="props.closable"
      @close="emit('close-player')"
    />

    <wt-loader size="sm" color="on-dark"/>

    <slot name="content" />

    <slot name="controls-panel">
      <media-controls-panel />
    </slot>
  </media-controls>
</template>

<script setup lang="ts">
import {defineEmits, inject} from "vue";

import WtLoader from "../../../wt-loader/wt-loader.vue";
import MediaControlsPanel from "../panels/media-controls-panel/media-controls-panel.vue";
import VideoDisplayPanel from "../panels/video-display-panel/video-display-panel.vue";

const { size } = inject('size');

const props = defineProps<{
  title?: string;
  username?: string;
  closable?: boolean;
  hideDisplayPanel?: boolean
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
  position: relative;

  &--sm {
    border-radius: var(--p-player-wrapper-sm-border-radius);
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

.wt-loader {
  display: flex;
  align-items: center;
  width: 100%;
}

.video-layout:not([data-buffering]) .wt-loader {
  display: none;
}

media-player[data-hocus] { // hover or focus within https://vidstack.io/docs/wc/player/components/core/player/?styling=css#player.attrs
  .video-display-panel {
    background: var(--p-player-head-line-hover-background);
    opacity: 1;
  }
}
</style>
