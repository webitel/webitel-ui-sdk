<template>
  <ul>
    <li
      v-for="(type, index) of props.value"
      :key="index"
    >
      {{ displayValue(type) }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useQueueTypeOptions } from '../../composables/useQueueTypeOptions';

const props = defineProps<{
  value: number[];
}>();

const { options: QueueTypeMappingOptions } = useQueueTypeOptions();

const displayValue = (value) => {
  return QueueTypeMappingOptions.value.find((option) => option.value === value)?.label || value;
}
</script>

<style scoped></style>
