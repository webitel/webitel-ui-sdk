<script setup>
import { ref } from 'vue';

const value = ref(10);
</script>

<template>
  <wt-input-number
    v-model="value"
    label="Quantity"
    :min="0"
    :max="100"
    :step="1"
  />
</template>

<style scoped lang="scss"></style>
