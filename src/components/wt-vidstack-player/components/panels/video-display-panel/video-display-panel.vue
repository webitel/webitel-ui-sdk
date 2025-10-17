<template>
  <media-controls-group
    class="video-display-panel controls-group"
    :class="`video-display-panel--${size}`"
  >
    <div class="video-display-panel__title">
      <wt-avatar
        v-if="props.username"
        :username="props.username"
      />
      {{ props.title || props.username }}
    </div>
    <div class="video-display-panel__controls">
      <toggle-button
        v-if="size !== ComponentSize.LG"
        primary-icon="collapse"
        secondary-icon="expand"
        color="on-dark"
        @toggle="handlePlayerSize"
      />
      <fullscreen-button
        @toggle="handleFullscreen"
      />
      <wt-icon-btn
        v-if="props.closable"
        icon="close"
        color="on-dark"
        @click="emit('close')"
      />
    </div>
  </media-controls-group>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

import {ComponentSize} from "../../../../../enums";
import WtAvatar from "../../../../wt-avatar/wt-avatar.vue";
import WtIconBtn from "../../../../wt-icon-btn/wt-icon-btn.vue";
import ToggleButton from "../../toggle-button.vue";
import FullscreenButton from "../media-control-panel/components/buttons/fullscreen-button.vue";

const { size, changeSize } = inject('size');

const props = defineProps<{
  title?: string;
  username?: string;
  closable?: boolean;
}>();

const emit = defineEmits<{
  'close': [],
}>();

const handleFullscreen = (value: boolean) => {
  changeSize(value ? ComponentSize.LG : ComponentSize.SM);
}

const handlePlayerSize = (value: boolean) => {
  changeSize(value ? ComponentSize.MD : ComponentSize.SM);
}

</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.video-display-panel {
  display: flex;
  justify-content: space-between;
  padding: var(--p-player-headline-sm-padding);
  background: var(--p-player-head-line-background);
  color: var(--p-player-head-line-color);
  transition: all var(--transition) ease-in-out;

  &__title {
    @extend %typo-body-1-bold;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--p-player-headline-sm-gap);
  }

  &--md {
    padding: var(--p-player-headline-md-padding);

    .video-display-panel__controls {
      gap: var(--p-player-headline-md-gap);
    }
  }
}

</style>
