export type WtTableSortOrder = 'asc' | 'desc' | null;

export type WtTableHeader = {
	value: string;
	/**
	 * i18n key, or args for `t(key, ...params)` (plural count, named params, …).
	 * Plain arrays are allowed — header defs often don't use `as const` tuples.
	 */
	locale?: string | (string | number | Record<string, unknown>)[];
	text?: string;
	width?: string;
	/** API/query field name when it differs from `value` */
	field?: string;
	/**
	 * Current sort order of the column. `undefined` marks the column as not
	 * sortable at all; `boolean` is accepted for backwards compatibility.
	 */
	sort?: WtTableSortOrder | boolean;
	show?: boolean;
};

/**
 * A row rendered by `wt-table`.
 *
 * TODO(types): rows are consumer-supplied and every cell is read through a
 * header-driven runtime `field` key, so the shape cannot be described without
 * making the table generic over the row type.
 */
// biome-ignore lint/suspicious/noExplicitAny: consumer-supplied row shape, see TODO above
export type WtTableRow = any;
