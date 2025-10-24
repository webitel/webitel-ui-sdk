<template>
  <media-play-button class="play-button">
    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      icon="play"
      type="play"
      class="play-button__play-icon"
    />

    <wt-button
      rounded
      contains-icon
      variant="outlined"
      color="secondary"
      :size="size"
      icon="pause"
      type="pause"
      class="play-button__pause-icon"
    />
  </media-play-button>
</template>

<script setup lang="ts">
import {inject} from "vue";

const {size} = inject('size');
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
