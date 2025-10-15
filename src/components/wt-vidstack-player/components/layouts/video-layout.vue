<template>
  <media-controls
    class="video-layout controls"
    :class="`video-layout--${size}`"
  >
    <video-display-panel
      :title="props.title"
      :username="props.username"
      :closable="props.closable"
    />

    <wt-loader size="sm" color="on-dark"/>

    <media-control-panel />
  </media-controls>
</template>

<script setup lang="ts">
import { inject } from "vue";

import WtLoader from "../../../wt-loader/wt-loader.vue";
import MediaControlPanel from "../panels/media-control-panel/media-control-panel.vue";
import VideoDisplayPanel from "../panels/video-display-panel/video-display-panel.vue";

const { size } = inject('size');

const props = defineProps<{
  title?: string;
  username?: string;
  closable?: boolean;
}>();

</script>

<style scoped lang="scss">
.video-layout {
  &--sm {
    border-radius: var(--spacing-sm);

    .media-control-panel {
      border-radius: 0 0 var(--spacing-sm) var(--spacing-sm);
    }
  }
  &--md {
    border-radius: var(--spacing-md);

    .media-control-panel {
      margin: var(--spacing-md);
      width: calc(100% - (var(--spacing-md) * 2));
      border-radius: var(--wt-player-control-bar-border-radius-lg);
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
  transition: opacity var(--transition) ease-out;
}

.controls-group {
  display: flex;
  align-items: center;
  width: 100%;
  opacity: 0;
}

media-player[data-can-play] .controls-group {
  opacity: 1;
}

.media-control-panel {
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
