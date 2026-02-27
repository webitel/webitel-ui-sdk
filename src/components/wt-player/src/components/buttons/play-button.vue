<template>
  <media-play-button class="play-button">
    <wt-icon icon="plyr-play"  type="play" class="play-icon" size="sm"/>
    <wt-icon icon="plyr-pause" type="pause" class="pause-icon" size="sm" />
  </media-play-button>
</template>

<script setup lang="ts">
import WtIcon from '../../../../wt-icon/wt-icon.vue';
</script>

<style scoped>
.play-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.play-button[data-paused] .pause-icon,
.play-button:not([data-paused]) .play-icon {
  display: none;
}</style>
