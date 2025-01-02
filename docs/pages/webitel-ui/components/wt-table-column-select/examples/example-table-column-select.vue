<script setup>
import { ref } from 'vue';

const headers = ref([
  {
    value: 'column 1',
    text: 'Column 1',
    show: true,
  },
  {
    value: 'column 2',
    text: 'Column 2',
    show: false,
  },
]);
</script>

<template>
  <wt-table-column-select
    :headers="headers"
    @change="headers = $event"
  />
</template>

<style scoped lang="scss">

</style>
