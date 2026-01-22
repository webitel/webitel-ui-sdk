<script setup>
import { ref } from 'vue';

const value = ref('Disabled value');
</script>

<template>
  <wt-input-text
    v-model="value"
    label="Disabled Input"
    disabled
  />
</template>

<style scoped lang="scss"></style>
