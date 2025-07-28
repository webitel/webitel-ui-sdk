<script setup>
import { ref } from 'vue';

const selected = ref(false);
</script>

<template>
  <wt-checkbox
    v-model:selected="selected"
    label="Checkbox"
  />
</template>

<style scoped lang="scss"></style>
