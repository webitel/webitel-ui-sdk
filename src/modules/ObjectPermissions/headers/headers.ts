import { SortSymbols } from '../../../scripts/sortQueryAdapters';

/**
 * `field` is what goes into the `fields` query of `GET <object>/:id/acl`.
 * The endpoint knows the rule fields by their letter (`r`, `w`, `d`) and answers
 * with a single `granted` string; asking for `granted` itself is a 400.
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
