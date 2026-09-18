import type { RegleShortcutDefinition } from '@regle/core';
import type { RegleSchema } from '@regle/schemas';
import { computed, type Ref } from 'vue';

import type { CardValidationFields } from '../types/CardValidationFields.types';

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
		// Regle types $fields as a union with an empty-object arm to also
		// support discriminated-union state shapes; TState here is always a
		// plain card entity, so that arm never applies — narrow it away once,
		// here, instead of at every card component consuming this composable.
		return validationSchema.value.r$.$fields as CardValidationFields<TState>;
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
