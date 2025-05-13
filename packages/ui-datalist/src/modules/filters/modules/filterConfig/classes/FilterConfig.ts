import { Component } from 'vue';
import { MessageResolver } from 'vue-i18n';

import { FilterName, FilterValue } from '../../../classes/Filter';

export interface BaseFilterConfig {
  name: FilterName;
  valueInputComponent: Component;
  valuePreviewComponent: Component;
  label?: ReturnType<MessageResolver> | string;
  notDeletable?: boolean;
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
