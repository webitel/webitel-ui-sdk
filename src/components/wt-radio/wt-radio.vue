<template>
  <div 
    class="wt-radio"
  >
    <p-radio
      v-model="model"
      :input-id="radioId"
      :disabled="disabled"
      :invalid="invalid"
      :size="PrimevueSizeMap[size]"
      :value="value"
    />
    <wt-label
      v-if="hasLabel"
      :for="radioId"
      :disabled="disabled"
      :invalid="invalid"
    >
      <!-- @slot Custom label markup -->
      <slot
        name="label"
        v-bind="{ label, isChecked, disabled }"
      >
        <div
          v-if="label"
          class="wt-radio__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script setup lang="ts">
import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import type { RadioButtonProps } from 'primevue/radiobutton';
import { computed, defineModel, defineProps, toRefs, useSlots } from 'vue';
import { PrimevueSizeMap } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';

/**
 * @emits {string | number | boolean | object} input - Fires when radio is selected. Emits the "value" prop
 */
interface Props extends RadioButtonProps {
	/**
	 * Value, set by radio
	 * @type {string | number | boolean | object}
	 */
	value: string | number | boolean | object;
	/**
	 * Radio label text
	 * @type {string}
	 * @default ''
	 */
	label?: string;
	/**
	 * Marks the radio as required
	 * @type {boolean}
	 * @default false
	 */
	required?: boolean;
	/**
	 * Disables the radio
	 * @type {boolean}
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Changes visual style to outlined
	 * @type {boolean}
	 * @default false
	 */
	outline?: boolean;
	/**
	 * Radio size
	 * @type {string}
	 * @options ['sm', 'lg']
	 */
	size?: string | null;
	v?: Record<string, unknown>;
	regleValidation?: SuperCompatibleRegleFieldStatus;
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<Props>(), {
	label: '',
	required: false,
	disabled: false,
	outline: false,
	size: null,
	v: null,
	regleValidation: null,
	customValidators: () => [],
});

/**
 * [V-MODEL] currently selected value
 * @model selected
 */
const model = defineModel<string | number | boolean | object>('selected', {
	required: true,
});

const radioId = `radio-${Math.random().toString(36).slice(2, 11)}`;

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const { invalid } = useValidation({
	v,
	customValidators,
	regleValidation,
});

const hasLabel = computed(() => {
	return props.label || slots.label;
});

const isChecked = computed(() => {
	return props.value === model.value;
});
</script>

<style scoped>
.wt-radio {
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
}

.wt-radio__label {
  transition: var(--transition);
  cursor: pointer;
}
</style>
