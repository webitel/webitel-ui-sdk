import baseFilterMixin from './baseFilterMixin/baseFilterMixin.js';

const SortSymbols = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
  NONE: null,
});

const getNextSortOrder = (sort) => {
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

const sortToQueryAdapter = (order) => {
  switch (order) {
    case SortSymbols.ASC:
      return '+';
    case SortSymbols.DESC:
      return '-';
    default:
      return '';
  }
};

const queryToSortAdapter = (order) => {
  switch (order) {
    case '+':
      return SortSymbols.ASC;
    case '-':
      return SortSymbols.DESC;
    default:
      return SortSymbols.NONE;
  }
};

const encodeSortQuery = ({ column, order }) =>
  `${sortToQueryAdapter(order)}${column.field}`;

const decodeSortQuery = ({ value }) => {
  const sort = queryToSortAdapter(value.slice(0, 1));
  const sortedColumn = sort ? value.slice(1) : value;
  return {
    [sortedColumn]: sort,
  };
};

export default {
  mixins: [baseFilterMixin],
  data: () => ({
    filterQuery: 'sort',
  }),
  methods: {
    sort(column) {
      const order = getNextSortOrder(column.sort);
      return this.setValue({ column, order });
    },

    setValue({ column, order }) {
      const headers = this.headers.map((col) => {
        const sortFieldValue = col?.sort;
        return {
          ...col,
          sort: col === column ? order : sortFieldValue,
        };
      });
      const value = encodeSortQuery({ column, order });
      this.setHeaders(headers);
      return this.setValueToQuery({
        value,
        filterQuery: this.filterQuery,
      });
    },

    restoreValue(value) {
      const sortedColumns = decodeSortQuery({ value });
      const headers = this.headers.map((header) => ({
        ...header,
        sort: sortedColumns[header.field] || null,
      }));
      this.setHeaders(headers);
    },
  },
};
