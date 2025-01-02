<script setup>
import { ref } from 'vue';

const options = ['Option 1', 'Option 2'];
const selectedList = ref([options[0]]);
</script>

<template>
  <wt-checkbox
    :selected="selectedList"
    :value="options[0]"
    label="Multiple checkbox 1"
    @change="selectedList = $event"
  />
  <wt-checkbox
    :selected="selectedList"
    :value="options[2]"
    label="Multiple checkbox 2"
    @change="selectedList = $event"
  />
</template>

<style lang="scss" scoped>

</style>
