import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CallReportingStatus } from 'webitel-sdk';

export function useCallReportingResultOptions() {
	const { t } = useI18n();

	const mapResultToLabel = (value: string) =>
		t(`objects.callReportingResult.${value}`);

	const options = computed(() =>
		Object.values(CallReportingStatus).map((value) => ({
			value,
			label: mapResultToLabel(value),
		})),
	);

	return {
		options,
	};
}
