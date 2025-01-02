<script setup>
import { ref } from 'vue';

const selected = ref(false);
</script>

<template>
  <wt-checkbox
    :selected="selected"
    label="Checkbox"
    @change="selected = $event"
  />
</template>

<style scoped lang="scss"></style>
