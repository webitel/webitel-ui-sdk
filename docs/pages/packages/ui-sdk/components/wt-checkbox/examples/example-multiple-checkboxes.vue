<script setup>
import { ref } from 'vue';

const options = ['Option 1', 'Option 2'];
const selectedList = ref([options[0]]);
</script>

<template>
  <wt-checkbox
    v-model:selected="selectedList"
    :value="options[0]"
    label="Multiple checkbox 1"
  />
  <wt-checkbox
    v-model:selected="selectedList"
    :value="options[1]"
    label="Multiple checkbox 2"
  />
</template>

<style lang="scss" scoped></style>
