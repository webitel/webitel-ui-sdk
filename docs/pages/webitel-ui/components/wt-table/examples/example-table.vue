<script setup>
const headers = [
  {
    text: 'heading 1',
    value: 'h1',
    sort: 'desc',
  },
  {
    text: 'heading2',
    value: 'h2',
    sort: 'asc',
  },
  {
    text: 'heading 3',
    value: 'h3',
  },
];

const data = [
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
];
</script>

<template>
  <wt-table
    :headers="headers"
    :data="data"
    sortable
  />
</template>

<style scoped lang="scss">

</style>
