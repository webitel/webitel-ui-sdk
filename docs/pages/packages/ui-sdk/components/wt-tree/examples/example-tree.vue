<template>
  <p>Selected element: {{ selectedElement }}</p>
  <wt-tree
    v-model="selectedElement"
    :data="data"
    item-label="name"
    item-data="name"
    children-prop="services"
  />
</template>

<script setup>
import { WtTree } from '@webitel/ui-sdk/components';
import { ref } from 'vue';

const selectedElement = ref('Subservice 4');
const data = ref([
  {
    id: '1',
    name: 'Catalog 1',
    services: [],
  },
  {
    id: '2',
    name: 'Catalog 2',
    services: [
      {
        id: '3',
        name: 'Service 1',
        services: [
          {
            id: '11',
            name: 'Subservice 4',
            searched: true,
            services: [],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Catalog 3',
    services: [
      {
        id: '5',
        name: 'Service 2',
        services: [
          {
            id: '6',
            name: 'Subservice 1',
            services: [],
          },
        ],
      },
      {
        id: '7',
        name: 'Service 3',
        services: [
          {
            id: '8',
            name: 'Subservice 2',
            services: [],
          },
        ],
      },
      {
        id: '9',
        name: 'Service 4',
        services: [
          {
            id: '10',
            name: 'Subservice 3',
            services: [],
          },
        ],
      },
    ],
  },
]);
</script>
