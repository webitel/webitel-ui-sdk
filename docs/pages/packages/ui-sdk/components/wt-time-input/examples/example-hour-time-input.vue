<script setup>
import { ref } from 'vue';

const value = ref(14);
</script>

<template>
  <wt-time-input
    v-model:model-value="value"
    label="hour"
    :max-value="23"
  />
</template>

<style scoped lang="scss"></style>
