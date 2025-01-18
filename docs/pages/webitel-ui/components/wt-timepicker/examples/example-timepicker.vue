<script setup>
import { ref } from 'vue';

const value = ref(332);
</script>

<template>
  <wt-timepicker
    :value="value"
    format="dd:hh:mm:ss"
    label="Timepicker"
    @input="value = $event"
  />
  <span>value: {{ value }}</span>
</template>

<style lang="scss" scoped></style>
