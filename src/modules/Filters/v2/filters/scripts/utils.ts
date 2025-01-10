import type { FilterName } from '../types/Filter.types.ts';

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

export const filterNameFromSnapshotKey = (snapshotKey: string): FilterName => {
  if (isLabelSnapshotKey(snapshotKey))
    return filterLabelFromSnapshotKey(snapshotKey);
  if (isValueSnapshotKey(snapshotKey))
    return filterValueFromSnapshotKey(snapshotKey);
};

export const filterValuePropFromSnapshotKey = (snapshotKey: string): string => {
  if (isLabelSnapshotKey(snapshotKey)) return 'label';
  if (isValueSnapshotKey(snapshotKey)) return 'value';
};
