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

export interface FilterInitParams {
  name: FilterName;
  value: FilterValue;
  label?: FilterLabel;
}

export interface FilterConfig {
  storage?: string[];
}

export interface IFilter {
  name: FilterName;
  value: FilterValue;
  label?: FilterLabel;
  set: (value: unknown) => IFilter;
  get: () => unknown;
  reset: () => IFilter;
}
