<script setup>
import { ref } from 'vue';

const value = ref(false);
</script>

<template>
  <wt-switcher
    :value="value"
    label="Label Left Switcher"
    label-left
    @change="value = $event"
  />
</template>

<style scoped lang="scss"></style>
