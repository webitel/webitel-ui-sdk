<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

const value = ref([
	options[0],
]);
</script>

<template>
  <wt-multi-select
    v-model="value"
    :options="options"
    label="Multi Select"
    option-label="name"
    data-key="language"
    disabled-options
  />
</template>

<style scoped lang="scss"></style>
