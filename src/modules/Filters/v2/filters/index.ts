import { Filter } from './classes/Filter.class.ts';
import { createFiltersManager } from './classes/FiltersManager.class';
import type {
  FilterConfig,
  FilterInitParams,
  FilterName,
  FilterValue,
  IFilter,
} from './types/Filter.types.ts';
import type {
  FiltersManagerConfig,
  IFiltersManager,
} from './types/FiltersManager.types.ts';

export { Filter, createFiltersManager };

export type {
  FilterConfig,
  FilterInitParams,
  FilterName,
  FilterValue,
  IFilter,
  FiltersManagerConfig,
  IFiltersManager,
};
