<script setup>
import { ref } from 'vue';

const src = ref(
  'https://cdn6.sefon.pro/files/prev/1/The%20Eagles%20-%20Hotel%20California%20%28192kbps%29.mp3',
);
</script>

<template>
  <!--  <wt-button @click="src = 'https://cdn6.sefon.pro/files/prev/1/The%20Eagles%20-%20Hotel%20California%20%28192kbps%29.mp3'" />-->
  <wt-player
    :src="src"
    :autoplay="false"
  />
</template>

<style scoped lang="scss"></style>
