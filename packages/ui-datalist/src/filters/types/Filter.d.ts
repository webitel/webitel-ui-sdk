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

export interface FilterConfig {
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

export interface FilterNameSelectRepresentation {
  name: string;
  value: FilterName;
}
