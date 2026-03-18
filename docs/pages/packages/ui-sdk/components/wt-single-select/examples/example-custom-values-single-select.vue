<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

const value = ref('');
</script>

<template>
  <div>
    <wt-single-select
      v-model="value"
      :options="options"
      label="Custom Values in Single Select"
      option-label="name"
      allow-custom-values
    />
    <pre><code>{{ value }}</code></pre>
  </div>
</template>

<style scoped lang="scss"></style>
