<script setup>
import { ref } from 'vue';

const value = ref(332);
</script>

<template>
  <wt-timepicker v-model:model-value="value" format="hh:mm:ss" label="Timepicker" />
  <span>value: {{ value }}</span>
</template>
