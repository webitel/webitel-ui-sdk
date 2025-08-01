<script setup>
import { ref } from 'vue';

const headers = [
  {
    text: 'heading 1',
    value: 'name',
    sort: null,
  },
  {
    text: 'heading2',
    value: 'h2',
    sort: null,
  },
  {
    text: 'heading 3',
    value: 'h3',
  },
];

const data = ref([
  {
    id: 'id1',
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: true,
  },
  {
    id: 'id2',
    h1: 'value 1',
    h2: 'value 4',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    id: 'id3',
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
  {
    id: 'id4',
    h1: 'value 1',
    h2: 'value 2',
    h3: 'value 3',
    _isSelected: false,
  },
]);

const sort = (col, sortValue) => {
  headers.forEach((header) => {
    header.sort = null;
  })
  const column = headers.find((header) => header.value === col.value);
  column.sort = sortValue;
};
</script>

<template>
  <wt-table
    :headers="headers"
    :data="data"
    sortable
    @sort="sort"
  >
    <template #name="{ item }">
      {{ item.h1 }}
    </template>
  </wt-table>
</template>

<style scoped lang="scss"></style>
