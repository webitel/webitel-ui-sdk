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
import { EngineTriggerJobState } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
	value?: string[];
}>();

const { t } = useI18n();

const options = computed(() =>
	Object.values(EngineTriggerJobState).map((value) => ({
		value,
		label: t(`objects.triggerJobState.${value}`),
	})),
);

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

<style scoped></style>
