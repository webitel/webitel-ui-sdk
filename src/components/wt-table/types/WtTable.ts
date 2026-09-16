import type { SortSymbols } from '../../../scripts/sortQueryAdapters';

/** derived so adding a symbol to `SortSymbols` widens this automatically */
export type WtTableSortOrder = (typeof SortSymbols)[keyof typeof SortSymbols];

export type WtTableHeaderFilter =
	| string
	| {
			name: string;
	  };

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
	/** `false` excludes the column from drag-to-reorder and pins it to the start */
	reorderable?: boolean;
	/**
	 * Filter shown in the column header popover (`column-filter` slot).
	 * Set only on columns that have a header filter.
	 *
	 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
	 */
	filter?: WtTableHeaderFilter;
	/**
	 * Shows the badge on the filter icon. Set by whoever owns `headers` (mirrors `sort`: read
	 * here, written by the caller), not derived from a separate table-wide prop.
	 *
	 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
	 */
	filtered?: boolean;
};

/** TODO(types): every cell is read through a header-driven runtime `field` key. */
// biome-ignore lint/suspicious/noExplicitAny: see TODO above
export type WtTableRow = any;
