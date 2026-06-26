import type { RegleFieldStatus } from '@regle/core';
import { type ComputedRef, computed, type Ref } from 'vue';

export type UseFieldValidationParams = {
	field: Ref<RegleFieldStatus<string>>;
};

export type UseFieldValidationReturn = {
	invalid: ComputedRef<boolean | null>; // null if is not validated
	validationText?: ComputedRef<string>;
};

export const useFieldValidation = ({
	field: fieldRef,
}: UseFieldValidationParams): UseFieldValidationReturn => {
	const invalid = computed(() => {
		return fieldRef.value.$error ?? false;
	});

	const validationText = computed(() => {
		const errors = fieldRef.value?.$errors;
		if (!errors) return '';

		if (Array.isArray(errors)) {
			return errors.at(0) ?? '';
		}

		if (typeof errors === 'object') {
			const selfErrors = fieldRef.value?.$self?.$errors;
			if (Array.isArray(selfErrors)) return selfErrors.at(0) ?? '';
		}

		return '';
	});

	return {
		invalid,
		validationText,
	};
};
