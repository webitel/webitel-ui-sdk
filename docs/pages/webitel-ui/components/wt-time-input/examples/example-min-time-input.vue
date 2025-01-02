<script setup>
import { ref } from 'vue';

const value = ref(25);
</script>

<template>
  <wt-time-input
    :value="value"
    label="min"
    :max-value="59"
    @input="value = $event"
  />
</template>

<style scoped lang="scss"></style>
