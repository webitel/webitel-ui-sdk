<template>
  <div class="wt-input-number">
    <wt-label
      v-if="hasLabel"
      v-bind="labelProps"
      :disabled="disabled"
      :for="inputId"
      :invalid="invalid"
    >
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <p-input-group>
      <p-input-group-addon 
        v-if="$slots.prefix"
        class="wt-input-number__addon typo-body-1"
      >
        <slot name="prefix" />
      </p-input-group-addon>
      <p-input-number
        :id="inputId"
        ref="inputNumber"
        :model-value="model"
        :use-grouping="useGrouping"
        :disabled="disabled"
        :invalid="invalid"
        :min="min"
        :max="max"
        :step="step"
        :min-fraction-digits="minFractionDigits"
        :max-fraction-digits="maxFractionDigits"
        :placeholder="placeholder || label"
        :show-buttons="showButtons"
        input-class="wt-input-number__input typo-body-1"
        v-bind="$attrs"
        @keyup="handleKeyup"
        @input="emit('update:modelValue', $event.value)"
      >
      <template #incrementbuttonicon>
          <wt-icon
            :size="ComponentSize.SM"
            :disabled="disabled"
            icon="arrow-up"
          />
      </template>
      <template #decrementbuttonicon>
          <wt-icon
            :size="ComponentSize.SM"
            :disabled="disabled"
            icon="arrow-down"
          />
      </template>
      </p-input-number>
      <p-input-group-addon 
        v-if="$slots.suffix"
        class="wt-input-number__addon typo-body-1"
      >
        <slot name="suffix" />
      </p-input-group-addon>
    </p-input-group>
    <wt-message
      v-if="isValidation && validationText && !hideInputInfo"
      :color="validationTextColor"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import type { RegleFieldStatus } from '@regle/core';
import type { InputNumberProps } from 'primevue';
import {
	computed,
	defineEmits,
	defineModel,
	onMounted,
	toRefs,
	useSlots,
	useTemplateRef,
} from 'vue';

import { useInputControl } from '../../composables';
import { ComponentSize, MessageColor, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';

interface WtInputNumberProps extends /* @vue-ignore */ InputNumberProps {
	label?: string;
	labelProps?: Record<string, unknown>;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	min?: number;
	max?: number;
	step?: number;
	useGrouping?: boolean;
	minFractionDigits?: number;
	maxFractionDigits?: number;
	showButtons?: boolean;
	v?: Record<string, unknown>;
	regleValidation?: RegleFieldStatus<number>;
	customValidators?: unknown[];
	hideInputInfo?: boolean;
}

const props = withDefaults(defineProps<WtInputNumberProps>(), {
	label: '',
	labelProps: () => ({}),
	placeholder: '',
	disabled: false,
	required: false,
	min: undefined,
	max: undefined,
	step: 1,
	useGrouping: false,
	minFractionDigits: undefined,
	maxFractionDigits: undefined,
	showButtons: true,
	v: null,
	regleValidation: null,
	customValidators: () => [],
	hideInputInfo: false,
});

const model = defineModel<number | null>({
	default: null,
});

const emit = defineEmits([
	'update:modelValue',
]);

const inputNumber = useTemplateRef('inputNumber');

const inputId = `input-number-${Math.random().toString(36).slice(2, 11)}`;

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
		regleValidation,
	});

const { focus, handleKeyup, removeAutocomplete } = useInputControl(inputNumber);

const hasLabel = computed(() => {
	return props.label || slots.label;
});

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

onMounted(() => {
	removeAutocomplete();
});

defineExpose({
	focus,
});
</script>

<style scoped>
</style>