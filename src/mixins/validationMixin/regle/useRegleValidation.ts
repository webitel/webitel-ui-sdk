import { type ComputedRef, computed, type Ref } from 'vue';
import type { WtRegleFieldValidation } from './WtRegleFieldValidation';

export type { WtRegleFieldValidation } from './WtRegleFieldValidation';

export type UseFieldValidationParams = {
	field?: Ref<WtRegleFieldValidation>;
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
