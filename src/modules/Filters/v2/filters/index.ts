import { Filter } from './classes/Filter.class.ts';
import { createFiltersManager } from './classes/FiltersManager.class';
import type {
  FilterConfig,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
} from './types/Filter.types.ts';
import type {
  FiltersManagerConfig,
  IFiltersManager,
} from './types/FiltersManager.types.ts';

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
