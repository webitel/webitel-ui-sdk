import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import { type ComputedRef, computed, type Ref } from 'vue';

export type UseFieldValidationParams = {
	field?: Ref<SuperCompatibleRegleFieldStatus | undefined | null>;
};

export type UseFieldValidationReturn = {
	invalid: ComputedRef<boolean | null>; // null if is not validated
	validationText?: ComputedRef<string | undefined>;
};

const getFirstRegleError = (errors: unknown): string | undefined => {
	if (Array.isArray(errors)) {
		return errors.at(0);
	}

	if (errors && typeof errors === 'object') {
		for (const value of Object.values(errors)) {
			if (Array.isArray(value) && value.length) {
				return value.at(0);
			}
		}
	}

	return undefined;
};

export const useFieldValidation = ({
	field: fieldRef,
}: UseFieldValidationParams): UseFieldValidationReturn => {
	const invalid = computed(() => {
		return fieldRef?.value?.$error ?? null;
	});

	const validationText = computed(() => {
		return getFirstRegleError(fieldRef?.value?.$errors);
	});

	return {
		invalid,
		validationText,
	};
};
