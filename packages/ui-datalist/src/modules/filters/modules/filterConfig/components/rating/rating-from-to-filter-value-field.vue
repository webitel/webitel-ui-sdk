<template>
  <div class="rating-from-to-filter-value-field">
    <wt-input-number
      :label="`${t('reusable.from')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      :v="vFrom"
      :model-value="value.from"
      class="rating-from-to-filter-value-field__input"
      @update:model-value="handleInput('from', $event)"
    />

    <wt-input-number
      :label="`${t('reusable.to')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      :v="vTo"
      :model-value="value.to"
      class="rating-from-to-filter-value-field__input"
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, requiredIf } from '@vuelidate/validators';
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
				maxValue: maxValue(
					value.value.to &&
						value.value.from !== null &&
						value.value.from > value.value.to
						? value.value.to
						: Infinity,
				),
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
.rating-from-to-filter-value-field {
  display: flex;
  align-items: center;
  grid-gap: var(--spacing-xs);

  &__input {
    flex: 1;
  }
}
</style>
