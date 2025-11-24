<template>
  <media-controls-group
    class="controls-group"
    :class="`controls-group--${size}`"
  >
    <div class="controls-group__actions">
      <slot name="default" />
    </div>
  </media-controls-group>
</template>

<script setup lang="ts">
import {inject} from "vue";

const { size } = inject('size');

</script>

<style scoped lang="scss">
.controls-group {
  display: flex;
  justify-content: center;

  &--sm {
    .controls-group__actions {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
      gap: calc(var(--p-player-control-bar-sm-gap) * 2);
    }
  }

  &--md {
    max-width: fit-content;
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
