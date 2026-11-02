import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

/**
 * [Claude] Each rule column keeps its own `field` (`r`, `w`, `d`), so sorting
 * one marks only that column and sends `sort=+r` / `+w` / `+d`. `GET
 * <object>/:id/acl` has no such attributes in `fields` though — it returns the
 * three rules merged into one `granted` string — so `PermissionsApiModule`
 * asks for `granted` in their place.
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
		field: 'r',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'edit',
		locale: 'reusable.edit',
		field: 'w',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'delete',
		locale: 'reusable.delete',
		field: 'd',
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
