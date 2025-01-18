<template>
  <p>Selected element: {{ selectedElement }}</p>
  <div style="display: flex; gap: 16px">
    <wt-tree
      v-model="selectedElement"
      style="height: 300px; flex: 0 0 45%"
      :data="data"
      item-label="name"
      item-data="name"
      children-prop="service"
    ></wt-tree>
    <wt-tree
      v-model="selectedElement"
      style="height: 300px; flex: 0 0 45%"
      :data="data"
      mode="list"
      item-label="name"
      item-data="name"
      children-prop="service"
    ></wt-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import WtTree from '../../../../../../src/components/wt-tree/wt-tree.vue';
import serviceJson from './service.json';

const selectedElement = ref('another service 3');
const data = ref(serviceJson.items);
</script>
