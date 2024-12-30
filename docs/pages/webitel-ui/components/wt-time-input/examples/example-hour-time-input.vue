<script setup>
import { ref } from 'vue';

const value = ref(14);
</script>

<template>
  <wt-time-input
    :value="value"
    label="hour"
    :max-value="23"
    @input="value = $event"
  />
</template>

<style scoped lang="scss"></style>
