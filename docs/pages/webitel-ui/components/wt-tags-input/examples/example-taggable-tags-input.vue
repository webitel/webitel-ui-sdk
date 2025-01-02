<script setup>
import { ref } from 'vue';

const value = ref([]);

const autocomplete = [];
</script>

<template>
  <wt-tags-input
    :value="value"
    label="Taggable Tags Input"
    :options="autocomplete"
    track-by="name"
    option-label="name"
    taggable
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>
