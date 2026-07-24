import type { SuperCompatibleRegleFieldStatus } from '@regle/core';
import { type ComputedRef, computed, type Ref } from 'vue';

export type UseFieldValidationParams = {
	field?: Ref<SuperCompatibleRegleFieldStatus>;
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
		return fieldRef?.value?.$errors?.at(0);
	});

	return {
		invalid,
		validationText,
	};
};
