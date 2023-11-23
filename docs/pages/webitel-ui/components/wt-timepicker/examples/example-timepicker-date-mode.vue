<script setup>
import { ref } from 'vue';

const value = ref(Date.now());
</script>

<template>
  <wt-timepicker
    v-model="value"
    date-mode
  />
  value: {{ value }}
</template>

<style scoped lang="scss">

</style>
