import type { DataField } from '@webitel/api-services/gen/models';
import {
	type ComputedRef,
	computed,
	type MaybeRefOrGetter,
	toValue,
} from 'vue';

import type { FilterName, IFilter } from '../classes/Filter';
import type { IFiltersManager } from '../classes/FiltersManager';
import type { BaseFilterConfig } from '../modules/filterConfig/classes/FilterConfig';
import type { FilterConfigDefinition } from '../modules/filterConfig/types/FilterConfigDefinition';

/**
 * Filters from the manager that belong to this panel/menu (its filter options + extension fields),
 * so search filters living in the same manager are ignored.
 *
 * `hasAnyFilters` skips `notDeletable` configs — they are seeded defaults, not a user choice
 * ([WTEL-7014](https://webitel.atlassian.net/browse/WTEL-7014)).
 */
export const useSelectedFilters = ({
	filtersManager,
	filterOptions,
	filterableExtensionFields = [],
	filterConfigs,
}: {
	filtersManager: MaybeRefOrGetter<IFiltersManager>;
	filterOptions: MaybeRefOrGetter<FilterConfigDefinition[]>;
	filterableExtensionFields?: MaybeRefOrGetter<DataField[] | undefined>;
	filterConfigs: ComputedRef<BaseFilterConfig[]>;
}) => {
	const listSelectedFilters = computed(() => {
		const allowedKeys = new Set<FilterName>([
			...toValue(filterOptions).map((filter) =>
				typeof filter === 'string' ? filter : filter.name,
			),
			...(toValue(filterableExtensionFields) ?? []).map((field) => field.id),
		]);

		return new Map<FilterName, IFilter>(
			[
				...toValue(filtersManager).filters,
			].filter(([key]) => allowedKeys.has(key)),
		);
	});

	const hasAnyFilters = computed(() =>
		[
			...listSelectedFilters.value.keys(),
		].some((name) => {
			const filterConfig = filterConfigs.value.find(
				(config) => String(config.name) === String(name),
			);
			return !filterConfig?.notDeletable;
		}),
	);

	return {
		listSelectedFilters,
		hasAnyFilters,
	};
};
