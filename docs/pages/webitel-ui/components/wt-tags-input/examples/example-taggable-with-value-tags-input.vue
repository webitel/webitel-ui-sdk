<script setup>
import { ref } from 'vue';

const value = ref([
  { label: 'Vue.js', text: 'JavaScript' },
  { label: 'Vue3.js', text: 'JavaScript' },
  { label: 'Vue2.js', text: 'JavaScript' }
]);

const autocomplete = [
  { label: 'Vue.js', text: 'JavaScript' }
];
</script>

<template>
  <wt-tags-input
    :value="value"
    label="Taggable Tags Input"
    :options="autocomplete"
    track-by="label"
    option-label="label"
    taggable
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>
