<template>
  <div class="wt-input-number">
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
        class="wt-input-number__addon"
      >
        <slot name="prefix" />
      </p-input-group-addon>
      <p-input-number
        :id="inputId"
        ref="inputNumber"
        v-model="model"
        :disabled="disabled"
        :invalid="invalid"
        :min="min"
        :max="max"
        :step="step"
        :min-fraction-digits="minFractionDigits"
        :max-fraction-digits="maxFractionDigits"
        :placeholder="placeholder || label"
        :show-buttons="showButtons"
        input-class="wt-input-number__input"
        v-bind="$attrs"
        @keyup="handleKeyup"
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
        class="wt-input-number__addon"
      >
        <slot name="suffix" />
      </p-input-group-addon>
    </p-input-group>
    <wt-message
      v-if="isValidation"
      :color="getMessageColor"
      :variant="MessageVariant.SIMPLE"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import type { InputNumberProps } from 'primevue';
import type { RegleFieldStatus } from '@regle/core';
import { computed, defineModel, toRefs, useSlots, useTemplateRef } from 'vue';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import { ComponentSize, MessageVariant, MessageColor } from '../../enums';
import { useInputControl } from '../../composables';

interface WtInputNumberProps extends /* @vue-ignore */ InputNumberProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  showButtons?: boolean;
  v?: Record<string, unknown>;
  regleValidation?: RegleFieldStatus<number>;
  customValidators?: unknown[];
}

const props = withDefaults(defineProps<WtInputNumberProps>(), {
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  invalid: false,
  min: undefined,
  max: undefined,
  step: 1,
  minFractionDigits: undefined,
  maxFractionDigits: undefined,
  showButtons: false,
  v: null,
  regleValidation: null,
  customValidators: () => [],
});

const model = defineModel<number | null>({ default: null });

const inputNumber = useTemplateRef('inputNumber');

const inputId = `input-number-${Math.random().toString(36).slice(2, 11)}`;

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
} = useInputControl(inputNumber);

const hasLabel = computed(() => {
  return props.label || slots.label;
});

const requiredLabel = computed(() => {
  return props.required ? `${props.label}*` : props.label;
});

const getMessageColor = computed(() => {
  return invalid.value ? MessageColor.DANGER : MessageColor.SECONDARY;
});

defineExpose({
  focus,
});
</script>

<style lang="scss" scoped>
@use '../../css/styleguide/styleguide' as *;

.wt-input-number__addon {
  @extend %typo-body-1;
  @include wt-placeholder;
}

:deep(.wt-input-number__input) {
  @extend %typo-body-1;
  @include wt-placeholder;
}
</style>