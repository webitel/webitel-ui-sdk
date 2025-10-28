<template>
  <media-controls-group
    class="video-display-panel controls-group"
    :class="`video-display-panel--${size}`"
  >
    <div class="video-display-panel__head">
      <wt-avatar
        v-if="props.username"
        :username="props.username"
        size="sm"
        class="video-display-panel__avatar"
      />

      <span class="video-display-panel__title">
        {{ props.title || props.username }}
      </span>
    </div>

    <div class="video-display-panel__controls">
      <fullscreen-button
        @toggle="handleFullscreen"
      />
      <toggle-button
        v-if="size !== ComponentSize.LG"
        primary-icon="expand"
        secondary-icon="collapse"
        color="on-dark"
        @toggle="handlePlayerSize"
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
import {defineEmits, defineProps, inject, onBeforeUnmount, onMounted} from 'vue';

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

const handleKeyUp = (event) => {
  if (event.key === 'Escape') {
    handleFullscreen(false)
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      handleFullscreen(false)
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keyup', handleKeyUp)
  })
})
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
  backdrop-filter: blur(var(--p-player-head-line-blur));
  opacity: 0;

  &__head {
    @extend %typo-body-1-bold;
    display: flex;
    align-items: center;
    gap: var(--p-player-headline-sm-gap);
    min-width: 0;
  }

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--p-player-headline-sm-gap);
  }

  &--sm {
    gap: var(--p-player-headline-sm-gap);
  }

  &--md {
    padding: var(--p-player-headline-md-padding);
    gap: var(--p-player-headline-md-gap);

    .video-display-panel__controls {
      gap: var(--p-player-headline-md-gap);
    }
  }

  &--lg {
    gap: var(--p-player-headline-lg-gap);
  }
}

</style>
