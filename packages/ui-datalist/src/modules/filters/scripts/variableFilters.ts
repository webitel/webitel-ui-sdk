import type { DataField } from '@webitel/api-services/gen/models';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import type { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';

export const VARIABLE_FIELD_PREFIX = 'variables.';

export const isVariableFilterName = (name: string) =>
	name.startsWith(VARIABLE_FIELD_PREFIX);

export const variableKeyFromFilterName = (name: string) =>
	name.slice(VARIABLE_FIELD_PREFIX.length);

const variableFieldName = (header: WtTableHeader) =>
	header.field ?? header.value;

export const withVariableColumnFilters = (headers: WtTableHeader[]) =>
	headers.map((header) => ({
		...header,
		filter: variableFieldName(header),
	}));

export const toVariableFilterFields = (headers: WtTableHeader[]): DataField[] =>
	headers.map((header) => {
		const field = variableFieldName(header);

		return {
			id: field,
			name: header.text ?? variableKeyFromFilterName(field),
			kind: WtTypeExtensionFieldKind.Text,
		};
	});

export const extractVariableFilters = (params: Record<string, any>) =>
	Object.entries(params).reduce<Record<string, string>>(
		(vars, [name, value]) => {
			if (!isVariableFilterName(name)) return vars;

			vars[variableKeyFromFilterName(name)] = value ?? '';
			return vars;
		},
		{},
	);
