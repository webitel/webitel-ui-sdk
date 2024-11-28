<script setup>
import { ref } from 'vue';
import serviceJson from './service.json';

import WtTree from './components/wt-tree/wt-tree.vue';

const data = ref(serviceJson.items);

const logElement = (event) => {
  console.log('event', event)
}
</script>

<template>
  <div
    class="playground"
    style="background: var(--content-wrapper-color);"
  >
    <wt-tree :data="data" item-label="name" children="service" @select="logElement"></wt-tree>
  </div>
</template>

<style lang="scss" scoped>
.playground {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 90px;
}


</style>
