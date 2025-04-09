import { Filter } from './classes/Filter.ts';
import { createFiltersManager } from './classes/FiltersManager';
import DynamicFilterSearchComponent from './components/search-bar/dynamic-filter-search.vue';
import TableFiltersPanelComponent from './components/table-filters-panel.vue';
import { FilterOption } from './enums/FilterOption';
import type {
  FilterConfig,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
} from './types/Filter.d.ts';
import type {
  FiltersManagerConfig,
  IFiltersManager,
} from './types/FiltersManager.d.ts';

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
