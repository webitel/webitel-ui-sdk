<template>
  <ul
    v-if="gateways">
    <li
      v-for="(gateway, index) of gateways"
      :key="index"
    >
      {{ gateway.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const gateways = ref([]);

const getGateways = async () => {
  const { items } = await searchMethod({id: props.value});
  gateways.value = items;
};

getGateways();
</script>

<style lang="scss" scoped>
</style>
