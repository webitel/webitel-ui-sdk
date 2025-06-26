<template>
  <p>Selected element: {{ selectedElement }}</p>
  <wt-tree
    v-model="selectedElement"
    style="height: 350px"
    :data="data"
    mode="list"
    item-label="name"
    item-data="name"
    children-prop="service"
  />
</template>

<script setup>
import { ref } from 'vue';

import { WtTree } from '@webitel/ui-sdk/components';
import serviceJson from './service.json';

const selectedElement = ref('another service 3');
const data = ref(serviceJson.items);
</script>
