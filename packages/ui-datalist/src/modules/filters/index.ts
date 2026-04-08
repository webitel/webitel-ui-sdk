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
import DynamicFilterSearchComponent from './components/search-bar/dynamic-filter-search.vue';
import TableFiltersPanelComponent from './components/table-filters-panel.vue';
import { FilterOption } from './modules/filterConfig/enums/FilterOption';

export * from './modules/filterConfig';

export {
	createFiltersManager,
	DynamicFilterSearchComponent,
	Filter,
	FilterOption,
	TableFiltersPanelComponent,
};

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
