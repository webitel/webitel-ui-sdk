<template>
  <media-time-slider ref="slider" class="time-slider media-slider">
    <wt-slider :width="100" />
  </media-time-slider>
</template>

<script setup lang="ts">
import WtSlider from "../../../../../../wt-slider/wt-slider.vue";

</script>

<style scoped lang="scss">
.time-slider {
  display: inline-flex;
  align-items: center;
  width: 100%;

  &:deep(.p-slider-range) { /* set vidstach slider variable to primeview component @author liza-pohrsnichna */
    width: var(--slider-fill, 0%) !important;
  }

  &:deep(.p-slider-handle) { /*set vidstach slider variable to primeview component @author liza-pohrsnichna */
    inset-inline-start: var(--slider-fill, 0%) !important;
  }
}

</style>
