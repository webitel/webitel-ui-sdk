import {
  SortSymbols,
  queryToSortAdapter,
  sortToQueryAdapter,
} from '../../../scripts/sortQueryAdapters.js';
import baseFilterMixin from './baseFilterMixin/baseFilterMixin.js';

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

const encodeSortQuery = ({ column, order }) =>
  `${sortToQueryAdapter(order)}${column.field}`;

const decodeSortQuery = ({ value }) => {
  const sort = queryToSortAdapter(value.slice(0, 1));
  const sortedColumn = sort ? value.slice(1) : value;
  return {
    [sortedColumn]: sort,
  };
};

const changeHeadersSort = ({ headers, sortedHeader, order }) => {
  return headers.map((header) => {
    if (header.sort === undefined) return header;

    // reset all headers by default
    let newSort = null;

    if (header.field === sortedHeader.field) {
      newSort = order;
    }

    return {
      ...header,
      sort: newSort,
    };
  });
};

export default {
  mixins: [baseFilterMixin],
  data: () => ({
    filterQuery: 'sort',
  }),
  methods: {
    sort(column) {
      const order = getNextSortOrder(column.sort);
      this.setValue({ column, order });
    },

    setValue({ column, order }) {
      const headers = changeHeadersSort({
        headers: this.headers,
        sortedHeader: column,
        order,
      });

      const value = encodeSortQuery({ column, order });
      this.setHeaders(headers);
      this.setValueToQuery({
        value,
        filterQuery: this.filterQuery,
      });
    },

    restoreValue(value) {
      const sortedColumns = decodeSortQuery({ value });
      const [field, order] = Object.entries(sortedColumns)[0];

      const headers = changeHeadersSort({
        headers: this.headers,
        sortedHeader: { field },
        order,
      });

      this.setHeaders(headers);
    },
  },
};
