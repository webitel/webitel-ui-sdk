<template>
  <div class="time-group">
    <media-time type="current" />
    /
    <media-time type="duration" />
    <!--    TODO: invert time -->
    <!--    <media-time type="buffered" />-->
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		invertTime?: boolean;
	}>(),
	{
		invertTime: false,
	},
);
</script>

<style  scoped>
.time-group {
  font-family: 'Montserrat', monospace;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-transform: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
  color: var(--wt-player-video-control-bar-color);
}</style>
