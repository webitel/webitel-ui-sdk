import { SortSymbols } from '../../../scripts/sortQueryAdapters';

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
