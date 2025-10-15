<template>
  <media-fullscreen-button class="fullscreen-button">
    <wt-icon-btn
      icon="player-enter-fullscreen"
      color="on-dark"
      class="fullscreen-button__enter-icon"
    />
    <wt-icon-btn
      icon="player-exit-fullscreen"
      color="on-dark"
      class="fullscreen-button__exit-icon"
    />
  </media-fullscreen-button>
</template>

<script setup lang="ts">
import WtIconBtn from '../../../../../../wt-icon-btn/wt-icon-btn.vue';

</script>

<style scoped>
.fullscreen-button[data-active] .fullscreen-button__enter-icon,
.fullscreen-button:not([data-active]) .fullscreen-button__exit-icon {
  display: none;
}

</style>
