<script setup>
import { ref } from 'vue';

const loading = ref(false);

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 0);
};
</script>

<template>
  <wt-button
    :loading="loading"
    @click="load"
  >
    Click me for loading
  </wt-button>
</template>

<style lang="scss" scoped></style>
