<template>
  <wt-input-number
    v-model:model-value="model"
    :label="label"
    :label-props="labelProps"
    :name="name"
    :max="maxValue"
    :min="0"
		:v="v"
    :required="required"
    :disabled="disabled"
    :hide-input-info="hideInputInfo"
  />
</template>

<script setup lang="ts">
import type { RegleFieldStatus } from '@regle/core';

interface WtTimeInputProps {
	/**
	 * Form input label
	 */
	label?: string;
	/**
	 * Input id name for label association
	 */
	name?: string;
	/**
	 * Time type: day, minute, second
	 */
	maxValue?: number;
	/**
	 * Native input required attribute
	 */
	required?: boolean;
	/**
	 * Native input disabled attribute
	 */
	disabled?: boolean;
	/**
	 * Object with props, passed down to wt-label as props
	 */
	labelProps?: Record<string, unknown>;
	/**
	 * Hides input info section
	 */
	hideInputInfo?: boolean;
	/**
	 * Vuelidate validation object
	 */
	v?: Record<string, unknown>;
	/**
	 * Regle validation object
	 */
	regleValidation?: RegleFieldStatus<number>;
	/**
	 * Custom validators for vuelidate
	 */
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<WtTimeInputProps>(), {
	label: '',
	name: '',
	maxValue: undefined,
	required: false,
	disabled: false,
	labelProps: () => ({}),
	hideInputInfo: false,
	v: null,
	regleValidation: null,
	customValidators: () => [],
});

/**
 * Current input value (v-model)
 */
const model = defineModel<number>();
</script>
