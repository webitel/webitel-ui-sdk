<template>
  <div class="wt-password">
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
      <p-password
        :id="inputId"
        ref="password"
        v-model="model"
        :disabled="disabled"
        :invalid="invalid"
        :placeholder="placeholder || label"
        :toggle-mask="false"
        :feedback="false"
        :input-props="{ type: inputType }"
        input-class="wt-password__input typo-body-1"
        v-bind="$attrs"
        @keyup="handleKeyup"
      >
      </p-password>
      <p-input-group-addon v-if="toggleMask">
        <wt-icon-btn
          :disabled="disabled"
          :icon="showPasswordIcon"
          @click="togglePassword"
        />    
      </p-input-group-addon>
    </p-input-group>
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
import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import type { PasswordProps } from 'primevue';
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
interface WtPasswordProps
	extends /* @vue-ignore */ Omit<PasswordProps, keyof InputHTMLAttributes> {
	label?: string;
	labelProps?: Record<string, unknown>;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	toggleMask?: boolean;
	v?: VuelidateFieldLike;
	regleValidation?: SuperCompatibleRegleFieldStatus;
	customValidators?: CompatCustomValidator[];
}

const props = withDefaults(defineProps<WtPasswordProps>(), {
	label: '',
	labelProps: () => ({}),
	placeholder: '',
	disabled: false,
	required: false,
	toggleMask: true,
	v: null,
	customValidators: () => [],
});

const model = defineModel<string>({
	default: '',
});

const password = useTemplateRef('password');

const inputId = `password-${Math.random().toString(36).slice(2, 11)}`;

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
		regleValidation,
	});

const { focus, handleKeyup } = useInputControl(password);

const isPasswordVisible = ref(false);

const hasLabel = computed(() => {
	return props.label || slots.label;
});

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

const showPasswordIcon = computed(() => {
	return isPasswordVisible.value ? 'eye--closed' : 'eye--opened';
});

const inputType = computed(() => {
	return isPasswordVisible.value ? 'text' : 'password';
});

const togglePassword = () => {
	isPasswordVisible.value = !isPasswordVisible.value;
};

defineExpose({
	focus,
});
</script>

<style lang="scss" scoped>

</style>