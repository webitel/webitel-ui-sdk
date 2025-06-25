<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>

<template>
  <wt-switcher
    :value="value"
    label="Switcher"
    @change="value = $event"
  />
</template>

<style scoped lang="scss"></style>
