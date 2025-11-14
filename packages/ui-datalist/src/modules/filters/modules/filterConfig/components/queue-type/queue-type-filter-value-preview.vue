<template>
  <ul>
    <li
      v-for="({ label }, index) of arrayValues"
      :key="index"
    >
      {{ label }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useQueueTypeOptions } from '../../composables/useQueueTypeOptions';
import { computed } from 'vue';

const props = defineProps<{
  value: number[];
}>();

const { options } = useQueueTypeOptions();

const arrayLabels = computed(() =>
  options.value.reduce((acc, { value, label }) => {
    acc[value] = label;
    return acc;
  }, {})
);

const arrayValues = computed(() =>
  props.value.map((v) => arrayLabels.value[v] || v)
);
</script>

<style scoped></style>
