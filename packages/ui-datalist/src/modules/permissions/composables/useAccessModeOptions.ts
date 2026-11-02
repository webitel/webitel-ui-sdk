import { AccessMode } from '@webitel/api-services/enums';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

interface AccessModeRow {
	access: Record<
		string,
		{
			id: number;
		}
	>;
}

/** [Claude] access mode select options, and the rows with a localized name on every rule */
export const useAccessModeOptions = <Row extends AccessModeRow>(
	dataList: MaybeRefOrGetter<Row[]>,
) => {
	const { t } = useI18n();

	const getAccessModeName = (mode: number) => t(`access.accessMode.${mode}`);

	const accessOptions = computed(() =>
		Object.values(AccessMode).map((mode) => ({
			id: mode,
			name: getAccessModeName(mode),
		})),
	);

	const localizedDataList = computed(() =>
		toValue(dataList).map((item) => ({
			...item,
			access: Object.fromEntries(
				Object.entries(item.access).map(([rule, value]) => [
					rule,
					{
						...value,
						name: getAccessModeName(value.id),
					},
				]),
			),
		})),
	);

	return {
		accessOptions,
		localizedDataList,
	};
};
