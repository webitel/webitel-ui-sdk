import type { DataField } from '../../../../gen/_models';
import { TypeKind } from '../../../../gen/_models/typeKind';
import {
	isRelativeDatetimeValue,
	normalizeToTimestamp,
} from '../../../../scripts';
import type { ApiParams } from '../../_shared/types';

const quote = (value: unknown) => JSON.stringify(String(value));

const lookupId = (value: ApiParams) => value?.id ?? value;

const toCondition = (id: string, kind: DataField['kind'], value: any) => {
	switch (kind) {
		case TypeKind.String:
		case TypeKind.Richtext:
			return `${id} == ${quote(value)}`;
		case TypeKind.Lookup:
			return `${id}.id == ${quote(lookupId(value))}`;
		case TypeKind.List:
			return `(${[
				value,
			]
				.flat()
				.map((item) => `${id}.exists(x, x.id == ${quote(lookupId(item))})`)
				.join(' || ')})`;
		case TypeKind.Datetime: {
			const { from, to } = isRelativeDatetimeValue(value)
				? {
						from: normalizeToTimestamp(value, {
							round: 'start',
						}),
						to: normalizeToTimestamp(value, {
							round: 'end',
						}),
					}
				: value;
			return [
				from && `${id} >= ${from}`,
				to && `${id} <= ${to}`,
			]
				.filter(Boolean)
				.join(' && ');
		}
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
