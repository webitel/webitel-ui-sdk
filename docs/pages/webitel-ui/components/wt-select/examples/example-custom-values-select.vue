<script setup>
import { ref } from 'vue';

import wtSelectV2 from '../../../../../../src/components/wt-select/wt-select-v2.vue';

const options = [
  { id: 'Vue.js1', name: 'JavaScript' },
  { id: 'Adonis2', name: 'JavaScript' },
  { id: 'Rails3', name: 'Ruby' },
  { id: 'Sinatra4', name: 'Ruby' },
  { id: 'Laravel5', name: 'PHP' },
  { id: 'Phoenix6', name: 'Elixir' },
  { id: 'Vue.js7', name: 'JavaScript' },
  { id: 'Adonis8', name: 'JavaScript' },
  { id: 'Rails9', name: 'Ruby' },
  { id: 'Sinatra10', name: 'Ruby' },
  { id: 'Laravel11', name: 'PHP' },
  { id: 'Phoenix12', name: 'Elixir' },
];

const multipleValue = ref([options[0]]);
const singleValue = ref('');
</script>

<template>
  <div>
    <wt-select
      :options="options"
      :value="multipleValue"
      allow-custom-values
      label="Custom Values in Multiple Select"
      multiple
      track-by="id"
      @input="multipleValue = $event"
    />

    <wt-select-v2
      :options="options"
      :value="multipleValue"
      allow-custom-values
      label="Custom Values in Multiple Select"
      multiple
      track-by="id"
      @input="multipleValue = $event"
    />

    <pre><code>{{ multipleValue }}</code></pre>
  </div>

  <div>
    <wt-select
      :options="options"
      :value="singleValue"
      allow-custom-values
      label="Custom Values in Single Select"
      track-by="id"
      @input="singleValue = $event"
    />

    <pre><code>{{ singleValue }}</code></pre>
  </div>
</template>

<style lang="scss" scoped></style>
