<template>
  <media-controls
    class="video-layout controls"
    :class="`video-layout--${size}`"
  >
    <div class="video-display-panel-wrapper">
      <video-display-panel
        v-if="!props.hideHeader"
        :title="props.title"
        :username="props.username"
        :closable="props.closable"
        :hide-expand="props.hideExpand"
        @close="emit('close-player')"
      />
    </div>

    <media-controls-group class="video-layout-content">
      <slot name="content" />
    </media-controls-group>

    <div class="video-layout-controls">
      <slot v-if="!props.hideControlsPanel" name="controls-panel">
          <media-controls-panel />
      </slot>
    </div>
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
  hideExpand?: boolean
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
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'head' 'content' 'controls';
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: space-between;
  transition: all var(--transition) ease-out;

  &-content {
    grid-area: content;
  }

  &-controls {
    grid-area: controls;
    align-self: flex-end;
    justify-self: center;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .video-display-panel-wrapper {
    grid-area: head;
    min-width: 0;
    align-self: flex-start;
  }

  &--sm {
    border-radius: var(--p-player-wrapper-sm-border-radius);
  }
}

media-player[data-hocus] { // hover or focus within https://vidstack.io/docs/wc/player/components/core/player/?styling=css#player.attrs
  .video-display-panel {
    background: var(--p-player-head-line-hover-background);
    opacity: 1;
    z-index: 10;
  }
}
</style>
