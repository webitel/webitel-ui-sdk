<template>
  <ul>
    <li
      v-for="(status, index) of props.value"
      :key="index"
    >
      {{ displayValue(status) }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useAgentStatusOptions } from '../../composables/useAgentStatusOptions';

const props = defineProps<{
  value: number[];
}>();

const { options: AgentStatusMappingOptions } = useAgentStatusOptions();

const displayValue = (value) => {
  return AgentStatusMappingOptions.value.find((option) => option.value === value)?.label || value;
}

</script>

<style scoped></style>
