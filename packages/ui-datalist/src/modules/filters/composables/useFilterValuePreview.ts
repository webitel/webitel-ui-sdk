import { injectFilterReadAccess } from '@webitel/ui-sdk/modules/Userinfo';
import { computed, type MaybeRefOrGetter, ref, toValue, watch } from 'vue';

import type { IFilter } from '../classes/Filter';
import type {
	AnyFilterConfig,
	FilterConfigSearchMethodParams,
} from '../modules/filterConfig/classes/FilterConfig';
import { canLoadPreviewRecords } from '../scripts/canLoadPreviewRecords';

/**
 * @author @dlohvinov
 *
 * @description
 * Loads the data shown in a filter's hover preview (records behind the stored ids)
 * once per filter value, in the parent, instead of inside tooltip components —
 * to avoid api requests spam.
 *
 * Shared by the panel chip and the column header icon (WTEL-7727).
 */
export const useFilterValuePreview = ({
	filter,
	filterConfig,
}: {
	filter: MaybeRefOrGetter<IFilter | undefined>;
	filterConfig: MaybeRefOrGetter<AnyFilterConfig>;
}) => {
	const getHasReadAccess = injectFilterReadAccess();
	const localValue = ref();
	const isLoaded = ref(false);

	const fillLocalValue = async (currentFilter = toValue(filter)) => {
		isLoaded.value = false;

		if (!currentFilter) {
			localValue.value = undefined;
			isLoaded.value = true;
			return;
		}

		const filterName = currentFilter.name;
		const filterValue = currentFilter.value;
		const config = toValue(filterConfig);

		const valueSearchMethod =
			'searchRecords' in config
				? (...params: FilterConfigSearchMethodParams) => {
						/* arrow fn here preserves filterConfig class "this" */
						return config.searchRecords(...params);
					}
				: undefined;

		const canRead = canLoadPreviewRecords(config, getHasReadAccess());

		if (valueSearchMethod && canRead) {
			const { items } = await valueSearchMethod(
				{
					id: filterValue,
					// -1 returns all records
					size: -1,
				},
				{
					filterValue,
					filterName,
					filterConfig: config,
				},
			);
			localValue.value = items;
		} else if (valueSearchMethod) {
			localValue.value = [];
		} else {
			localValue.value = filterValue;
		}

		isLoaded.value = true;
	};

	watch(
		() => toValue(filter)?.value,
		() => {
			fillLocalValue(toValue(filter));
		},
		{
			immediate: true,
		},
	);

	const isRenderPreview = computed(() => isLoaded.value);

	return {
		localValue,
		isRenderPreview,
		fillLocalValue,
	};
};
