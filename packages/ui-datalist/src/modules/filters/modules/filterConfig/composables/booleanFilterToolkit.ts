import { useVuelidate } from '@vuelidate/core';
import { computed, type ModelRef, type Reactive, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { BooleanFilterModelValue } from '../enums/options/BooleanFilterOptions';

export const usePrettifyBooleanValuePreview = (
	value: Reactive<boolean>,
): {
	localeValue: Ref<string>;
} => {
	const { t } = useI18n();

	const localeValue = computed(() => {
		return value ? t('vocabulary.yes') : t('vocabulary.no');
	});

	return {
		localeValue,
	};
};

export const useBooleanFilterValueValidation = <
	T extends BooleanFilterModelValue,
>(
	// `defineModel<T>()` without a default always widens to `T | undefined`, and the
	// shared has-option field writes `null` when the selection is cleared.
	model: ModelRef<T | null | undefined>,
) => {
	const v$ = useVuelidate(
		computed(() => ({
			model: {
				required: (v: T | null | undefined) => !(!v && v !== false),
			},
		})),
		{
			model,
		},
		{
			$autoDirty: true,
		},
	);

	v$.value.$touch();

	return {
		v$,
	};
};
