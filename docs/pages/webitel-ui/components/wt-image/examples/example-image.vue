<template>
  <div style="display: flex; gap: var(--spacing-sm);">
    <wt-image
      :src="imageWide"
      size="lg"
    />
    <wt-image
      :src="imageTall"
      size="lg"
    />
  </div>
</template>

<script setup>
import imageWide from './assets/img_1.png';
import imageTall from './assets/img_2.png';

const props = defineProps({});

const emit = defineEmits([]);
</script>

<style lang="scss" scoped>
.wt-image {
  border: 1px solid red;
}
</style>
