import type { DataField } from '../../../../gen/_models';
import { TypeKind } from '../../../../gen/_models/typeKind';
import {
	type DatetimeRangeValue,
	type NormalizeDatetimeValueParam,
	normalizeDatetimeRange,
} from '../../../../scripts';
import type { ApiParams } from '../../_shared/types';

type ScalarFilterValue = string | number | boolean;

type LookupFilterValue =
	| string
	| number
	| {
			id: string | number;
	  };

type DatetimeFilterValue = NormalizeDatetimeValueParam | DatetimeRangeValue;

type ExtensionFilterValue =
	| ScalarFilterValue
	| LookupFilterValue
	| LookupFilterValue[]
	| DatetimeFilterValue;

const quote = (value: ScalarFilterValue) => JSON.stringify(String(value));

const lookupId = (value: LookupFilterValue) =>
	typeof value === 'object' ? value.id : value;

const toListCondition = (
	id: string,
	value: LookupFilterValue | LookupFilterValue[],
) => {
	const items = [
		value,
	].flat();
	if (!items.length) return '';

	const conditions = items.map(
		(item) => `${id}.exists(x, x.id == ${quote(lookupId(item))})`,
	);
	return `(${conditions.join(' || ')})`;
};

const toDatetimeCondition = (id: string, value: DatetimeFilterValue) => {
	const { from, to } = normalizeDatetimeRange(value) ?? {};
	return [
		from && `${id} >= ${from}`,
		to && `${id} <= ${to}`,
	]
		.filter(Boolean)
		.join(' && ');
};

const toCondition = (
	id: string,
	kind: DataField['kind'],
	value: ExtensionFilterValue,
) => {
	switch (kind) {
		case TypeKind.String:
		case TypeKind.Richtext:
			return `${id} == ${quote(value as ScalarFilterValue)}`;
		case TypeKind.Lookup:
			return `${id}.id == ${quote(lookupId(value as LookupFilterValue))}`;
		case TypeKind.List:
			return toListCondition(
				id,
				value as LookupFilterValue | LookupFilterValue[],
			);
		case TypeKind.Datetime:
			return toDatetimeCondition(id, value as DatetimeFilterValue);
		default:
			return `${id} == ${value}`;
	}
};

export const stringifyContactExtensionFilters = (
	params: ApiParams,
	extensionFields: DataField[] = [],
) =>
	extensionFields
		.filter(({ id = '' }) => params[id] != null)
		.map(({ id = '', kind }) => toCondition(id, kind, params[id]))
		.filter(Boolean)
		.join(' && ') || undefined;
