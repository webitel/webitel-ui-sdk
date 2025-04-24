import { sysTypes } from '@webitel/ui-sdk/api/clients/index';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { WebitelProtoDataField } from 'webitel-sdk';

import { FilterConfig } from '../../classes/FilterConfig';
import { CustomFilterOption } from '../../enums/FilterOption';
import {
  BaseFilterConfig,
  FilterConfigBaseParams,
  IWtSysTypeFilterConfig,
} from '../../types/FilterConfig';
import TypeExtensionFilterValueField from './type-extension-filter-value-field.vue';
import TypeExtensionFilterValuePreview from './type-extension-filter-value-preview.vue';

export interface ITypeExtensionFilterConfig extends BaseFilterConfig {
  readonly field: WebitelProtoDataField;
}

class TypeExtensionFilterConfig
  extends FilterConfig
  implements ITypeExtensionFilterConfig
{
  readonly field: WebitelProtoDataField;

  constructor(
    { name }: FilterConfigBaseParams,
    { field }: { field: WebitelProtoDataField },
  ) {
    super({
      name,
      valueInputComponent: TypeExtensionFilterValueField,
      valuePreviewComponent: TypeExtensionFilterValuePreview,
    });

    this.label = field.name;
    this.field = field;
  }
}

class TypeExtensionWtSysTypeFieldFilterConfig
  extends TypeExtensionFilterConfig
  implements IWtSysTypeFilterConfig
{
  searchRecords(
    { id: filterValue, ...rest },
    // {
    //   filterValue,
    // }: {
    //   filterValue: unknown;
    // },
  ): Promise<{ items: unknown[]; next?: boolean }> {
    return sysTypes.getLookup({
      ...rest,
      ...this.field.lookup,
      id: filterValue,
    });
  }
}

export type {
  TypeExtensionFilterConfig,
  TypeExtensionWtSysTypeFieldFilterConfig,
};

export const createTypeExtensionFilterConfig = (
  name: CustomFilterOption,
  { field }: { field: WebitelProtoDataField },
) => {
  switch (field.kind) {
    case WtTypeExtensionFieldKind.Select:
      return new TypeExtensionWtSysTypeFieldFilterConfig(name, { field });
    case WtTypeExtensionFieldKind.Multiselect:
      return new TypeExtensionWtSysTypeFieldFilterConfig(name, { field });
    default:
      return new TypeExtensionFilterConfig(name, { field });
  }
};
