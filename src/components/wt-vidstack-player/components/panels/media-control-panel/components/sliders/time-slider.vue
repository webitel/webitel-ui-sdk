<template>
  <media-time-slider class="time-slider media-slider">
    <wt-slider class="time-slider__slider" />
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

  &__slider {
    width: 100%;
  }

  &:deep(.p-slider-range) { /* set vidstach slider variable to primeview component @author liza-pohrsnichna */
    width: var(--slider-fill, 0%) !important;
  }

  &:deep(.p-slider-handle) { /*set vidstach slider variable to primeview component @author liza-pohrsnichna */
    inset-inline-start: var(--slider-fill, 0%) !important;
  }
}

</style>
