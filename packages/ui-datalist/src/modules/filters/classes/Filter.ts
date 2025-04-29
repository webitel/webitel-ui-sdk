import { FilterValueConsumer } from '../enums/FilterValueConsumer';
import {
  AnyFilterConfig,
  FilterInitParams,
  FilterLabel,
  FilterName,
  FilterValue,
  IFilter,
  IFilterTransformer,
  IFilterTransformerReturnType,
} from '../types/Filters.types';

export class Filter implements IFilter {
  readonly name: FilterName;
  label: FilterLabel;
  value: FilterValue;
  config: AnyFilterConfig;
  transformer: IFilterTransformer;

  constructor(
    { name, value, label, config }: FilterInitParams,
    public payload: object | undefined,
  ) {
    this.name = name;
    this.value = value;
    this.label = label;
    this.config = config;
  }

  set({ value, label }: { value?: FilterValue; label?: FilterLabel }): IFilter {
    this.value = value;
    this.label = label;
    return this;
  }

  get(
    params: {
      consumer?: FilterValueConsumer;
    } = {},
  ): IFilterTransformerReturnType | FilterValue {
    if (!params.consumer) {
      return this.value;
    }

    if (params.consumer) {
      if (
        params.consumer === FilterValueConsumer.API &&
        this.config?.transformer.transformToApi
      ) {
        return this.config.transformer.transformToApi(this);
      }

      console.warn(
        `Warning: FilterTransformer for filter is not provided
         or there is no transformer method to transform value for this consumer
         , returning its value`,
        this,
      );
      return this.value;
    }
  }
}
