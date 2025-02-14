<template>
  <ul
    v-if="queues">
    <li
      v-for="(queue, index) of queues"
      :key="index"
    >
      {{ queue.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const queues = ref([]);

const getQueues = async () => {
  const { items } = await searchMethod({id: props.value});
  queues.value = items;
};

getQueues();
</script>

<style lang="scss" scoped>
</style>
