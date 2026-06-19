<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../_internals/select-example-options.js';

const value = ref('');
</script>

<template>
  <wt-single-select
    v-model="value"
    :options="options"
    show-clear
    label="Single Select (empty)"
    option-label="name"
    data-key="language"
  />
</template>

<style scoped lang="scss"></style>
