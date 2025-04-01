import { Filter } from './classes/Filter.ts';
import { createFiltersManager } from './classes/FiltersManager';
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

export { createFiltersManager, Filter };

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
