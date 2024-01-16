<script setup>
import { ref } from 'vue';

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
const singleValue = ref({});
</script>

<template>
  <div>
    <wt-select
      :value="multipleValue"
      :options="options"
      label="Taggable Multiple Select"
      track-by="id"
      multiple
      taggable
      @input="multipleValue = $event"
    />

    <pre><code>{{ multipleValue }}</code></pre>
  </div>

  <div>
    <wt-select
      :value="singleValue"
      :options="options"
      label="Taggable Single Select"
      track-by="id"
      taggable
      @input="singleValue = $event"
    />

    <pre><code>{{ singleValue }}</code></pre>
  </div>
</template>

<style scoped lang="scss">

</style>
