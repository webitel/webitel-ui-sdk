import { Component } from 'vue';
import { MessageResolver } from 'vue-i18n';

import { FilterValueConsumer } from '../enums/FilterValueConsumer';

/**
 * @author @dlohvinov
 *
 * All filters-related types are defined here coz they are referencing each other,
 * so that if they are separated, it will be impossible to import them without circular dependencies
 */

export type FilterName = string;
export type FilterLabel = string;
export type FilterValue =
  | object
  | []
  | string
  | number
  | boolean
  | undefined
  | null;

/**
 * represents user-input data, that should be (re)stored
 */
export interface FilterData {
  value: FilterValue;
  label?: FilterLabel;
}

export interface FilterInitParams extends FilterData {
  name: FilterName;
  config?: AnyFilterConfig;
}

export interface FilterEnumOption {
  locale: string;
  value: FilterValue;
}

export interface FilterInstanceConfig {
  /**
   * Perform simple type conversion on store/restore,
   * without need to provide custom store/restore functions
   */
  storableType?: string;
  /**
   * list of persistence storages that should be used for this filter
   */
  storage?: string[];
}

export interface IFilter {
  name: FilterName;
  value: FilterValue;
  label?: FilterLabel;
  set: (data: FilterData) => IFilter;
  get: (params: {
    consumer?: FilterValueConsumer;
  }) => IFilterTransformerReturnType | FilterValue;
  config?: AnyFilterConfig;
}

/**
 * @description
 * When simple get/set isn't enough. Create
 * new classes and implement methods only if necessary for specific filters
 *
 * @author @dlohvinov
 * All transformers are marked as optional, because
 * if we implement defaults even as (v) => v, it will complicate
 * the code readability
 */
export interface IFilterTransformer {
  transformToApi?: (filter: IFilter) => unknown;
  transformToValueInput?: (filter: IFilter) => unknown;
  transformToPreview?: (filter: IFilter) => unknown;
  transformFromValueInput?: (filter: IFilter) => unknown;
  transformFromPreview?: (filter: IFilter) => unknown;
}

export type IFilterTransformerReturnType =
  | ReturnType<NonNullable<IFilterTransformer['transformToApi']>>
  | ReturnType<NonNullable<IFilterTransformer['transformToValueInput']>>
  | ReturnType<NonNullable<IFilterTransformer['transformToPreview']>>
  | ReturnType<NonNullable<IFilterTransformer['transformFromValueInput']>>
  | ReturnType<NonNullable<IFilterTransformer['transformFromPreview']>>;

export interface BaseFilterConfig {
  name: FilterName;
  valueInputComponent: Component;
  valuePreviewComponent: Component;
  label?: ReturnType<MessageResolver> | string;
  notDeletable?: boolean;
  transformer?: IFilterTransformer;
}

export type FilterConfigBaseParams = {
  name?: FilterName;
  valueInputComponent?: Component;
  valuePreviewComponent?: Component;
  notDeletable?: boolean;
};

export interface IWtSysTypeFilterConfig extends BaseFilterConfig {
  searchRecords: (
    params: FilterConfigSearchMethodParams,
  ) => Promise<{ items: unknown[]; next?: boolean }>;
}

export type FilterConfigSearchMethodParams = [
  /**
   * @description
   * any request-related data
   */
  unknown,
  /**
   * @description
   * filter-related data
   */
  {
    filterName: FilterName;
    filterValue: FilterValue;
    filterConfig: BaseFilterConfig;
  },
];
export type AnyFilterConfig = IWtSysTypeFilterConfig | BaseFilterConfig;

export type FiltersManagerInclude = FilterName[];
export type FiltersManagerExclude = FilterName[];
/**
 * i.e. "includer"/"excluder"
 */
export type FiltersManagerFiltersSpecifierOptions = {
  include?: FiltersManagerInclude;
  exclude?: FiltersManagerExclude;
};

export interface IFiltersManager {
  filters: Map<FilterName, IFilter>;

  hasFilter: (name: FilterName) => boolean;
  getFilter: (name: FilterName) => IFilter;
  addFilter: (
    params: FilterInitParams,
    payload?: object,
    config?: FilterInstanceConfig,
  ) => IFilter;
  updateFilter: ({
    name,
  }: {
    name: FilterName;
    value?: FilterValue;
    label?: FilterLabel;
  }) => IFilter;
  deleteFilter: ({ name }: IFilter) => IFilter;

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
  reset: ({ include, exclude }?: FiltersManagerFiltersSpecifierOptions) => void;

  /**
   * @returns Array<FilterName>
   */
  getAllKeys: () => FilterName[];

  /**
   *
   * @deprecated
   * @description
   * calls "getValues" under the hood. should be replaced for getValues method
   * directly coz word "All" in this naming conflicts with include/exclude params
   *
   * @returns { FilterName: FilterValue }
   */
  getAllValues: () => { [name: FilterName]: FilterValue };
  /**
   * @returns Array<IFilter>
   * @param include
   * @param exclude
   */

  getFiltersList: (params?: FiltersManagerFiltersSpecifierOptions) => IFilter[];

  getValues: (
    params: {
      consumer?: FilterValueConsumer;
    } & FiltersManagerFiltersSpecifierOptions,
  ) => Record<FilterName, ReturnType<IFilter['get']>>;
}

export type FiltersManagerConfig = FilterInstanceConfig;
