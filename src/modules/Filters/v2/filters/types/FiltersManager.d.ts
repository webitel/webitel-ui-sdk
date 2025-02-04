import type {
  FilterConfig,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
} from './Filter.types.ts';

export interface IFiltersManager {
  filters: Map<FilterName, IFilter>;

  hasFilter: (name: FilterName) => boolean;
  getFilter: (name: FilterName) => IFilter;
  addFilter: (
    params: FilterInitParams,
    payload?: object,
    config?: FilterConfig,
  ) => IFilter;
  updateFilter: ({
    name,
  }: {
    name: FilterName;
    value?: FilterValue;
    label?: FilterLabel;
  }) => IFilter;
  deleteFilter: (name: FilterName) => IFilter;

  /**
   * Converts filters data to String, that can be stored
   */
  toString: () => string;

  /**
   * Restores filters from string
   */
  fromString: (snapshotStr: string) => void;

  /**
   * deletes filters
   * If include/exclude are not provided, all filters will be deleted
   */
  reset: ({
    include,
    exclude,
  }?: {
    include?: FilterName[];
    exclude?: FilterName[];
  }) => void;

  /**
   * @returns Array<FilterName>
   */
  getAllKeys: () => FilterName[];

  /**
   * @returns { FilterName: FilterValue }
   */

  getAllValues: () => { [name: FilterName]: FilterValue };
  /**
   * @returns Array<IFilter>
   * @param include
   * @param exclude
   */

  getFiltersList: ({
    include,
    exclude,
  }?: {
    include?: FilterName[];
    exclude?: FilterName[];
  }) => IFilter[];
}

export type FiltersManagerConfig = FilterConfig;
