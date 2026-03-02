<template>
  <media-volume-slider class="volume-slider media-slider">
    <wt-slider class="volume-slider__slider" />
  </media-volume-slider>
</template>

<script
  lang="ts"
  setup
>
import WtSlider from '../../../../wt-slider/wt-slider.vue';
</script>

<style scoped>
.volume-slider {
  display: inline-flex;
  align-items: center;
  width: 15%;
  padding: var(--spacing-xs) 0;
  cursor: pointer;
}

.volume-slider:deep(.p-slider-handle) {
  transform: scale(1.5);
}

.volume-slider__slider {
  width: 100%;
}

.volume-slider:deep(.p-slider-range) {
  /* set vidstach slider variable to primevue component @author liza-pohrsnichna */
  width: var(--slider-fill, 0%) !important;
}

.volume-slider:deep(.p-slider-handle) {
  /*set vidstach slider variable to primevue component @author liza-pohrsnichna */
  transition: transform ease var(--transition);
  inset-inline-start: var(--slider-fill, 0%) !important;
}
</style>
