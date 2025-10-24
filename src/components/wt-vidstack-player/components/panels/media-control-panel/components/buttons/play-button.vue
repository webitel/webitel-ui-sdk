<template>
  <media-play-button class="play-button">
    <wt-icon-btn icon="play" type="play" class="play-button__play-icon" />
    <wt-icon-btn icon="pause" type="pause" class="play-button__pause-icon" />
  </media-play-button>
</template>

<script setup lang="ts">
import WtIconBtn from "../../../../../../wt-icon-btn/wt-icon-btn.vue";
</script>

<style scoped>
.play-button {
  cursor: pointer;
}

.play-button[data-paused] .play-button__pause-icon,
.play-button:not([data-paused]) .play-button__play-icon {
  display: none;
}
</style>
