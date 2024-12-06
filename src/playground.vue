<script setup>
import { ref } from 'vue';
import serviceJson from './service.json';

import WtTree from './components/wt-tree/wt-tree.vue';

const data = ref(serviceJson.items);
const selectedElement = ref("43")
</script>

<template>
  <div
    class="playground"
  >
    selectedElement {{ selectedElement }}
    <wt-tree
      v-model="selectedElement"
      :data="data"
      item-label="name"
      item-data="id"
      children="service"
      style="height: 420px"
    ></wt-tree>
  </div>
</template>

<style lang="scss" scoped>
.playground {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 90px;
}
</style>
