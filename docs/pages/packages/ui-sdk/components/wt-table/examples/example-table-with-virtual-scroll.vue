<script setup>
import { ref } from 'vue';

let index = ref(4);
const lazy = ref(true)
const loading = ref(false)
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

const getRowClass = ({id}) => {
  switch (id) {
    case 'id1':
      return 'row-success';
    case 'id2':
      return 'row-warning';
    case 'id3':
      return 'row-error';
    default:
      return '';
  }
}

const onLoading = () => {
  if (index.value > 50) {
    return;
  }

  setTimeout(() => {
  for (let i = 0; i < 20; i++) {
    data.value.push({
      id: `id${index.value}`,
      h1: 'value 1',
      h2: 'value 2',
      h3: 'value 3',
      _isSelected: true,
    })
    index.value++

  }


  }, 500)
}
</script>

<template>
  <wt-table
    class="table-scroll"
    :headers="headers"
    :data="data"
    :lazy="lazy"
    :on-loading="onLoading"
    :loading="loading"
    sortable
    grid-actions
    fixed-actions
    resizable-columns
    :row-class="getRowClass"
    @sort="sort"
  >
  </wt-table>
</template>

<style scoped lang="scss">
.table-scroll {
  height: 150px;
}
</style>
