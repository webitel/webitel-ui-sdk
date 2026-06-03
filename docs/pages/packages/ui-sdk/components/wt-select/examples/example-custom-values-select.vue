<script setup>
import { ref } from 'vue';

import { frameworkOptions as options } from './_internals/select-example-options.js';

const multipleValue = ref([
	options[0],
]);
const singleValue = ref('');
</script>

<template>
  <div>
    <wt-select :options="options" :value="multipleValue" allow-custom-values label="Custom Values in Multiple Select"
      multiple track-by="name" @input="multipleValue = $event" />

    <pre><code>{{ multipleValue }}</code></pre>
  </div>

  <div>
    <wt-select :options="options" :value="singleValue" allow-custom-values label="Custom Values in Single Select"
      track-by="name" @input="singleValue = $event" />

    <pre><code>{{ singleValue }}</code></pre>
  </div>
</template>
