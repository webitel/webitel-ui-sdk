<template>
  <div class="wt-input-text">
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
        class="wt-input-text__addon typo-body-1 wt-placeholder"
      >
        <slot name="prefix" />
      </p-input-group-addon>
      <p-input-text
        :id="inputId"
        ref="inputText"
        :model-value="model"
        :disabled="disabled"
        :invalid="invalid"
        :placeholder="placeholder || label"
        class="wt-input-text__input typo-body-1"
        v-bind="$attrs"
        @update:model-value="inputHandler"
        @keyup="handleKeyup"
      />
      <p-input-group-addon 
        v-if="$slots.suffix"
        class="wt-input-text__addon typo-body-1 wt-placeholder"
      >
        <slot name="suffix" />
      </p-input-group-addon>
    </p-input-group>
    <wt-message
      v-if="isValidation && validationText"
      :color="getMessageColor"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import type { RegleFieldStatus } from '@regle/core';
import type { InputTextProps } from 'primevue';
import { computed, defineModel, toRefs, useSlots, useTemplateRef } from 'vue';

import { useInputControl } from '../../composables';
import { ComponentSize, MessageColor, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';

interface WtInputTextProps extends /* @vue-ignore */ InputTextProps {
	label?: string;
  labelProps?: Record<string, unknown>;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	preventTrim?: boolean;
	v?: Record<string, unknown>;
	regleValidation?: RegleFieldStatus<string>;
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<WtInputTextProps>(), {
	label: '',
  labelProps: () => ({}),
	placeholder: '',
	disabled: false,
	required: false,
	preventTrim: false,
	v: null,
	regleValidation: null,
	customValidators: () => [],
});

const model = defineModel<string>({
	default: '',
});

const inputText = useTemplateRef('inputText');

const inputId = `input-text-${Math.random().toString(36).slice(2, 11)}`;

const emit = defineEmits([
	'update:modelValue',
]);

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText } = useValidation({
	v,
	customValidators,
	regleValidation,
});

const { focus, handleKeyup } = useInputControl(inputText);

const hasLabel = computed(() => {
	return props.label || slots.label;
});

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

const inputHandler = (value) => {
	const handledValue = props.preventTrim ? value : value.trim();
	emit('update:modelValue', handledValue);
};

const getMessageColor = computed(() => {
	return invalid.value ? MessageColor.ERROR : MessageColor.SECONDARY;
});

defineExpose({
	focus,
});
</script>

<style scoped>

</style>