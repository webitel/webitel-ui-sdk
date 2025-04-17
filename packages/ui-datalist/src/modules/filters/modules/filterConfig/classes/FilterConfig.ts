import { Component } from 'vue';
import { MessageResolver } from 'vue-i18n';

import { FilterName, FilterValue } from '../../../classes/Filter';
import {
  FilterOptionToFilterConfigClassMap,
  FilterOptionToValueComponentMap,
} from '../components';
import { FilterOption } from '../enums/FilterOption';

export interface BaseFilterConfig {
  name: FilterName;
  valueInputComponent: Component;
  valuePreviewComponent: Component;
  label?: ReturnType<MessageResolver> | string;
}

export type FilterConfigBaseParams = {
  name?: FilterName;
  valueInputComponent?: Component;
  valuePreviewComponent?: Component;
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

export type TFilterConfig = IWtSysTypeFilterConfig | BaseFilterConfig;

export class FilterConfig implements BaseFilterConfig {
  name: FilterName;
  valueInputComponent: Component;
  valuePreviewComponent: Component;
  label?: ReturnType<MessageResolver> | string;

  constructor({
    name,
    valueInputComponent,
    valuePreviewComponent,
  }: FilterConfigBaseParams = {}) {
    if (name) this.name = name;
    if (valueInputComponent) this.valueInputComponent = valueInputComponent;
    if (valuePreviewComponent)
      this.valuePreviewComponent = valuePreviewComponent;
  }
}

export class WtSysTypeFilterConfig
  extends FilterConfig
  implements IWtSysTypeFilterConfig
{
  name: FilterName;
  searchRecords: (
    params: unknown,
  ) => Promise<{ items: unknown[]; next?: boolean }>;
}

export const createFilterConfig = ({
  filterOption,
}: {
  filterOption: FilterOption;
}): BaseFilterConfig => {
  const filterConfigClass = FilterOptionToFilterConfigClassMap[filterOption];

  if (filterConfigClass) {
    return new filterConfigClass();
  }

  // throw new Error(
  //   `Filter config class not found for this filter option: ${filterOption}`,
  // );

  /**
   * @author @dlohvinov
   *
   * @deprecated
   * compat. should be removed with FilterOption to Component maps
   * */
  return new FilterConfig({
    name: filterOption,
    valueInputComponent: FilterOptionToValueComponentMap[filterOption],
    previewComponent: FilterOptionToValueComponentMap[filterOption],
  });
};
