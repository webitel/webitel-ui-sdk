<template>
  <media-mute-button class="mute-button">
    <wt-icon type="mute" icon="plyr-muted" class="mute-icon" size="sm"/>
    <wt-icon type="volume" icon="plyr-volume" class="volume-icon" size="sm" />
  </media-mute-button>
</template>

<script setup lang="ts">

</script>

<style scoped>
.mute-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.mute-button[data-muted] .volume-icon,
.mute-button:not([data-muted]) .mute-icon {
  display: none;
}</style>
