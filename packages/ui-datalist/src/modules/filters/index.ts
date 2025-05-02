import { Filter } from './classes/Filter';
import { createFiltersManager } from './classes/FiltersManager';
import DynamicFilterSearchComponent from './components/search-bar/dynamic-filter-search.vue';
import TableFiltersPanelComponent from './components/table-filters-panel.vue';
import { FilterOption } from './modules/filterConfig/enums/FilterOption';
export * from './modules/filterConfig';
export * from './types/Filters.types';

export {
  createFiltersManager,
  DynamicFilterSearchComponent,
  Filter,
  FilterOption,
  TableFiltersPanelComponent,
};
