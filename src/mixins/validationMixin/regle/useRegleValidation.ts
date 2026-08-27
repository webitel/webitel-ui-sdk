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
	if (typeof errors === 'string') {
		return errors;
	}

	if (Array.isArray(errors)) {
		for (const entry of errors) {
			const found = getFirstRegleError(entry);
			if (found) return found;
		}
		return undefined;
	}

	// array-type fields nest their own rule errors under `$self` and
	// per-item errors under `$each`, an array of per-item error shapes —
	// recurse instead of assuming array entries are already messages
	if (errors && typeof errors === 'object') {
		for (const value of Object.values(errors)) {
			const found = getFirstRegleError(value);
			if (found) return found;
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
