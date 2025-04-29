import { Component } from 'vue';
import { MessageResolver } from 'vue-i18n';

import {
  BaseFilterConfig,
  FilterConfigBaseParams,
  FilterName,
  IWtSysTypeFilterConfig,
} from '../../../types/Filters.types';
import {
  FilterOptionToFilterConfigCreatorMap,
  FilterOptionToPreviewComponentMap,
  FilterOptionToValueComponentMap,
} from '../components';

export class FilterConfig implements BaseFilterConfig {
  name: FilterName;
  valueInputComponent: Component;
  valuePreviewComponent: Component;
  label?: ReturnType<MessageResolver> | string;
  notDeletable: boolean;

  constructor({
    name,
    valueInputComponent,
    valuePreviewComponent,
    notDeletable,
  }: FilterConfigBaseParams = {}) {
    if (name) this.name = name;
    if (valueInputComponent) this.valueInputComponent = valueInputComponent;
    if (valuePreviewComponent)
      this.valuePreviewComponent = valuePreviewComponent;
    this.notDeletable = !!notDeletable;
  }
}

/**
 * @author @dlohvinov
 *
 * @description
 * "abstract" class is used to support default config fields for all WtSysTypeFilterConfig
 * classes in future
 */
export abstract class WtSysTypeFilterConfig
  extends FilterConfig
  implements IWtSysTypeFilterConfig
{
  abstract name;
  abstract searchRecords;
}

export const createFilterConfig = (
  params: FilterConfigBaseParams &
    Required<BaseFilterConfig['name']> &
    Record<string, unknown>,
): BaseFilterConfig => {
  const { name } = params;

  const filterConfigClass = FilterOptionToFilterConfigCreatorMap[name];

  if (filterConfigClass) {
    return filterConfigClass(params);
  }

  return new FilterConfig({
    valueInputComponent: FilterOptionToValueComponentMap[name],
    valuePreviewComponent: FilterOptionToPreviewComponentMap[name],
    ...params,
  });
};
