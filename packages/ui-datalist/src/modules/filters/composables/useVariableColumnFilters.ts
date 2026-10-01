import type { DataField } from '@webitel/api-services/gen/models';
import type { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { isVariableHeader } from '@webitel/ui-sdk/modules/TableVariableColumnSelect';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

import type { FilterInitParams, FilterName, IFilter } from '../classes/Filter';
import type { IFiltersManager } from '../classes/FiltersManager';
import { VariableKeyFilterConfig } from '../modules/filterConfig/components/variable/variableKeyFilterConfig';
import { FilterOption } from '../modules/filterConfig/enums/FilterOption';
import {
	isVariableFilterName,
	toVariableFilterFields,
	VARIABLE_FIELD_PREFIX,
	variableKeyFromFilterName,
} from '../scripts/variableFilters';

const parseVariableFilterValue = (raw: string) =>
	raw.split('&').reduce<Record<string, string>>((vars, pair) => {
		const [key, value] = pair.split('=');
		if (key) vars[key] = value ?? '';
		return vars;
	}, {});

export const useVariableColumnFilters = ({
	shownHeaders,
	filtersManager,
	addFilter,
	updateFilter,
	deleteFilter,
}: {
	shownHeaders: MaybeRefOrGetter<WtTableHeader[] | undefined>;
	filtersManager: MaybeRefOrGetter<IFiltersManager>;
	addFilter: (params: FilterInitParams) => IFilter;
	updateFilter: (params: FilterInitParams) => IFilter;
	deleteFilter: (params: { name: FilterName }) => IFilter | undefined;
}) => {
	const { t } = useI18n();

	const variableFilterFields = computed<DataField[]>(() => {
		const headers = toValue(shownHeaders) || [];
		const columnHeaders = headers.filter(
			(header) => isVariableHeader(header) && header.filtered,
		);

		return toVariableFilterFields(columnHeaders).filter(
			(field) => !field.id || !toValue(filtersManager).hasFilter(field.id),
		);
	});

	const variableFilterConfigs = computed(() =>
		toValue(filtersManager)
			.getAllKeys()
			.filter(isVariableFilterName)
			.map(
				(name) =>
					new VariableKeyFilterConfig({
						name,
						label: t('webitelUI.filters.variable'),
					}),
			),
	);

	const splitVariableFilter = (
		params: FilterInitParams,
		replacedName?: FilterName,
	) => {
		const variables = parseVariableFilterValue(String(params.value ?? ''));

		if (
			replacedName &&
			!(variableKeyFromFilterName(replacedName) in variables)
		) {
			deleteFilter({
				name: replacedName,
			});
		}

		Object.entries(variables).forEach(([key, value]) => {
			addFilter({
				name: `${VARIABLE_FIELD_PREFIX}${key}`,
				value,
				label: params.label,
			});
		});

		if (toValue(filtersManager).hasFilter(FilterOption.Variable)) {
			deleteFilter({
				name: FilterOption.Variable,
			});
		}
	};

	const handleAddFilter = (params: FilterInitParams) => {
		if (params.name === FilterOption.Variable) {
			splitVariableFilter(params);
			return;
		}

		addFilter(params);
	};

	const handleUpdateFilter = (params: FilterInitParams) => {
		if (params.name === FilterOption.Variable) {
			splitVariableFilter(params);
			return;
		}

		updateFilter(params);
	};

	const handlePanelUpdateFilter = (params: FilterInitParams) => {
		if (isVariableFilterName(params.name)) {
			splitVariableFilter(params, params.name);
			return;
		}

		handleUpdateFilter(params);
	};

	return {
		variableFilterFields,
		variableFilterConfigs,
		handleAddFilter,
		handleUpdateFilter,
		handlePanelUpdateFilter,
	};
};
