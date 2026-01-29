<template>
  <div
    class="wt-textarea"
    :class="{
      'wt-textarea--hidden-scrollbar': isScrollHidden,
    }"
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
        ref="textarea-wrapper"
        v-model="model"
        :placeholder="placeholder || label"
        :invalid="invalid"
        :disabled="disabled"
        :rows="rows"
        :auto-resize="autoresize"
        :readonly="readonly"
        class="wt-textarea__textarea"
        @paste="emit('paste', $event)"
        @keydown="handleKeypress"
        @input="handleInput"
        @blur="emit('blur')"
      />
    </div>
    <wt-message
      v-if="isValidation && validationText"
      :color="validationTextColor"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import type { TextareaProps } from 'primevue/textarea';
import { defineModel, onMounted, ref, useTemplateRef } from 'vue';

import { useValidation } from '../../mixins/validationMixin/useValidation';

import { ComponentSize, MessageVariant } from '../../enums';

/**
 * @emits {string} input - Fires when textarea value changes. Emits value
 * @emits {void} enter - Fires at enter key press if autoresize is on
 * @emits {Event} paste - Fires on paste event
 * @emits {void} blur - Fires on blur event
 * @emits {KeyboardEvent} keydown - Fires on keydown event
 * @emits {Event} * - Plus all native textarea events
 */
interface Props extends /* @vue-ignore */ TextareaProps {
	/**
	 * Textarea label
	 * @type {string}
	 * @default ''
	 */
	label?: string;
	/**
	 * Textarea placeholder
	 * @type {string}
	 * @default label value
	 */
	placeholder?: string;
	/**
	 * Native textarea readonly attribute
	 * @type {boolean}
	 * @default false
	 */
	readonly?: boolean;
	/**
	 * Native textarea disabled attribute
	 * @type {boolean}
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Marks textarea as required
	 * @type {boolean}
	 * @default false
	 */
	required?: boolean;
	/**
	 * Input id name for label association
	 * @type {string}
	 * @default ''
	 */
	name?: string;
	/**
	 * Number of rows in textarea
	 * @type {number}
	 * @default 1
	 */
	rows?: number;
	/**
	 * Object with props, passed down to wt-label as props
	 * @type {Object}
	 */
	labelProps?: Record<string, any>;
	/**
	 * Enables auto-resize. If passed, "Enter" key press emits "enter" event, new line is shift+enter
	 * @type {boolean}
	 * @default false
	 */
	autoresize?: boolean;
	/**
	 * Validation rules
	 * @type {any}
	 */
	v?: any;
	/**
	 * Custom validators array
	 * @type {Array<{name: string, text: string}>}
	 * @default []
	 */
	customValidators?: Array<{
		name: string;
		text: string;
	}>;
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

/**
 * [V-MODEL] Textarea value
 * @model modelValue
 */
const model = defineModel<string>();

const textareaWrapperRef = useTemplateRef('textarea-wrapper');

const emit = defineEmits([
	'enter',
	'paste',
	'blur',
	'keydown',
]);

const isScrollHidden = ref(false);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v: props.v,
		customValidators: props.customValidators,
	} as any);

const handleKeypress = (event: KeyboardEvent) => {
	emit('keydown', event);
	if (!props.autoresize) return;

	if (event.key === 'Enter' && !event.shiftKey) emit('enter');
	event.preventDefault();
};

const handleInput = () => {
	checkTextareaHeight();
};

/**
 * @author YeHlukhov
 *
 * Primevue by default shows scrollbar for autoresize textarea with overflow: auto,
 * so this function checks textarea height and adds/removes wt-hidden-scrollbar class
 */
const checkTextareaHeight = async () => {
	if (!props.autoresize) return;

	const textareaEl = textareaWrapperRef.value?.$el;

	// firstly textarea renders widths are equal, then clientHeight changes for 2px by primevue extra space
	if (
		textareaEl?.scrollHeight === textareaEl?.clientHeight ||
		textareaEl?.scrollHeight === textareaEl?.clientHeight + 2
	) {
		isScrollHidden.value = true;
	} else {
		isScrollHidden.value = false;
	}
};

onMounted(() => {
	checkTextareaHeight();
});
</script>

<style scoped>
.wt-textarea__wrapper {
  height: 100%;
}

.wt-textarea__textarea {
  transition: var(--transition);
  display: block;
  box-sizing: border-box;
  width: 100%;
  resize: none;
}

.wt-textarea--hidden-scrollbar :deep(textarea)::-webkit-scrollbar {
  display: none;
}
</style>
