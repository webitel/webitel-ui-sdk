<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../_internals/select-example-options.js';

const value = ref([]);
</script>

<template>
  <div>
    <wt-multi-select
      v-model="value"
      :options="options"
      label="Custom Values in Multi Select"
      option-label="name"
      data-key="language"
      allow-custom-values
      chips-view
    />
    <pre><code>{{ value }}</code></pre>
  </div>
</template>

<style scoped lang="scss"></style>
