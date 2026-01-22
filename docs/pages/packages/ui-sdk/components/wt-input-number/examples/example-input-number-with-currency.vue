<script setup>
import { ref } from 'vue';

const price = ref(99.99);
</script>

<template>
  <wt-input-number
    v-model="price"
    label="Price"
    :min="0"
    :step="0.01"
    :min-fraction-digits="2"
    :max-fraction-digits="2"
  >
    <template #prefix>
      $
    </template>
  </wt-input-number>
</template>

<style scoped lang="scss"></style>
