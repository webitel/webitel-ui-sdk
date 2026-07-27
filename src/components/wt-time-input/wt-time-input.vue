<template>
  <wt-input-number
    v-model:model-value="model"
    :label="label"
    :label-props="labelProps"
    :name="name"
    :max="maxValue"
    :min="minValue"
		:v="v"
    :required="required"
    :disabled="disabled"
    :hide-input-info="hideInputInfo"
  />
</template>

<script setup lang="ts">
import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import type { CompatCustomValidator } from '../../mixins/validationMixin/vuelidate/useVuelidateValidation';

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
	 * Minimum selectable value
	 */
	minValue?: number;
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
	regleValidation?: SuperCompatibleRegleFieldStatus;
	/**
	 * Custom validators for vuelidate
	 */
	customValidators?: CompatCustomValidator[];
}

const props = withDefaults(defineProps<WtTimeInputProps>(), {
	label: '',
	name: '',
	maxValue: undefined,
	minValue: 0,
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
