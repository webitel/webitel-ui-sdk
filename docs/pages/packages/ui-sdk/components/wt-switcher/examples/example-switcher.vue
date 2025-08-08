<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>

<template>
  <wt-switcher
    v-model="value"
    label="Switcher"
  />
</template>

<style scoped lang="scss"></style>
