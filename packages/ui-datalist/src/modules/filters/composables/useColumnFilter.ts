import type { DataField } from '@webitel/api-services/gen/models';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

import type { DatalistTableHeader } from '../../types/tableStore.types';
import type { FilterName } from '../classes/Filter';
import type { IFiltersManager } from '../classes/FiltersManager';
import { createFilterConfig } from '../modules/filterConfig/classes/createFilterConfig';
import { FilterConfig } from '../modules/filterConfig/classes/FilterConfig';
import { createTypeExtensionFilterConfig } from '../modules/filterConfig/components/_custom';
import type { FilterConfigDefinition } from '../modules/filterConfig/types/FilterConfigDefinition';

/**
 * Resolves a table header (`header.filter` name) into its filter config and the filter
 * currently applied in the filters manager, the same way the panel does (useFilterConfigsToolkit):
 * a custom (type extension) column is matched by field id in `filterableExtensionFields`,
 * a pre-configured definition from `filterOptions` (the page's filtersOptions) is reused as is,
 * everything else is a standard filter option with an i18n label fallback.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
export const useColumnFilter = ({
	header,
	filtersManager,
	filterOptions = [],
	filterableExtensionFields = [],
}: {
	header: MaybeRefOrGetter<DatalistTableHeader>;
	filtersManager: MaybeRefOrGetter<IFiltersManager>;
	filterOptions?: MaybeRefOrGetter<FilterConfigDefinition[]>;
	filterableExtensionFields?: MaybeRefOrGetter<DataField[]>;
}) => {
	const { t } = useI18n();

	const filterName = computed(() => toValue(header).filter as FilterName);

	const extensionField = computed(() =>
		toValue(filterableExtensionFields).find(
			(field) => field.id === filterName.value,
		),
	);

	const configuredOption = computed(() =>
		toValue(filterOptions).find(
			(opt) => typeof opt !== 'string' && opt.name === filterName.value,
		),
	);

	const filterConfig = computed(() => {
		if (extensionField.value) {
			return createTypeExtensionFilterConfig(
				{
					name: extensionField.value.id,
				},
				{
					field: extensionField.value,
				},
			);
		}

		const option = configuredOption.value;
		const config =
			option instanceof FilterConfig
				? option
				: option
					? new FilterConfig({
							...option,
							name: option.name,
						})
					: createFilterConfig({
							name: filterName.value,
						});

		if (!config.label) {
			config.label = t(`webitelUI.filters.${config.name}`);
		}

		return config;
	});

	const filter = computed(() =>
		toValue(filtersManager).getFilter(filterName.value),
	);

	return {
		filterConfig,
		filter,
	};
};
