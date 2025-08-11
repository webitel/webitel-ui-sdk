<template>
  <div
    class="wt-textarea"
  >
    <wt-label
      :disabled="disabled"
      :for="name"
      :required="required"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ label }}
      </slot>
    </wt-label>
    <div class="wt-textarea__wrapper">
      <p-textarea
        :id="name"
        v-model="model"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :rows="rows"
        :readonly="readonly"
        :auto-resize="autoresize"
        :invalid="invalid"
        class="wt-textarea__textarea"
        v-on="listeners"
      />
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script setup lang="ts">
import { computed, defineModel } from 'vue';

import { useValidation } from '../../mixins/validationMixin/useValidation';

interface Props {
  /**
   * textarea label
   */
  label?: string;
  /**
   * textarea placeholder
   */
  placeholder?: string;
  /**
   * Native textarea readonly attribute
   */
  readonly?: boolean;
  /**
   * Native textarea disabled attribute
   */
  disabled?: boolean;
  required?: boolean;
  /**
   * textarea name
   */
  name?: string;
  /**
   * Number of rows in textarea
   */
  rows?: number;
  labelProps?: Record<string, any>;
  autoresize?: boolean;
  // validation rules
  v?: any;
  customValidators?: Array<{ name: string; text: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: undefined,
  readonly: false,
  disabled: false,
  required: false,
  name: '',
  rows: 1,
  labelProps: undefined,
  autoresize: false,
  v: undefined,
  customValidators: () => [],
});

const model = defineModel<string>();

const emit = defineEmits(['enter']);

const { isValidation, invalid, validationText } = useValidation({
  v: props.v,
  customValidators: props.customValidators,
} as any);

const listeners = computed(() => ({
  keypress: (event: KeyboardEvent) => handleKeypress(event),
}));

const handleKeypress = (event: KeyboardEvent) => {
  if (!props.autoresize) return;

  if (event.key === 'Enter' && !event.shiftKey) {
    emit('enter');
    event.preventDefault();
  }
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/styleguide/styleguide' as *;

.wt-textarea__textarea {
  @extend %typo-body-1;
  @extend %wt-scrollbar;
  @include wt-placeholder;

  box-sizing: border-box;
  width: 100%;
  resize: none;
}
</style>
