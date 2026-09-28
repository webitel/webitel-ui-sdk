import { isEmpty } from '@webitel/ui-sdk/scripts';

import type { FilterData, FilterName, FilterValue } from '../classes/Filter';

export const filterLabelToSnapshotKey = (name: FilterName): string =>
	`${name}_lbl`;

export const filterValueToSnapshotKey = (name: FilterName): string =>
	`${name}_val`;

const filterLabelFromSnapshotKey = (snapshotKey: string): FilterName =>
	snapshotKey.replace('_lbl', '');

const filterValueFromSnapshotKey = (snapshotKey: string): FilterName =>
	snapshotKey.replace('_val', '');

const isLabelSnapshotKey = (snapshotKey: string): boolean =>
	snapshotKey.includes('_lbl');

const isValueSnapshotKey = (snapshotKey: string): boolean =>
	snapshotKey.includes('_val');

export const filterNameFromSnapshotKey = (
	snapshotKey: string,
): FilterName | undefined => {
	if (isLabelSnapshotKey(snapshotKey))
		return filterLabelFromSnapshotKey(snapshotKey);
	if (isValueSnapshotKey(snapshotKey))
		return filterValueFromSnapshotKey(snapshotKey);
};

export const filterValuePropFromSnapshotKey = (
	snapshotKey: string,
): keyof FilterData | undefined => {
	if (isLabelSnapshotKey(snapshotKey)) return 'label';
	if (isValueSnapshotKey(snapshotKey)) return 'value';
};

export const isEmptyFilterValue = (value: FilterValue): boolean => {
	if (typeof value === 'boolean') return false;
	if (isEmpty(value)) return true;
	if (typeof value !== 'object' || Array.isArray(value)) return false;
	return Object.values(value).every(
		(field) => field === null || field === undefined || field === '',
	);
};
