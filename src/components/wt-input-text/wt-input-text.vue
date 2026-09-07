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
        class="wt-input-text__addon typo-body-1"
      >
        <slot name="prefix" />
      </p-input-group-addon>
      <!--
        Key events are re-emitted rather than left to `$attrs`: apps running
        @vue/compat in MODE 2 keep vue 2's `$attrs`, which holds no listeners
        at all, so anything a consumer binds here would be dropped on the way
        to the input. A declared emit reaches the handler through `vnode.props`
        either way, and keeps it off `$attrs` so it still fires exactly once.
      -->
      <p-input-text
        :id="inputId"
        ref="inputText"
        :model-value="model"
        :disabled="disabled"
        :invalid="invalid"
        :placeholder="placeholder || label"
        class="wt-input-text__input typo-body-1"
        :class="{ 'wt-input-text__input--masked': isInputMasked }"
        :inputmode="type"
        :size="size ? primevueSizeMap[size] : undefined"
        v-bind="$attrs"
        @update:model-value="inputHandler"
        @keydown="emit('keydown', $event)"
        @keyup="onKeyup"
        @focus="emit('focus', $event)"
      />
      <p-input-group-addon
        v-if="hideInputValue || $slots.suffix"
        class="wt-input-text__addon typo-body-1"
      >
        <wt-icon-btn
          v-if="hideInputValue"
          :icon="eyeIconName"
          :disabled="disabled"
          @click="isValueHidden = !isValueHidden"
        />
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
import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import type { InputTextProps } from 'primevue';
import type { InputHTMLAttributes } from 'vue';
import { computed, ref, toRefs, useSlots, useTemplateRef } from 'vue';
import { ComponentSize, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import type {
	CompatCustomValidator,
	VuelidateFieldLike,
} from '../../mixins/validationMixin/vuelidate/useVuelidateValidation';
import { useInputControl } from '../_internals/composables';

/** native attrs are omitted: keeping them overflows prop inference (TS2590) */
interface WtInputTextProps
	extends /* @vue-ignore */ Omit<InputTextProps, keyof InputHTMLAttributes> {
	label?: string;
	labelProps?: Record<string, unknown>;
	type?: string;
	size?: string | null;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	preventTrim?: boolean;
	v?: VuelidateFieldLike;
	regleValidation?: SuperCompatibleRegleFieldStatus;
	customValidators?: CompatCustomValidator[];
	hideInputInfo?: boolean;
	hideInputValue?: boolean;
}

const props = withDefaults(defineProps<WtInputTextProps>(), {
	label: '',
	labelProps: () => ({}),
	type: 'text',
	size: null,
	placeholder: '',
	disabled: false,
	required: false,
	preventTrim: false,
	v: null,
	customValidators: () => [],
	hideInputInfo: false,
	hideInputValue: false,
});

const primevueSizeMap: Record<string, string> = {
	[ComponentSize.SM]: 'small',
	[ComponentSize.LG]: 'large',
};

const model = defineModel<string>({
	default: '',
});

const inputText = useTemplateRef('inputText');

const inputId = `input-text-${Math.random().toString(36).slice(2, 11)}`;

const emit = defineEmits<{
	/**
	 * @param event - native focus event from the underlying input
	 */
	focus: [
		FocusEvent,
	];
	/**
	 * @param event - native keydown event from the underlying input
	 */
	keydown: [
		KeyboardEvent,
	];
	/**
	 * @param event - native keyup event from the underlying input
	 */
	keyup: [
		KeyboardEvent,
	];
}>();

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
		regleValidation,
	});

const { focus, handleKeyup } = useInputControl(inputText);

/**
 * `handleKeyup` stops the event at the input so a consumer's handler cannot
 * also run on the wrapper it bubbles to; re-emitting keeps the consumer's
 * handler reachable now that it no longer arrives through `$attrs`.
 */
const onKeyup = (event: KeyboardEvent) => {
	handleKeyup(event);
	emit('keyup', event);
};

const hasLabel = computed(() => {
	return props.label || slots.label;
});

const requiredLabel = computed(() => {
	const isRequired = props.required || (props.v && 'required' in props.v);
	return isRequired ? `${props.label}*` : props.label;
});

const inputHandler = (value: string) => {
	const handledValue = props.preventTrim ? value : value.trim();
	model.value = handledValue;
};

const isValueHidden = ref(props.hideInputValue);

const isInputMasked = computed(
	() => !!model.value?.length && isValueHidden.value,
);

const eyeIconName = computed(() =>
	isValueHidden.value ? 'eye--opened' : 'eye--closed',
);

defineExpose({
	focus,
});
</script>

<style scoped>
.wt-input-text__input--masked {
  font-family: 'text-security-disc', sans-serif;
  -webkit-text-security: disc;
}
</style>
