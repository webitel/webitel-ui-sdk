<script setup>
import { ref } from 'vue';

const number = ref(70);
</script>

<template>
  <wt-slider
    :value="number"
    :min="0"
    :max="100"
    :step="1"
    @input="number = $event"
  />
</template>

<style scoped lang="scss">

</style>
