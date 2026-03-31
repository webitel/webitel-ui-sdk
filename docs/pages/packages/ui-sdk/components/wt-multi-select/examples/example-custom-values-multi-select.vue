<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

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
      is-chip
    />
    <pre><code>{{ value }}</code></pre>
  </div>
</template>

<style scoped lang="scss"></style>
