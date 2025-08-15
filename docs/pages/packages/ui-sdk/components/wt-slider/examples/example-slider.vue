<script setup>
import { ref } from 'vue';

const number = ref(70);
</script>

<template>
  <wt-slider
    v-model="number"
    :min="0"
    :max="100"
    :step="1"
  />
</template>

<style scoped lang="scss"></style>
