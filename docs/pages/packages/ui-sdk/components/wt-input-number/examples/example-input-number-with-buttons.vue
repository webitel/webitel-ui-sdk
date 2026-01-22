<script setup>
import { ref } from 'vue';

const value = ref(0);
</script>

<template>
  <wt-input-number
    v-model="value"
    label="Count"
    show-buttons
    :min="0"
    :max="100"
  />
</template>

<style scoped lang="scss"></style>
