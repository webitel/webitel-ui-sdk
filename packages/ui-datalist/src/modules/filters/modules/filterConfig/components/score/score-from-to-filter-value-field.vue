<template>
  <div class="score-from-to-filter-value-field">
    <wt-input-number
      v-if="model"
      :model-value="model.from"
      :max="props.numberMax"
      :min="0"
      :v="v$.model?.from"
      :label="`${t('reusable.from')}:`"
      :placeholder="t('webitelUI.filters.filterValue')"
      class="score-from-to-filter-value-field__input"
      name="score-from-to-filter-value-field-from"
      @update:model-value="handleInput('from', $event)"
    />

    <wt-input-number
      v-if="model"
      :model-value="model.to"
      :max="props.numberMax"
      :min="0"
      :v="v$.model?.to"
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
	from: number;
	to: number;
};
const model = defineModel<ModelValue>();
if (!model.value) {
	model.value = {
		from: null,
		to: null,
	};
}

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

const v$ = useVuelidate(
	computed(() => ({
		model: {
			from: {
				required: requiredIf(() => !model.value.to),
			},
			to: {
				required: requiredIf(() => !model.value.from),
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

const handleInput = (key: keyof ModelValue, value: number) => {
	const newValue = {
		...model.value,
	};
	newValue[key] = value;
	model.value = newValue;
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
