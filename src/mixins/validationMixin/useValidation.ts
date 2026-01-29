import { computed } from 'vue';
import { MessageColor } from '../../enums';

import {
	type UseFieldValidationParams as UseRegleFieldValidationParams,
	useFieldValidation as useRegleFieldValidation,
} from './regle/useRegleValidation';
import {
	type UseFieldValidationParams as UseVuelidateFieldValidationParams,
	useFieldValidation as useVuelidateValidation,
} from './vuelidate/useVuelidateValidation';

type CompatVuelidateParams = {
	v: UseVuelidateFieldValidationParams['field'];
};

export const useValidation = ({
	v: vuelidateValidation,
	customValidators: inputCustomValidators, // vuelidate custom validations, compat
	regleValidation,
}: UseRegleFieldValidationParams | CompatVuelidateParams) => {
	const {
		isValidation: isVuelidateValidation,
		invalid: vuelidateInvalid,
		validationText: vuelidateValidationText,
	} = useVuelidateValidation({
		field: vuelidateValidation,
		customValidators: inputCustomValidators,
	});

	const { invalid: regleInvalid, validationText: regleValidationText } =
		useRegleFieldValidation({
			field: regleValidation,
		});

	const isRegleValidation = computed(() => {
		return !!regleValidation?.value;
	});

	const isValidation = computed(() => {
		return isRegleValidation.value || isVuelidateValidation.value;
	});

	const invalid = computed(() => {
		return isRegleValidation.value
			? regleInvalid.value
			: vuelidateInvalid.value;
	});

	const validationText = computed(() => {
		return isRegleValidation.value
			? regleValidationText.value
			: vuelidateValidationText.value;
	});

	const validationTextColor = computed(() => {
		return invalid.value ? MessageColor.ERROR : MessageColor.SECONDARY;
	});

	return {
		isValidation,
		invalid,
		validationText,
		validationTextColor,
	};
};
