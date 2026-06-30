<script setup>
import { ref } from 'vue';

const value = ref(Date.now());
</script>

<template>
  <wt-datepicker
    v-model="value"
    label="Date Time picker"
    show-time
  />
</template>

<style scoped lang="scss"></style>
