<template>
  <p-slider
    v-model="model"
    :disabled="disabled"
    :max="max"
    :min="min"
    :step="step"
    :orientation="orientation"
    :style="{ 
      height: vertical ? `${height}px` : '',
      width: !vertical && width ? `${width}px` : '',
     }"
  />
  
</template>

<script setup lang="ts">
import type { SliderProps } from 'primevue/slider';
import { computed, defineModel } from 'vue';

/**
 * @emits {number} update:modelValue - Fires when slider value changes. Emits selected value
 */
interface Props extends SliderProps {
	/**
	 * Disables the slider
	 * @type {boolean}
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Slider is positioned vertically, from bottom to top. Important: indicate slider height
	 * @type {boolean}
	 * @default false
	 */
	vertical?: boolean;
	/**
	 * The smallest slider value
	 * @type {number}
	 * @default 0
	 */
	min?: number;
	/**
	 * The biggest slider value
	 * @type {number}
	 * @default 100
	 */
	max?: number;
	/**
	 * Step of changing value
	 * @type {number}
	 * @default 1
	 */
	step?: number;
	/**
	 * Vertical slider height, only number - quantity of pixels is accepted
	 * @type {number}
	 * @default 100
	 */
	height?: number;
	/**
	 * Horizontal slider width
	 * @type {number}
	 */
	width?: number;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	vertical: false,
	min: 0,
	max: 100,
	step: 1,
	height: 100,
	width: undefined,
});

/**
 * [V-MODEL] Actual slider value
 * @model modelValue
 */
const model = defineModel<number>();

const orientation = computed(() =>
	props.vertical ? 'vertical' : 'horizontal',
);
</script>
