import { MemberStopCause } from '@webitel/api-services/enums';
import { camelCase } from 'change-case';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useStopCauseOptions() {
	const { t } = useI18n();

	const mapStopCauseToLabel = (value: string) =>
		t(`objects.stopCause.${camelCase(value)}`);

	const options = computed(() =>
		Object.values(MemberStopCause).map((value) => ({
			value,
			label: mapStopCauseToLabel(value),
		})),
	);

	return {
		options,
	};
}
