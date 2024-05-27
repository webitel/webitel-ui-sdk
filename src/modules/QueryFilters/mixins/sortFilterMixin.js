import {
  queryToSortAdapter,
  SortSymbols,
  sortToQueryAdapter,
} from '../../../scripts/sortQueryAdapters';
import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

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

const encodeSortQuery = ({
                           column,
                           order,
                         }) => (`${sortToQueryAdapter(order)}${column.field}`);

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
      this.setValue({ column, order });
    },

    setValue({ column, order }) {
      const headers = this.headers.map((header) => {
        const sortFieldValue = header?.sort && null;
        return {
          ...header,
          sort: header === column ? order : sortFieldValue,
        };
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
      const headers = this.headers.map((header) => ({
        ...header,
        sort: sortedColumns[header.field] || null,
      }));
      this.setHeaders(headers);
    },
  },
};
