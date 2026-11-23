<template>
  <ul>
    <li
      v-for="(label, index) of arrayValues"
      :key="index"
    >
      {{ label }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useInteractionHandledByOptions } from '../../composables/useInteractionHandledByOptions';

const props = defineProps<{
	value?: string[];
}>();

const { options } = useInteractionHandledByOptions();

const arrayLabels = computed(() =>
	options.value.reduce<Record<string, string>>((acc, { value, label }) => {
		acc[value] = label;
		return acc;
	}, {}),
);

const arrayValues = computed(() =>
	(props.value ?? []).map((v) => arrayLabels.value[v] || v),
);
</script>
