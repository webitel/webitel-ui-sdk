<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from './_internals/select-example-options.js';

const value = ref(options[0]);
</script>

<template>
  <wt-select
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    disabled
    @input="value = $event"
  />
  <wt-select
    :value="''"
    :options="options"
    label="Select"
    track-by="name"
    disabled
  />
</template>

<style scoped lang="scss"></style>
