import { sysTypes } from '@webitel/ui-sdk/api/clients/index';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { get } from 'lodash';
import type { WebitelProtoDataField } from 'webitel-sdk';
import type {
	BaseFilterConfig,
	FilterConfigBaseParams,
	FilterConfigSearchRequestParams,
	IWtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { FilterConfig } from '../../classes/FilterConfig';
import TypeExtensionFilterValueField from './type-extension-filter-value-field.vue';
import TypeExtensionFilterValuePreview from './type-extension-filter-value-preview.vue';

export interface ITypeExtensionFilterConfig extends BaseFilterConfig {
	readonly field: WebitelProtoDataField;
	searchRecords?: IWtSysTypeFilterConfig['searchRecords'];
}

class TypeExtensionFilterConfig
	extends FilterConfig
	implements ITypeExtensionFilterConfig
{
	readonly field: WebitelProtoDataField;

	constructor(
		{ name }: FilterConfigBaseParams,
		{
			field,
		}: {
			field: WebitelProtoDataField;
		},
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
	async searchRecords(
		{ id: filterValue, ...rest }: FilterConfigSearchRequestParams,
		// {
		//   filterValue,
		// }: {
		//   filterValue: unknown;
		// },
	): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		const { display = '', path = '', primary = '' } = this.field.lookup ?? {};
		const { items, ...restResponse } = await sysTypes.getLookup({
			...rest,
			display,
			path,
			primary,
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
			items: items.map((item: Record<string, unknown>) => ({
				...item,
				name: get(item, display),
			})),
			...restResponse,
		};
	}
}

export type {
	TypeExtensionFilterConfig,
	TypeExtensionWtSysTypeFieldFilterConfig,
};

export const createTypeExtensionFilterConfig = (
	params: FilterConfigBaseParams,
	{
		field,
	}: {
		field: WebitelProtoDataField;
	},
) => {
	switch (field.kind) {
		case WtTypeExtensionFieldKind.Select:
			return new TypeExtensionWtSysTypeFieldFilterConfig(params, {
				field,
			});
		case WtTypeExtensionFieldKind.Multiselect:
			return new TypeExtensionWtSysTypeFieldFilterConfig(params, {
				field,
			});
		default:
			return new TypeExtensionFilterConfig(params, {
				field,
			});
	}
};
