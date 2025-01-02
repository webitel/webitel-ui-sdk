<script setup>
import { ref } from 'vue';

const value = ref(332);
</script>

<template>
  <wt-timepicker
    :value="value"
    label="Timepicker"
    @input="value = $event"
  />
  <span>value: {{ value }}</span>
</template>

<style scoped lang="scss"></style>
