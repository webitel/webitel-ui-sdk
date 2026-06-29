<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../_internals/select-example-options.js';

const value = ref([
	options[0],
	options[1],
]);
</script>

<template>
  <wt-multi-select
    v-model="value"
    :options="options"
    label="Multi Select (chip display)"
    option-label="name"
    data-key="language"
    chips-view
  />
</template>

<style scoped lang="scss"></style>
