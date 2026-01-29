<script setup>
import { ref } from 'vue';

const value = ref(25);
</script>

<template>
  <wt-time-input
    v-model:model-value="value"
    label="min"
    :max-value="59"
  />
</template>

<style scoped lang="scss"></style>
