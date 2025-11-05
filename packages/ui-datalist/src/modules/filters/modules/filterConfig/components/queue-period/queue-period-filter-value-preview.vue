<template>
  <ul>
    <li
      v-for="(period, index) of props.value"
      :key="index"
    >
      {{ displayValue(period) }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useQueuePeriodOptions } from '../../composables/useQueuePeriodOptions';

const props = defineProps<{
  value: number[];
}>();

const { options: QueuePeriodMappingOptions } = useQueuePeriodOptions();

const displayValue = (value) => {
  return QueuePeriodMappingOptions.value.find((option) => option.value === value)?.label || value;
}

</script>

<style scoped></style>
