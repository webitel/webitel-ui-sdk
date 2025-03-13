<template>
  <ul
    v-if="localValue">
    <li
      v-for="({ name }, index) of localValue"
      :key="index"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { caseCloseReasonsSearchMethod } from './config'
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const localValue = ref([]);

const getLocalValue = async () => {
  const { items } = await caseCloseReasonsSearchMethod({
    parentId: props.value?.selection,
    id: props.value?.conditions });
  localValue.value = items;
};

getLocalValue();
</script>

<style lang="scss" scoped>
</style>
