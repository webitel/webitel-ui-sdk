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

import { caseCloseReasonsSearchMethod } from './config';

const props = defineProps<{
  value: number[];
}>();

const localValue = ref([]);

const getLocalValue = async () => {
  const { items } = await caseCloseReasonsSearchMethod({
    parentId: props.value?.selection,
    id: props.value?.conditions,
  });
  localValue.value = items;
};

getLocalValue();
</script>

<style scoped></style>
