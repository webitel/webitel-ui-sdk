<template>
  <div class="duration-filter">
    <wt-timepicker
      v-if="model"
      :label="t('reusable.from')"
      :model-value="model.from"
      :v="vFrom"
      format="hh:mm:ss"
      @update:model-value="handleInput('from', $event)"
    />
    <wt-timepicker
      v-if="model"
      :label="t('reusable.to')"
      :model-value="model.to"
      :v="vTo"
      format="hh:mm:ss"
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type ModelValue = {
	from: number;
	to: number;
};

const model = defineModel<ModelValue>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

if (!model.value) {
	model.value = {
		from: 0,
		to: 0,
	};
}

const isValueEmpty = () => {
	return !!model?.value?.to || !!model?.value?.from;
};

const v$ = useVuelidate<{
	model: ModelValue;
}>(
	computed(() => ({
		model: {
			from: {
				required: isValueEmpty,
			},
			to: {
				required: isValueEmpty,
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
//.duration-filter {}
</style>
