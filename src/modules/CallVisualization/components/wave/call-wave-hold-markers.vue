<template>
  <div class="call-wave-hold-markers">
    <wt-tooltip
      v-for="marker of markers"
      :key="marker.key"
      class="call-wave-hold-markers__marker"
      :style="{ left: `${marker.leftPx}px` }"
    >
      <template #activator>
        <wt-icon
          class="call-wave-hold-markers__icon"
          icon="pause"
          color="warning"
        />
      </template>
      {{ marker.durationLabel }}
    </wt-tooltip>
  </div>
</template>

<script setup lang="ts">
import type { HoldMarker } from '../../composables/useCallWaveHoldMarkers';

defineProps<{
	markers: HoldMarker[];
}>();
</script>

<style scoped>
.call-wave-hold-markers {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  /* Above the wavesurfer regions container (z-index: 5), so icons get the pointer. */
  z-index: 6;
}

.call-wave-hold-markers__marker {
  position: absolute;
  top: 0;
  pointer-events: auto;
}

.call-wave-hold-markers__icon {
  cursor: default;
}
</style>
