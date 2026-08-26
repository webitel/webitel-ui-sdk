import { SortSymbols } from '../../../scripts/sortQueryAdapters';

/**
 * `field` is what goes into the `fields` query of `GET <object>/:id/acl`, where
 * the three rule columns all come from one `granted` string — the store asks
 * for it once. The rule letters (`r`, `w`, `d`) are not attributes there.
 */
export const headers = [
	{
		value: 'grantee',
		locale: 'reusable.name',
		field: 'grantee',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'read',
		locale: 'reusable.read',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'edit',
		locale: 'reusable.edit',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'delete',
		locale: 'reusable.delete',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
];
