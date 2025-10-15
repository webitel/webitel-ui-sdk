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
        first-icon="collapse"
        second-icon="expand"
        color="on-dark"
        @click="changeSize"
      />
      <fullscreen-button />
      <wt-icon-btn
        v-if="props.closable"
        color="on-dark"
        icon="close"
        @click="emit('close')"
      />
    </div>
  </media-controls-group>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

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
  (e: 'close'): void;
}>();

</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.video-display-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:  var(--wt-player-control-bar-height-md);
  padding: var(--spacing-sm);
  background: rgba(0, 0, 0, 0.5);
  color: var(--text-on-brand-color);
  border-radius: var(--spacing-md) var(--spacing-md) 0 0;

  &__title {
    @extend %typo-body-1-bold;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  &--sm {
    height: var(--wt-player-control-bar-height-sm);
    padding: var(--wt-player-control-bar-padding-sm);
    gap: var(--wt-player-control-bar-gap-sm);
    border-radius: var(--spacing-sm) var(--spacing-sm) 0 0;
  }
}

</style>
