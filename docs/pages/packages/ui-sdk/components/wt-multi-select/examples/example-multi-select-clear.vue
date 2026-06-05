<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

const value = ref([]);
</script>

<template>
  <wt-multi-select
    v-model="value"
    :options="options"
    show-clear
    label="Multi Select (with clear)"
    option-label="name"
    data-key="language"
  />
</template>

<style scoped lang="scss"></style>
