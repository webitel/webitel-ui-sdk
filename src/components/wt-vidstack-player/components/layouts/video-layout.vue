<template>
  <media-controls
    class="video-layout controls"
    :class="`video-layout--${size}`"
  >
    <video-display-panel
      :class="{'video-display-panel--hidden': props.hideHeader}"
      :title="props.title"
      :username="props.username"
      :closable="props.closable"
      @close="emit('close-player')"
    />

    <media-controls-group>
      <slot name="content" />
    </media-controls-group>

    <slot v-if="!props.hideControlsPanel" name="controls-panel">
      <media-controls-panel />
    </slot>
  </media-controls>
</template>

<script setup lang="ts">
import {defineEmits, inject} from "vue";

import {WtVidstackPlayerSizeProvider} from "../../types/WtVidstackPlayerSizeProvider";
import {MediaControlsPanel} from "../index";
import VideoDisplayPanel from "../panels/video-display-panel/video-display-panel.vue";

const {size} = inject<WtVidstackPlayerSizeProvider>('size');

const props = defineProps<{
  title?: string;
  username?: string;
  closable?: boolean;
  hideHeader?: boolean
  hideControlsPanel?: boolean
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

  .video-display-panel {
    &--hidden {
      visibility: hidden;
    }
  }

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

media-player[data-hocus] { // hover or focus within https://vidstack.io/docs/wc/player/components/core/player/?styling=css#player.attrs
  .video-display-panel {
    background: var(--p-player-head-line-hover-background);
    opacity: 1;
    z-index: 10;
  }
}
</style>
