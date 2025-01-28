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
  value: FilterValue;

  constructor(
    { name, value, label }: FilterInitParams,
    public payload: object | undefined,
    public config: FilterConfig,
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
