<script setup>
import { ref } from 'vue';

const selected = ref(true);
</script>

<template>
  <wt-checkbox
    v-model="selected"
    label="Checkbox"
    disabled
  />
</template>

<style scoped lang="scss"></style>
