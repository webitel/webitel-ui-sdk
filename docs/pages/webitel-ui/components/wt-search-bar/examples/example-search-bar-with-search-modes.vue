<script setup>

import { ref } from 'vue';

const value = ref('');

const searchModeOptions = [
  {
    value: 'mode 1',
    text: 'Mode 1',
  },
  {
    value: 'mode 2',
    text: 'Mode 2',
  },
];

const searchMode = ref(searchModeOptions[0]);
</script>

<template>
  <wt-search-bar
    :value="value"
    placeholder="Search"
    hint="I have search modes!"
    :searchMode="searchMode"
    :searchModeOptions="searchModeOptions"
    @input="value = $event"
    @change:search-mode="searchMode = $event"
  />
  <p>Value: {{ value }}</p>
  <p>Search mode: {{ searchMode }}</p>
</template>

<style scoped lang="scss">

</style>
