import type { DataField } from '@webitel/api-services/gen/models';
import type { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { isVariableHeader } from '@webitel/ui-sdk/modules/TableVariableColumnSelect';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useI18n } from 'vue-i18n';

import type { FilterInitParams, FilterName, IFilter } from '../classes/Filter';
import type { IFiltersManager } from '../classes/FiltersManager';
import { FilterOption } from '../modules/filterConfig/enums/FilterOption';
import {
	isVariableFilterName,
	toVariableFilterFields,
	variableKeyFromFilterName,
	VARIABLE_FIELD_PREFIX,
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

	const withVariableFilterLabel = (
		params: FilterInitParams,
	): FilterInitParams =>
		isVariableFilterName(params.name)
			? {
					...params,
					label: t('webitelUI.filters.variable'),
				}
			: params;

	const variableFilterFields = computed<DataField[]>(() => {
		const headers = toValue(shownHeaders) || [];
		const columnHeaders = headers.filter(
			(header) => isVariableHeader(header) && header.filtered,
		);
		const columnFields = toVariableFilterFields(columnHeaders);

		const knownNames = new Set(columnFields.map((field) => field.id));
		const appliedOnlyFields = toValue(filtersManager)
			.getAllKeys()
			.filter((name) => isVariableFilterName(name) && !knownNames.has(name))
			.map((name) => ({
				id: name,
				name: variableKeyFromFilterName(name),
				kind: WtTypeExtensionFieldKind.Text,
			}));

		return [
			...columnFields,
			...appliedOnlyFields,
		];
	});

	const applyVariableFilter = (params: FilterInitParams) => {
		if (params.name !== FilterOption.Variable) {
			addFilter(withVariableFilterLabel(params));
			return;
		}

		const variables = parseVariableFilterValue(String(params.value ?? ''));

		Object.entries(variables).forEach(([key, value]) => {
			addFilter(
				withVariableFilterLabel({
					name: `${VARIABLE_FIELD_PREFIX}${key}`,
					value,
				}),
			);
		});

		if (toValue(filtersManager).hasFilter(FilterOption.Variable)) {
			deleteFilter({
				name: FilterOption.Variable,
			});
		}
	};

	const handleAddFilter = (params: FilterInitParams) =>
		addFilter(withVariableFilterLabel(params));

	const handleUpdateFilter = (params: FilterInitParams) =>
		updateFilter(withVariableFilterLabel(params));

	return {
		variableFilterFields,
		applyVariableFilter,
		handleAddFilter,
		handleUpdateFilter,
	};
};
