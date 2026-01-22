<template>
  <media-time-slider class="time-slider media-slider">
    <wt-slider class="time-slider__slider" />
  </media-time-slider>
</template>

<script setup lang="ts">
import WtSlider from '../../../../../../../components/wt-slider/wt-slider.vue';
</script>

<style scoped >.time-slider {
display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
}

.time-slider .time-slider:hover {
cursor: pointer;

    .time-slider:deep(.p-slider-handle) {
      transform: scale(1.5);
}

  .time-slider__slider {
width: 100%;
}

  .time-slider:deep(.p-slider-range) {
/* set vidstach slider variable to primeview component @author liza-pohrsnichna */
    width: var(--slider-fill, 0%) !important;
}

  .time-slider:deep(.p-slider-handle) {
/*set vidstach slider variable to primeview component @author liza-pohrsnichna */
    inset-inline-start: var(--slider-fill, 0%) !important;
    transition: transform ease var(--transition);
}
}</style>
