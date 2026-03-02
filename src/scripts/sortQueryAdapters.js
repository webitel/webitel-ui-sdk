export const SortSymbols = Object.freeze({
	ASC: 'asc',
	DESC: 'desc',
	NONE: null,
});

export const SortMode = Object.freeze({
	ASC_DESC_NONE: 'asc-desc-none',
	ASC_DESC: 'asc-desc',
});

export const sortToQueryAdapter = (order) => {
	switch (order) {
		case SortSymbols.ASC:
			return '+';
		case SortSymbols.DESC:
			return '-';
		default:
			return '';
	}
};

export const queryToSortAdapter = (order) => {
	switch (order) {
		case '+':
			return SortSymbols.ASC;
		case '-':
			return SortSymbols.DESC;
		default:
			return SortSymbols.NONE;
	}
};

export const getNextSortOrder = (sort, sortMode = SortMode.ASC_DESC_NONE) => {
	if (sortMode === SortMode.ASC_DESC) {
		return sort === SortSymbols.ASC ? SortSymbols.DESC : SortSymbols.ASC;
	}

	switch (sort) {
		case SortSymbols.NONE:
			return SortSymbols.ASC;
		case SortSymbols.ASC:
			return SortSymbols.DESC;
		case SortSymbols.DESC:
			return SortSymbols.NONE;
		default:
			return SortSymbols.ASC;
	}
};
