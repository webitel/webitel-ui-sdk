import {
	Filter,
	type FilterInitParams,
	type FilterInstanceConfig,
	type FilterLabel,
	type FilterName,
	type FilterValue,
	type IFilter,
} from './classes/Filter';
import {
	createFiltersManager,
	type FiltersManagerConfig,
	type IFiltersManager,
} from './classes/FiltersManager';
import ColumnFilterComponent from './components/column/column-filter.vue';
import FiltersActionsMenuComponent from './components/filters-actions-menu.vue';
import DynamicFilterSearchComponent from './components/search-bar/dynamic-filter-search.vue';
import TableFiltersPanelComponent from './components/table-filters-panel.vue';
import { useVariableColumnFilters } from './composables/useVariableColumnFilters';
import { FilterOption } from './modules/filterConfig/enums/FilterOption';

export * from './modules/filterConfig';
export {
	VARIABLE_FIELD_PREFIX,
	extractVariableFilters,
	isVariableFilterName,
	toVariableFilterFields,
	variableKeyFromFilterName,
	withVariableColumnFilters,
} from './scripts/variableFilters';
export type {
	FilterInitParams,
	FilterInstanceConfig,
	FilterLabel,
	FilterName,
	FiltersManagerConfig,
	FilterValue,
	IFilter,
	IFiltersManager,
};
export {
	ColumnFilterComponent,
	createFiltersManager,
	DynamicFilterSearchComponent,
	Filter,
	FilterOption,
	FiltersActionsMenuComponent,
	TableFiltersPanelComponent,
	useVariableColumnFilters,
};
