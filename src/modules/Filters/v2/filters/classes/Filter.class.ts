import deepcopy from 'deep-copy';

import type {
  FilterConfig,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
} from '../types/Filter.types.ts';

export class Filter implements IFilter {
  readonly name: FilterName;
  label: FilterLabel;

  initialValue: FilterValue;
  multiple?: boolean;

  constructor(
    { name, value, label }: FilterInitParams,
    public payload: object | undefined,
    public config: FilterConfig,
  ) {
    this.name = name;
    this.value = value;
    this.label = label;

    this.initialValue = deepcopy(value);
    this.multiple = Array.isArray(value);
  }

  get(): FilterValue {
    return this.value;
  }

  reset(): IFilter {
    this.value = deepcopy(this.initialValue);
    return this;
  }

  restore(): IFilter {
    return undefined;
  }

  set(value: FilterValue): IFilter {
    this.value = value;
    return this;
  }

  value: FilterValue;
}
