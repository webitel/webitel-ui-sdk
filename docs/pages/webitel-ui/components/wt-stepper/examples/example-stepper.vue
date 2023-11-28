<script setup>
import { ref } from 'vue';

const steps = [
  { name: 'Step 1' },
  { name: 'Step 2' },
  { name: 'Step 3' },
];

const active = ref(1);
</script>

<template>
  <wt-stepper
    :active-step="active"
    :steps="steps"
  />

  <wt-button
    @click="active < 3 ? active++ : active = 1"
  >
    Next step
  </wt-button>
</template>

<style lang="scss" scoped>

</style>
