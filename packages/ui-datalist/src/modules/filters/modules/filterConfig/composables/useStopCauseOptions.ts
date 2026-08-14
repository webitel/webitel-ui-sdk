import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MemberStopCause } from 'webitel-sdk/enums';

const stopCauseLocaleKey = (value: string) =>
	value.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());

export function useStopCauseOptions() {
	const { t } = useI18n();

	const mapStopCauseToLabel = (value: string) =>
		t(`objects.stopCause.${stopCauseLocaleKey(value)}`);

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
