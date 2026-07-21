<script setup>
import { ref } from 'vue';

const value = ref(Date.now());
</script>

<template>
  <wt-datepicker
    v-model="value"
    label="Datepicker"
  />
</template>

<style scoped lang="scss"></style>
