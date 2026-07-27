import type { RegleCollectionStatus, RegleFieldStatus } from '@regle/core';
import { type ComputedRef, computed, type Ref } from 'vue';

export type UseFieldValidationParams = {
	field?: Ref<RegleFieldStatus<string> | RegleCollectionStatus>;
};

export type UseFieldValidationReturn = {
	invalid: ComputedRef<boolean | null>; // null if is not validated
	validationText?: ComputedRef<string | undefined>;
};

export const useFieldValidation = ({
	field: fieldRef,
}: UseFieldValidationParams): UseFieldValidationReturn => {
	const invalid = computed(() => {
		return fieldRef?.value.$error ?? null;
	});

	const validationText = computed(() => {
		const status = fieldRef?.value;
		const errors = status?.$errors;
		if (!errors) return '';

		if (Array.isArray(errors)) {
			return errors.at(0) ?? '';
		}

		if (status && '$self' in status) {
			const selfErrors = status.$self?.$errors;
			if (Array.isArray(selfErrors)) return selfErrors?.at(0) ?? '';
		}

		return '';
	});

	return {
		invalid,
		validationText,
	};
};
