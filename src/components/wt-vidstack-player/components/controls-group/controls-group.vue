<template>
  <media-controls-group
    class="controls-group"
    :class="`controls-group--${size}`"
  >
    <div class="controls-group__actions">
      <slot />
    </div>
  </media-controls-group>
</template>

<script setup lang="ts">
import {inject} from "vue";

import {WtSizeProvider} from "../../types/WtSizeProvider";

const { size } = inject<WtSizeProvider>('size');

</script>

<style scoped lang="scss">
.controls-group {
  display: flex;
  justify-content: center;
  max-width: fit-content;
  align-self: center;

  &--sm {
    width: 100%;
    max-width: 100%;

    .controls-group__actions {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
      gap: calc(var(--p-player-control-bar-sm-gap) * 2);
    }
  }

  &--md {
    align-self: center;
  }

  &__actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--p-player-control-bar-background);
    box-shadow: var(--elevation-10);
  }
}
</style>
