import { computed, type MaybeRefOrGetter, ref, toValue, watch } from 'vue';

import type { IFilter } from '../classes/Filter';
import type {
	AnyFilterConfig,
	FilterConfigSearchMethodParams,
} from '../modules/filterConfig/classes/FilterConfig';
import { FilterOptionToPreviewApiSearchMethodMap } from '../modules/filterConfig/components';

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
	filter: MaybeRefOrGetter<IFilter>;
	filterConfig: MaybeRefOrGetter<AnyFilterConfig>;
}) => {
	const localValue = ref();

	const fillLocalValue = async (currentFilter = toValue(filter)) => {
		const filterName = toValue(filter).name;
		const filterValue = currentFilter.value;
		const config = toValue(filterConfig);

		const valueSearchMethod =
			'searchRecords' in config
				? (...params: FilterConfigSearchMethodParams) => {
						/* arrow fn here preserves filterConfig class "this" */
						return config.searchRecords(...params);
					}
				: FilterOptionToPreviewApiSearchMethodMap[filterName];

		if (valueSearchMethod) {
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
		} else {
			localValue.value = filterValue;
		}
	};

	watch(
		() => toValue(filter).value,
		() => {
			fillLocalValue(toValue(filter));
		},
		{
			immediate: true,
		},
	);

	// [https://webitel.atlassian.net/browse/WTEL-6732]
	// if type filter is boolean and value = false, need display preview
	const isRenderPreview = computed(
		() => localValue.value === false || localValue.value,
	);

	return {
		localValue,
		isRenderPreview,
		fillLocalValue,
	};
};
