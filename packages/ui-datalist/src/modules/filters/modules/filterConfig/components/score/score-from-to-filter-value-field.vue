<template>
  <div class="score-from-to-filter-value-field">
    <wt-input-number
      :model-value="value.from"
      :max="props.numberMax"
      :min="0"
      :v="vFrom"
      :label="`${t('reusable.from')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="score-from-to-filter-value-field__input"
      name="score-from-to-filter-value-field-from"
      @update:model-value="handleInput('from', $event)"
    />

    <wt-input-number
      :model-value="value.to"
      :max="props.numberMax"
      :min="0"
      :v="vTo"
      :label="`${t('reusable.to')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="score-from-to-filter-value-field__input"
      name="score-from-to-filter-value-field-to"
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { requiredIf } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = {
	from: number | null;
	to: number | null;
};
const model = defineModel<ModelValue>({
	default: (): ModelValue => ({
		from: null,
		to: null,
	}),
});

const value = computed<ModelValue>(
	() =>
		model.value ?? {
			from: null,
			to: null,
		},
);

const props = withDefaults(
	defineProps<{
		numberMax?: number;
	}>(),
	{
		numberMax: 100,
	},
);

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const { t } = useI18n();

const v$ = useVuelidate<{
	model: ModelValue;
}>(
	computed(() => ({
		model: {
			from: {
				required: requiredIf(() => !value.value.to),
			},
			to: {
				required: requiredIf(() => !value.value.from),
			},
		},
	})),
	{
		model,
	},
	{
		$autoDirty: true,
	},
);
v$.value.$touch();

const vFrom = computed(() => {
	const modelValidation = v$.value.model;
	if (!modelValidation) return undefined;
	return modelValidation.from;
});
const vTo = computed(() => {
	const modelValidation = v$.value.model;
	if (!modelValidation) return undefined;
	return modelValidation.to;
});

const handleInput = (key: keyof ModelValue, newFieldValue: number) => {
	model.value = {
		...value.value,
		[key]: newFieldValue,
	};
};

watch(
	() => v$.value.$invalid,
	(invalid) => {
		emit('update:invalid', invalid);
	},
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped>
.score-from-to-filter-value-field {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  grid-gap: var(--spacing-xs);
}
</style>
