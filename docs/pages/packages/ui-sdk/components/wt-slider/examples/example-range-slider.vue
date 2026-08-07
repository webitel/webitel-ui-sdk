<script setup>
import { ref } from 'vue';

const range = ref([
	20,
	80,
]);
</script>

<template>
  <wt-slider
    v-model="range"
    range
    :min="0"
    :max="100"
    :step="1"
  />
</template>

<style scoped lang="scss"></style>
