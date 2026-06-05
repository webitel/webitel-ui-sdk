<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from './_internals/select-example-options.js';

const value = ref([
	options[0],
	options[1],
]);
</script>

<template>
  <wt-select
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    :close-on-select="false"
    multiple
    @input="value = $event"
  />
</template>

<style scoped lang="scss"></style>
