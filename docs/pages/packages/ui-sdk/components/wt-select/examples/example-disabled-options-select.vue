<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from './_internals/select-example-options.js';

const value = ref(options[0]);
</script>

<template>
  <wt-single-select
    :model-value="value"
    :options="options"
    label="Select"
    option-label="name"
    disabled-options
  />
</template>

<style scoped lang="scss"></style>
