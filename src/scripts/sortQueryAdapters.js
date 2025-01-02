export const SortSymbols = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
  NONE: null,
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
