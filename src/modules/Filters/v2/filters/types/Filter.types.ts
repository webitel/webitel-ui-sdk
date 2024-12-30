export type FilterName = string;
export type FilterValue = object | [] | string | number | boolean | undefined | null;

export interface FilterInitParams {
  name: FilterName;
  value: FilterValue;
}

export interface FilterConfig {
  storage?: string[];
}

export interface IFilter {
  name: FilterName;
  value: FilterValue;
  set: (value: unknown) => IFilter;
  get: () => unknown;
  reset: () => IFilter;
  restore: () => IFilter;
}
