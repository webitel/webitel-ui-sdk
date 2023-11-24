<script setup>
import { ref } from 'vue';

const autocomplete = [
  { name: 'Vue.js', language: 'JavaScript' },
  { name: 'Adonis', language: 'JavaScript' },
  { name: 'Rails', language: 'Ruby' },
];

const value = ref([
  autocomplete[0],
  autocomplete[1],
]);
</script>

<template>
  <wt-tags-input
    :value="value"
    label="Tags Input"
    :options="autocomplete"
    track-by="name"
    option-label="name"
    disabled
    @input="value = $event"
  />
  <wt-tags-input
    :value="[]"
    label="Empty Tags Input"
    :options="autocomplete"
    track-by="name"
    option-label="name"
    disabled
  />
</template>

<style scoped lang="scss">

</style>
