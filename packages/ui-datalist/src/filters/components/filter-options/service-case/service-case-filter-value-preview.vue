<template>
  <ul v-if="localValue">
    <li
      v-for="({ name }, index) of localValue"
      :key="index"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { servicesSearchMethod } from './config.js';

const props = defineProps<{
  value: number[];
}>();

const localValue = ref([]);

const getLocalValue = async () => {
  const { items } = await servicesSearchMethod({
    id: props.value,
    fields: ['id', 'name'],
  });
  localValue.value = items;
};

getLocalValue();
</script>

<style scoped></style>
