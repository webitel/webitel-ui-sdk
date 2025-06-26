<script setup>
import { ref } from 'vue';

import wtSelectV2 from '../../../../../../../src/components/wt-select/wt-select-v2.vue';

const options = [
  { name: 'Vue.js1', language: 'JavaScript' },
  { name: 'Adonis2', language: 'JavaScript' },
  { name: 'Rails3', language: 'Ruby' },
  { name: 'Sinatra4', language: 'Ruby' },
  { name: 'Laravel5', language: 'PHP' },
  { name: 'Phoenix6', language: 'Elixir' },
  { name: 'Vue.js7', language: 'JavaScript' },
  { name: 'Adonis8', language: 'JavaScript' },
  { name: 'Rails9', language: 'Ruby' },
  { name: 'Sinatra10', language: 'Ruby' },
  { name: 'Laravel11', language: 'PHP' },
  { name: 'Phoenix12', language: 'Elixir' },
];

const value = ref(options[0]);
const empty = ref('');
</script>

<template>
  <wt-select
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    @input="value = $event"
  />
  <wt-select-v2
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    @input="value = $event"
  />
  <wt-select
    :value="empty"
    :options="options"
    label="Select"
    track-by="name"
  />
  <wt-select-v2
    :value="empty"
    :options="options"
    label="Select"
    track-by="name"
  />
</template>

<style scoped lang="scss"></style>
