<script setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <wt-input-text
    v-model="value"
    label="Username"
    placeholder="Enter username"
  />
</template>

<style scoped lang="scss"></style>
