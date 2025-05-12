<script setup>
import PButton from 'primevue/button';

import WtButton from './components/wt-button/wt-button.vue';
</script>

<template>
  <div class="test-div">
    <wt-button>WEBITER</wt-button>
    <p-button color="primary">PRIMEVUE</p-button>
  </div>
</template>

<style lang="scss" scoped>
.test-div {
  display: flex;
  gap: 12px;
  padding: 20px;
}

//.p-button {
//  font-size: 12px;
//  font-weight: 600;
//}
</style>
