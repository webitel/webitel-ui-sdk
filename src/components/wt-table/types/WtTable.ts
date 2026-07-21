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
	sort?: boolean | null;
	show?: boolean;
};
