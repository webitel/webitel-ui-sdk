import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

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

/** [Claude] object classes OBAC also grants "create" (`x`), right after the grantee */
export const headersWithCreate = [
	headers[0],
	{
		value: 'create',
		locale: 'reusable.create',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
	...headers.slice(1),
];
