<template>
  <ul
    v-if="agents">
    <li
      v-for="(agent, index) of agents"
      :key="index"
    >
      {{ agent.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const agents = ref([]);

const getAgents = async () => {
  const { items } = await searchMethod({id: props.value});
  agents.value = items;
};

getAgents();
</script>

<style lang="scss" scoped>
</style>
