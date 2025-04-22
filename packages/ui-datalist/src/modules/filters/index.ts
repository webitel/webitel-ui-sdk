import {
  Filter,
  FilterConfig,
  FilterInitParams,
  FilterLabel, FilterName,
  FilterValue,
  IFilter
} from './classes/Filter';
import {
  createFiltersManager,
  FiltersManagerConfig,
  IFiltersManager
} from './classes/FiltersManager';
import DynamicFilterSearchComponent from './components/search-bar/dynamic-filter-search.vue';
import TableFiltersPanelComponent from './components/table-filters-panel.vue';
import { FilterOption } from './modules/filterConfig/enums/FilterOption';

export {
  createFiltersManager,
  DynamicFilterSearchComponent,
  Filter,
  FilterOption,
  TableFiltersPanelComponent,
};

export type {
  FilterConfig,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FiltersManagerConfig,
  FilterValue,
  IFilter,
  IFiltersManager,
};
