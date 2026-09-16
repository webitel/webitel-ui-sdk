import type { DataField } from '@webitel/api-services/gen/models';
import type { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

import type { FilterName } from '../classes/Filter';
import type { IFiltersManager } from '../classes/FiltersManager';
import { createFilterConfig } from '../modules/filterConfig/classes/createFilterConfig';
import {
	type AnyFilterConfig,
	FilterConfig,
} from '../modules/filterConfig/classes/FilterConfig';
import { createTypeExtensionFilterConfig } from '../modules/filterConfig/components/_custom';
import type { FilterConfigDefinition } from '../modules/filterConfig/types/FilterConfigDefinition';

const isResolvedFilterConfig = (
	filter: WtTableHeader['filter'],
): filter is AnyFilterConfig => typeof filter === 'object' && filter !== null;

/**
 * Resolves a table header into its filter config and the filter currently applied in the
 * filters manager.
 *
 * `header.filter` is either a plain name — resolved the same way the panel does
 * (useFilterConfigsToolkit): a custom (type extension) column is matched by field id in
 * `filterableExtensionFields`, a pre-configured definition from `filterOptions` (the page's
 * filtersOptions) is reused as is, everything else is a standard filter option with an i18n
 * label fallback — or an already-resolved config, used as is. Passing a resolved config from
 * `headers.ts` skips the `filterOptions`/`filterableExtensionFields` search entirely.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
export const useColumnFilter = ({
	header,
	filtersManager,
	filterOptions = [],
	filterableExtensionFields = [],
}: {
	header: MaybeRefOrGetter<WtTableHeader>;
	filtersManager: MaybeRefOrGetter<IFiltersManager>;
	filterOptions?: MaybeRefOrGetter<FilterConfigDefinition[]>;
	filterableExtensionFields?: MaybeRefOrGetter<DataField[]>;
}) => {
	const { t } = useI18n();

	const resolvedFilter = computed(() => {
		const filter = toValue(header).filter;
		return isResolvedFilterConfig(filter) ? filter : undefined;
	});

	const filterName = computed(
		() => (resolvedFilter.value?.name ?? toValue(header).filter) as FilterName,
	);

	const extensionField = computed(() =>
		resolvedFilter.value
			? undefined
			: toValue(filterableExtensionFields).find(
					(field) => field.id === filterName.value,
				),
	);

	const configuredOption = computed(() =>
		resolvedFilter.value
			? undefined
			: toValue(filterOptions).find(
					(opt): opt is AnyFilterConfig =>
						typeof opt !== 'string' && opt.name === filterName.value,
				),
	);

	const filterConfig = computed(() => {
		let config: AnyFilterConfig;

		if (resolvedFilter.value) {
			config = resolvedFilter.value;
		} else if (extensionField.value) {
			config = createTypeExtensionFilterConfig(
				{
					name: extensionField.value.id,
				},
				{
					field: extensionField.value,
				},
			);
		} else {
			const option = configuredOption.value;
			config =
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
		}

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
