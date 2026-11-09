<template>
  <div class="wt-password">
    <wt-label
      v-bind="shownLabelProps"
      :disabled="disabled"
      :for="inputId"
      :invalid="invalid"
    >
      <slot
        name="label"
        v-bind="{ label: shownLabel }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <p-input-group>
      <p-password
        :id="inputId"
        ref="password"
        v-model="shownValue"
        :disabled="disabled"
        :invalid="invalid"
        :placeholder="placeholder || shownLabel"
        :toggle-mask="false"
        :feedback="false"
        :input-props="{ type: inputType }"
        input-class="wt-password__input typo-body-1"
        v-bind="$attrs"
        @keyup="handleKeyup"
      >
      </p-password>
      <p-input-group-addon
        v-if="actions.length"
        class="wt-password__actions"
      >
        <wt-copy-action
          v-if="actions.includes(PasswordAction.Copy) && shownValue"
          :value="shownValue"
          :disabled="disabled"
          @click="emit(`click:${PasswordAction.Copy}`)"
        />
        <wt-icon-btn
          v-if="actions.includes(PasswordAction.Generate)"
          icon="generate"
          :disabled="disabled || isGenerating"
          @click="generate"
        />
        <wt-icon-btn
          v-if="actions.includes(PasswordAction.Toggle)"
          :icon="isPasswordVisible ? 'eye--closed' : 'eye--opened'"
          :disabled="disabled"
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
import { computed, ref, toRefs, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { ComponentSize, MessageVariant, PasswordAction } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import type {
	CompatCustomValidator,
	VuelidateFieldLike,
} from '../../mixins/validationMixin/vuelidate/useVuelidateValidation';
import { generatePassword } from '../../scripts/generatePassword';
import { useInputControl } from '../_internals/composables';
import WtCopyAction from '../wt-copy-action/wt-copy-action.vue';
import WtIconBtn from '../wt-icon-btn/wt-icon-btn.vue';

/** native attrs are omitted: keeping them overflows prop inference (TS2590) */
interface WtPasswordProps
	extends /* @vue-ignore */ Omit<PasswordProps, keyof InputHTMLAttributes> {
	label?: string;
	labelProps?: Record<string, unknown>;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	actions?: PasswordAction[];
	hideHash?: boolean;
	generator?: () => string | Promise<string>;
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
	actions: () => [
		PasswordAction.Toggle,
	],
	hideHash: false,
	generator: () => generatePassword(),
	v: null,
	customValidators: () => [],
});

const emit = defineEmits(
	Object.values(PasswordAction).map((action) => `click:${action}` as const),
);

const model = defineModel<string>({
	default: '',
});

// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
// a value longer than this is a password hash
const MIN_HASH_SIZE = 59;

const shownValue = computed({
	get: () =>
		props.hideHash && (model.value?.length ?? 0) > MIN_HASH_SIZE
			? ''
			: model.value,
	set: (value: string) => {
		model.value = value;
	},
});

const password = useTemplateRef('password');

const inputId = `password-${Math.random().toString(36).slice(2, 11)}`;

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
		regleValidation,
	});

const { focus, handleKeyup } = useInputControl(password);

const isPasswordVisible = ref(false);

const { t } = useI18n();

const shownLabel = computed(() => props.label || t('vocabulary.password'));

const requiredLabel = computed(() => {
	return props.required ? `${shownLabel.value}*` : shownLabel.value;
});

// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
// with hide-hash the saved value isn't shown, so by default the label hints that an empty field keeps it
const shownLabelProps = computed(() =>
	props.hideHash
		? {
				hint: t('webitelUI.password.hashHint'),
				hintPosition: 'right',
				...props.labelProps,
			}
		: props.labelProps,
);

const inputType = computed(() =>
	props.actions.includes(PasswordAction.Toggle) && !isPasswordVisible.value
		? 'password'
		: 'text',
);

const togglePassword = () => {
	isPasswordVisible.value = !isPasswordVisible.value;
	emit(`click:${PasswordAction.Toggle}`);
};

const isGenerating = ref(false);

const generate = async () => {
	isGenerating.value = true;
	try {
		model.value = await props.generator();
		isPasswordVisible.value = true;
	} catch {
		// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807] keep the value, the app shows the error
	} finally {
		isGenerating.value = false;
	}
};

defineExpose({
	focus,
});
</script>

<style lang="scss" scoped>
.wt-password__actions {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
