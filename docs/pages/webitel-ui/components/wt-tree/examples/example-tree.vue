<template>
  <p>Selected element: {{ selectedElement }}</p>
  <wt-tree
      v-model="selectedElement"
      :data="data"
      item-label="name"
      item-data="name"
      children="service"
  ></wt-tree>
</template>

<script setup>
import { ref } from 'vue';
import WtTree from '../../../../../../src/components/wt-tree/wt-tree.vue';
import serviceJson from './service.json';

const selectedElement = ref('another service 3');
const data = ref(serviceJson.items);
</script>

<style scoped lang="scss">

</style>
