import { sysTypes } from '@webitel/ui-sdk/api/clients/index';

import {
  FilterConfig,
  FilterConfigBaseParams,
  IWtSysTypeFilterConfig,
  TFilterConfig,
} from '../../classes/FilterConfig';
import { CustomFilterOption } from '../../enums/FilterOption';
import TypeExtensionFilterValueField from './type-extension-filter-value-field.vue';
import TypeExtensionFilterValuePreview from './type-extension-filter-value-preview.vue';

class TypeExtensionFilterConfig extends FilterConfig {
  constructor({ name }: FilterConfigBaseParams) {
    super({
      name,
      valueInputComponent: TypeExtensionFilterValueField,
      valuePreviewComponent: TypeExtensionFilterValuePreview,
    });
  }
}

class TypeExtensionWtSysTypeFieldFilterConfig
  extends TypeExtensionFilterConfig
  implements IWtSysTypeFilterConfig
{
  searchRecords(
    { id: filterValue, ...rest },
    {
      // filterName,
      // filterValue,
      filterConfig,
    }: {
      filterName: FilterName;
      filterConfig: TFilterConfig;
    },
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return sysTypes.extensionFieldSearchMethod({
      ...rest,
      ...filterConfig.entensionField.lookup,
      id: filterValue,
    });
  }
}

export const createTypeExtensionFilterConfig = (
  name: CustomFilterOption,
  { field },
) => {
  switch (field) {
    default:
  }
};
