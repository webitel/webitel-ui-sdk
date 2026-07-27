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
	/** `undefined` means the column is not sortable; `boolean` is back-compat */
	sort?: WtTableSortOrder | boolean;
	show?: boolean;
};

/** TODO(types): every cell is read through a header-driven runtime `field` key. */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type WtTableRow = any;
