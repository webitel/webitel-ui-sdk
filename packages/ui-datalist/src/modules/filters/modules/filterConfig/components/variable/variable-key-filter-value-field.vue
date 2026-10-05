<template>
  <div class="variable-key-filter-value-field">
    <wt-input-text
      :model-value="variable.key"
      :label="t('vocabulary.keys')"
      :v="!disableValidation && v$.variable.key"
      @update:model-value="updateVariable({ key: $event })"
    />
    <wt-input-text
      :model-value="variable.value"
      :label="t('vocabulary.values')"
      :v="!disableValidation && v$.variable.value"
      @update:model-value="updateVariable({ value: $event })"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
	type IVariableKeyFilterConfig,
	isVariableKeyFilterValue,
	type VariableKeyFilterValue,
} from './variableKeyFilterConfig';

const props = defineProps<{
	filterConfig: IVariableKeyFilterConfig;
	disableValidation?: boolean;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const model = defineModel<string | VariableKeyFilterValue>();

const { t } = useI18n();

const variable = computed<VariableKeyFilterValue>(() =>
	isVariableKeyFilterValue(model.value)
		? model.value
		: {
				key: props.filterConfig.variableKey,
				value: model.value ?? '',
			},
);

const updateVariable = (patch: Partial<VariableKeyFilterValue>) => {
	model.value = {
		...variable.value,
		...patch,
	};
};

const v$ = useVuelidate(
	computed(() => ({
		variable: {
			key: {
				required,
			},
			value: {
				required,
			},
		},
	})),
	{
		variable,
	},
	{
		$autoDirty: true,
	},
);

if (!props.disableValidation) v$.value.$touch();

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
.variable-key-filter-value-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
