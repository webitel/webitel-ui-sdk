import type { TimeRangeIssue } from '@webitel/api-services/validations';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

export function useTimeRangeIssues(
	items: MaybeRefOrGetter<unknown>,
	getIssues: (items: unknown) => TimeRangeIssue[],
) {
	const { t } = useI18n();

	const issues = computed(() => {
		const byField = new Map<string, string>();

		for (const { index, prop, key } of getIssues(toValue(items))) {
			const field = `${index}.${prop}`;
			if (!byField.has(field)) byField.set(field, key);
		}

		return byField;
	});

	const issueFor = (index: number, prop: string) => {
		const key = issues.value.get(`${index}.${prop}`);

		if (!key) return undefined;

		return {
			$error: true,
			$errors: [
				t(`validation.${key}`),
			],
		};
	};

	return {
		issueFor,
	};
}
