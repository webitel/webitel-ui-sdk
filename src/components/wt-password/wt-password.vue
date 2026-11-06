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
        v-if="shownActions.length"
        class="wt-password__actions"
      >
        <component
          :is="actionsConfig[action].component"
          v-for="action in shownActions"
          :key="action"
          v-bind="actionsConfig[action].props"
          :disabled="disabled"
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
import { type Component, computed, ref, toRefs, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { ComponentSize, MessageVariant, PasswordAction } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import type {
	CompatCustomValidator,
	VuelidateFieldLike,
} from '../../mixins/validationMixin/vuelidate/useVuelidateValidation';
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
		props.hideHash && model.value.length > MIN_HASH_SIZE ? '' : model.value,
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

const inputType = computed(() => {
	const isMaskable = props.actions.includes(PasswordAction.Toggle);
	return isMaskable && !isPasswordVisible.value ? 'password' : 'text';
});

interface PasswordActionConfig {
	component: Component;
	props: Record<string, unknown>;
}

const actionsConfig = computed<Record<PasswordAction, PasswordActionConfig>>(
	() => ({
		[PasswordAction.Copy]: {
			component: WtCopyAction,
			props: {
				value: shownValue.value,
				onClick: () => emit(`click:${PasswordAction.Copy}`),
			},
		},
		[PasswordAction.Generate]: {
			component: WtIconBtn,
			props: {
				icon: 'generate',
				onClick: () => {
					isPasswordVisible.value = true;
					emit(`click:${PasswordAction.Generate}`);
				},
			},
		},
		[PasswordAction.Toggle]: {
			component: WtIconBtn,
			props: {
				icon: isPasswordVisible.value ? 'eye--closed' : 'eye--opened',
				onClick: () => {
					isPasswordVisible.value = !isPasswordVisible.value;
					emit(`click:${PasswordAction.Toggle}`);
				},
			},
		},
	}),
);

const shownActions = computed(() =>
	props.actions.filter(
		(action) => action !== PasswordAction.Copy || !!shownValue.value,
	),
);

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
