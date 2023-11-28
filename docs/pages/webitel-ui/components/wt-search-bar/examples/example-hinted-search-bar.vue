<script setup>

import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <wt-search-bar
    :value="value"
    placeholder="Search"
    hint="I am hinted!"
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>
