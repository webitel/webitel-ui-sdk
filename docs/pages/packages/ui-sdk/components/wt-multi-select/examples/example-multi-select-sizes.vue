<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../_internals/select-example-options.js';

const small = ref([
	options[0],
]);
const normal = ref([
	options[0],
]);
const large = ref([
	options[0],
]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-multi-select
      v-model="small"
      :options="options"
      label="Small"
      option-label="name"
      data-key="language"
      size="sm"
    />
    <wt-multi-select
      v-model="normal"
      :options="options"
      label="Normal"
      option-label="name"
      data-key="language"
    />
    <wt-multi-select
      v-model="large"
      :options="options"
      label="Large"
      option-label="name"
      data-key="language"
      size="lg"
    />
  </div>
</template>

<style scoped lang="scss"></style>
