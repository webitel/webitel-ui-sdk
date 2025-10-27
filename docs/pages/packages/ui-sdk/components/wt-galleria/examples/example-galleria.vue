<template>
  <wt-galleria 
    v-model:visible="visible"
    :value="value"
  />

  <wt-button
    @click="visible = true"
  >
    Open Galleria
  </wt-button>
</template>

<script setup>
import image1 from './assets/img_1.png';
import image2 from './assets/img_2.png';
import image3 from './assets/img_3.png';
import { ref } from 'vue';

const visible = ref(false);

const value = ref([
  { src: image1, thumbnailSrc: image1, title: 'Image 1' },
  { src: image2, thumbnailSrc: image2, title: 'Image 2' },
  { src: image3, thumbnailSrc: image3, title: 'Image 3' },
  { src: image3, thumbnailSrc: image3, title: 'Image 4' },
  { src: image3, thumbnailSrc: image3, title: 'Image 5' },
  { src: image3, thumbnailSrc: image3, title: 'Image 6' },
]);
</script>