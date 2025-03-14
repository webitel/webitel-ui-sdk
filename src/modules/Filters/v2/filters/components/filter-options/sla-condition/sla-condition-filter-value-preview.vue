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

import { slasConditionsSearchMethod } from './config.js';

const props = defineProps<{
  value: {
    selection: string;
    conditions: string;
  };
}>();

const localValue = ref([]);

const getLocalValue = async () => {
  const { items } = await slasConditionsSearchMethod({
    parentId: props.value?.selection,
    id: props.value?.conditions,
  });
  localValue.value = items;
};

getLocalValue();
</script>

<style lang="scss" scoped></style>
