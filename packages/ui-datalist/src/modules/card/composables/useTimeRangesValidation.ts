import type { TimeRangeError } from '@webitel/api-services/validations';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

export function useTimeRangesValidation(
	items: MaybeRefOrGetter<unknown>,
	getErrors: (items: unknown) => TimeRangeError[],
) {
	const { t } = useI18n();

	const errors = computed(() => {
		const byField = new Map<string, string>();

		for (const { index, prop, key } of getErrors(toValue(items))) {
			const field = `${index}.${prop}`;
			if (!byField.has(field)) byField.set(field, key);
		}

		return byField;
	});

	const getRangeValidation = (index: number, prop: string) => {
		const key = errors.value.get(`${index}.${prop}`);

		if (!key) return undefined;

		return {
			$error: true,
			$errors: [
				t(`validation.${key}`),
			],
		};
	};

	return {
		getRangeValidation,
	};
}
