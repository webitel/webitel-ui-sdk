<template>
  <div>
    <wt-image
      :src="imageTall"
      size="lg"
      overlay-icon="zoom-in"
    />
  </div>
</template>

<script setup>
import imageTall from './assets/img_2.png';
</script>

<style lang="scss" scoped>
.wt-image {
  border: 1px solid red;
}
</style>
