import type { RegleShortcutDefinition } from '@regle/core';
import type { RegleSchema } from '@regle/schemas';
import { computed, type Ref } from 'vue';

export const useCardValidation = <
	// biome-ignore lint/suspicious/noExplicitAny: matches RegleSchema's own state constraint
	TState extends Record<string, any>,
	TSchema extends RegleShortcutDefinition = {},
>({
	validationSchema,
}: {
	validationSchema: Ref<RegleSchema<TState, TSchema>>;
}) => {
	const modelValue = computed(() => {
		return validationSchema.value.r$.$value;
	});

	const validationFields = computed(() => {
		return validationSchema.value.r$.$fields;
	});

	const hasValidationErrors = computed(() => {
		return validationSchema.value.r$.$error;
	});

	const validate = () => {
		return validationSchema.value.r$.$validate();
	};

	return {
		modelValue,
		validationFields,
		hasValidationErrors,

		validate,
	};
};
