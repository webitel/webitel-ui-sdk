<template>
  <div class="wt-input-text">
    <wt-label
      v-if="hasLabel"
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
        class="wt-input-text__addon"
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
        class="wt-input-text__input"
        v-bind="$attrs"
        @update:model-value="inputHandler"
        @keyup="handleKeyup"
      />
      <p-input-group-addon 
        v-if="$slots.suffix"
        class="wt-input-text__addon"
      >
        <slot name="suffix" />
      </p-input-group-addon>
    </p-input-group>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script setup lang="ts">
import type { InputTextProps } from 'primevue';
import type { RegleFieldStatus } from '@regle/core';
import { computed, defineModel, toRefs, useSlots, useTemplateRef } from 'vue';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import { useInputControl } from '../../composables';

interface WtInputTextProps extends /* @vue-ignore */ InputTextProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  preventTrim?: boolean;
  v?: Record<string, unknown>;
  regleValidation?: RegleFieldStatus<string>;
  customValidators?: unknown[];
}

const props = withDefaults(defineProps<WtInputTextProps>(), {
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  invalid: false,
  preventTrim: false,
  v: null,
  regleValidation: null,
  customValidators: () => [],
});

const model = defineModel<string>({ default: '' });

const inputText = useTemplateRef('inputText');

const inputId = `input-text-${Math.random().toString(36).slice(2, 11)}`;

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const {
  isValidation,
  invalid,
  validationText,
} = useValidation({
  v,
  customValidators,
  regleValidation,
});

const {
  focus,
  handleKeyup
} = useInputControl(inputText);

const hasLabel = computed(() => {
  return props.label || slots.label;
});

const requiredLabel = computed(() => {
  return props.required ? `${props.label}*` : props.label;
});

const inputHandler = (value) => {
  const handledValue = props.preventTrim
    ? value
    : value.trim();
  emit('update:modelValue', handledValue);
}

defineExpose({
  focus,
});
</script>

<style lang="scss" scoped>
@use '../../css/styleguide/styleguide' as *;

.wt-input-text__addon {
  @extend %typo-body-1;
  @include wt-placeholder;
}

:deep(.wt-input-text__input) {
  @extend %typo-body-1;
  @include wt-placeholder;
}
</style>