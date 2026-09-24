export const SortSymbols = Object.freeze({
	ASC: 'asc',
	DESC: 'desc',
	NONE: null,
} as const);

export type SortOrder = (typeof SortSymbols)[keyof typeof SortSymbols];

// query-string prefix the API sorts by: `+field` ascending, `-field` descending
export type SortQueryPrefix = '+' | '-' | '';

export const sortToQueryAdapter = (order?: SortOrder): SortQueryPrefix => {
	switch (order) {
		case SortSymbols.ASC:
			return '+';
		case SortSymbols.DESC:
			return '-';
		default:
			return '';
	}
};

export const queryToSortAdapter = (order?: string): SortOrder => {
	switch (order) {
		case '+':
			return SortSymbols.ASC;
		case '-':
			return SortSymbols.DESC;
		default:
			return SortSymbols.NONE;
	}
};

// cycles a column through asc -> desc -> none -> asc; a boolean `sort` is the
// back-compat "sortable, not sorted yet" header flag and starts at asc
export const getNextSortOrder = (sort?: SortOrder | boolean): SortOrder => {
	switch (sort) {
		case SortSymbols.ASC:
			return SortSymbols.DESC;
		case SortSymbols.DESC:
			return SortSymbols.NONE;
		default:
			return SortSymbols.ASC;
	}
};
