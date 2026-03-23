<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

const value = ref(options[0]);
</script>

<template>
  <wt-single-select
    v-model="value"
    :options="options"
    label="Single Select"
    option-label="name"
    disabled
  />
  <wt-single-select
    model-value=""
    :options="options"
    label="Single Select (empty)"
    option-label="name"
    disabled
  />
</template>

<style scoped lang="scss"></style>
