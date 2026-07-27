import type { Validation } from '@vuelidate/core';
import {
	type ComputedRef,
	computed,
	isReactive,
	isRef,
	type Ref,
	unref,
} from 'vue';
import { useI18n } from 'vue-i18n';

export type CompatCustomValidator = {
	name: string;
	text: string;
};

/**
 * Vuelidate exposes each rule as a dynamic key on the field, and components
 * declare the prop loosely so consumers are not forced to import `Validation`.
 * Kept structural on purpose: inlining `@vuelidate/core`'s `Validation` here
 * blows up prop-type inference in the components (TS2590).
 *
 * `false` is accepted because callers commonly write
 * `:v="!disableValidation && v$.field"` to opt out of validation.
 */
// biome-ignore lint/suspicious/noExplicitAny: dynamic per-rule keys, see comment above
export type VuelidateFieldLike = Record<string, any> | null | false;

export type UseFieldValidationParams = {
	field?: Ref<VuelidateFieldLike | undefined>;
	customValidators?:
		| CompatCustomValidator[]
		| Ref<CompatCustomValidator[] | undefined>;
};

export const useFieldValidation = ({
	field: inputV,
	customValidators: inputCustomValidators,
}: UseFieldValidationParams) => {
	const { t } = useI18n();

	// support vue options api, where v is a reactive, not ref
	let v:
		| Ref<VuelidateFieldLike | undefined>
		| ComputedRef<VuelidateFieldLike | undefined>
		| undefined = inputV;
	let customValidators:
		| CompatCustomValidator[]
		| Ref<CompatCustomValidator[] | undefined>
		| ComputedRef<CompatCustomValidator[] | undefined>
		| undefined = inputCustomValidators;

	if (isReactive(inputV)) {
		v = computed(() => unref(inputV));
		customValidators = computed(() => unref(inputCustomValidators));
	}
	// end

	const isValidation = computed(
		() => !!v && !!v.value && !!Object.keys(v.value).length,
	);
	const invalid = computed(
		() => isValidation.value && !!(v?.value as Validation | undefined)?.$error,
	);

	const validationText = computed(() => {
		let validationText = '';
		const validation = v?.value as Validation | undefined;
		if (validation && isValidation.value && invalid.value) {
			if (validation.required?.$invalid)
				validationText = t('validation.required');
			else if (validation.numeric?.$invalid)
				validationText = t('validation.numeric');
			else if (validation.email?.$invalid)
				validationText = t('validation.email');
			else if (validation.gatewayHostValidator?.$invalid)
				validationText = t('validation.gatewayHostValidator');
			else if (validation.ipValidator?.$invalid)
				validationText = t('validation.ipValidator');
			else if (validation.macValidator?.$invalid)
				validationText = t('validation.macValidator');
			else if (validation.minValue?.$invalid)
				validationText = t('validation.minValue', {
					min: validation.minValue.$params.min,
				});
			else if (validation.maxValue?.$invalid)
				validationText = t('validation.maxValue', {
					max: validation.maxValue.$params.max,
				});
			else if (validation.maxLength?.$invalid)
				validationText = t('validation.maxLength', {
					max: validation.maxLength.$params.max,
				});
			else if (validation.sipAccountValidator?.$invalid)
				validationText = t('validation.sipAccountValidator');
			else if (validation.minLength?.$invalid)
				validationText = t('validation.minLength', {
					min: validation.minLength.$params.min,
				});
			else if (validation.url?.$invalid)
				validationText = `${t('validation.url')}`;
			else if (validation.regExpValidator?.$invalid)
				validationText = `${t('validation.regExpValidator')}`;
			else if (validation.sameAs?.$invalid)
				validationText = `${t('validation.sameAs')}`;
			else if (validation.domainValidator?.$invalid)
				validationText = `${t('validation.domainValidator')}`;
			else if (validation.decimalValidator?.$invalid)
				validationText = `${t('validation.decimalValidator')} ${validation.decimalValidator.$params.count}`;
			else if (validation.websocketValidator?.$invalid)
				validationText = `${t('validation.websocketValidator')}`;
			else if (validation.integer?.$invalid)
				validationText = `${t('validation.integer')}`;
			else if (validation.regex?.$invalid)
				validationText =
					validation.regex?.$message ||
					`${t('validation.isRegExpMatched')} ${validation.regex?.$params?.regex}`;
			else if (validation.nameAlreadyInUse?.$invalid) {
				validationText = t('validation.nameAlreadyInUse');
			} else if (validation.phoneNumberSymbolsValidator?.$invalid) {
				validationText = t('validation.phoneNumberSymbolsValidator');
			} else if (validation.loginValidator?.$invalid) {
				validationText = t('validation.loginValidator');
			}
		}

		const resolvedCustomValidators = isRef(customValidators)
			? customValidators.value
			: undefined;
		if (resolvedCustomValidators) {
			for (const { name, text } of resolvedCustomValidators) {
				if (validation?.[name]?.$invalid) validationText = text;
			}
			return validationText;
		}

		return validationText;
	});

	return {
		isValidation,
		invalid,
		validationText,
	};
};

export const useVuelidateFieldValidation = useFieldValidation;
