import { AnyFilterConfig } from '../modules/filterConfig';

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
}

export class Filter implements IFilter {
  readonly name: FilterName;
  label: FilterLabel;
  value: FilterValue;

  constructor(
    { name, value, label }: FilterInitParams,
    public payload: object | undefined,
    public config: FilterInstanceConfig,
  ) {
    this.name = name;
    this.value = value;
    this.label = label;
  }

  set({ value, label }: { value?: FilterValue; label?: FilterLabel }): IFilter {
    this.value = value;
    this.label = label;
    return this;
  }
}
