import {
  Filter,
  FilterInitParams,
  FilterInstanceConfig,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
} from './classes/Filter';
import {
  createFiltersManager,
  FiltersManagerConfig,
  IFiltersManager,
} from './classes/FiltersManager';
import DynamicFilterSearchComponent from './components/search-bar/dynamic-filter-search.vue';
import TableFiltersPanelComponent from './components/table-filters-panel.vue';
import TableFiltersPanelV2Component from './components/table-filters-panel-v2.vue';
import { FilterOption } from './modules/filterConfig/enums/FilterOption';
export * from './modules/filterConfig';

export {
  createFiltersManager,
  DynamicFilterSearchComponent,
  Filter,
  FilterOption,
  TableFiltersPanelComponent,
  TableFiltersPanelV2Component,
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
