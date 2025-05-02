import { sysTypes } from '@webitel/ui-sdk/api/clients/index';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import get from 'lodash/get';
import { WebitelProtoDataField } from 'webitel-sdk';

import {
  BaseFilterConfig,
  FilterConfigBaseParams,
  IWtSysTypeFilterConfig,
} from '../../../../types/Filters.types';
import { FilterConfig } from '../../classes/FilterConfig';
import { CustomFilterOption } from '../../enums/FilterOption';
import { DateTimeFilterTransformer } from '../_shared/date-time-filter/DateTimeFilterTransformer';
import TypeExtensionFilterValueField from './type-extension-filter-value-field.vue';
import TypeExtensionFilterValuePreview from './type-extension-filter-value-preview.vue';

/**
 * @description
 * TypeExtension filter configs should have "field" property
 * which defines its type
 */
export interface ITypeExtensionFilterConfig extends BaseFilterConfig {
  readonly field: WebitelProtoDataField;
}

/**
 * @internal
 * @description
 * base class for all Type Extension/Custom Lookup filters
 */
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

/**
 * @internal
 * @description
 * class for fields which are referencing to other system types (i.e. WtSysType)
 * designed to be represented as select/multiselect with external api options
 */
class TypeExtensionWtSysTypeFieldFilterConfig
  extends TypeExtensionFilterConfig
  implements IWtSysTypeFilterConfig
{
  async searchRecords(
    { id: filterValue, ...rest },
    // {
    //   filterValue,
    // }: {
    //   filterValue: unknown;
    // },
  ): Promise<{ items: unknown[]; next?: boolean }> {
    const { items, ...restResponse } = await sysTypes.getLookup({
      ...rest,
      ...this.field.lookup,
      id: filterValue,
    });

    /**
     * @author @dlohvinov
     *
     * [WTEL-6787](https://webitel.atlassian.net/browse/WTEL-6787)
     *
     * name from display is get here instead of wt-select props because it's
     * much simplier than configuring wt-select, but still this code is still
     * isolated enough.
     *
     * for instance, contacts:
     * display=name.common_name
     * objects=[{ name: { common_name: 'str' } }]
     */
    return {
      items: items.map((item) => ({
        ...item,
        name: get(item, this.field.lookup.display),
      })),
      ...restResponse,
    };
  }
}

class TypeExtensionDateTimeFieldFilterConfig extends TypeExtensionFilterConfig {
  transformer = new DateTimeFilterTransformer();
}

export const createTypeExtensionFilterConfig = (
  params: FilterConfigBaseParams,
  { field }: { field: WebitelProtoDataField },
) => {
  switch (field.kind) {
    case WtTypeExtensionFieldKind.Select:
      return new TypeExtensionWtSysTypeFieldFilterConfig(params, { field });
    case WtTypeExtensionFieldKind.Multiselect:
      return new TypeExtensionWtSysTypeFieldFilterConfig(params, { field });
    case WtTypeExtensionFieldKind.Calendar:
      return new TypeExtensionDateTimeFieldFilterConfig(params, { field });
    default:
      return new TypeExtensionFilterConfig(params, { field });
  }
};

export type {
  TypeExtensionFilterConfig,
  TypeExtensionWtSysTypeFieldFilterConfig,
};
