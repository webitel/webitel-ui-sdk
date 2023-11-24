<script setup>
import { ref } from 'vue';

const value = ref([]);

const autocomplete = [
  { name: 'Vue.js', language: 'JavaScript' },
  { name: 'Adonis', language: 'JavaScript' },
  { name: 'Rails', language: 'Ruby' },
];
</script>

<template>
  <wt-tags-input
    :value="value"
    label="Tags Input"
    :options="autocomplete"
    track-by="name"
    option-label="name"
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>
