import { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { sortToQueryAdapter } from '@webitel/ui-sdk/scripts';
import { SortSymbols } from '@webitel/ui-sdk/scripts/sortQueryAdapters';
import { computed, ref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import { PersistedStorageType } from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import { useTableStoreConfig } from '../types/tableStore.types';

interface TableHeadersStoreBodyParams {
  rawHeaders: WtTableHeader[];
  id: string;
}

export const tableHeadersStoreBody = ({
  rawHeaders,
  id,
}: TableHeadersStoreBodyParams) => {
  const headers = ref<WtTableHeader[]>(rawHeaders);

  const shownHeaders = computed(() => {
    return headers.value.filter((header) => header.show);
  });

  const fields = computed(() => {
    return shownHeaders.value.map((header) => header.field);
  });

  const sort = computed(() => {
    const encodeSortQuery = ({ column, order }) =>
      `${sortToQueryAdapter(order)}${column.field}`;

    const sortedCol = headers.value.find((header) => header.sort);

    return sortedCol
      ? encodeSortQuery({ column: sortedCol, order: sortedCol.sort })
      : null;
  });

  const widths = computed(() => {
    return headers.value.reduce((acc, header) => {
      if (header.width) {
        acc[header.field] = header.width;
      }
      return acc;
    }, {});
  });

  const $reset = () => {
    headers.value = rawHeaders;
  };

  const updateShownHeaders = (value) => {
    headers.value = value;
  };

  const updateFields = (fields: string[]) => {
    const newHeaders = headers.value.map((header: WtTableHeader) => {
      return {
        ...header,
        show: fields.includes(header.field),
      };
    });

    const customFields = fields.filter((field) => !headers.value.some((header) => header.field === field));
// debugger
    const customFieldHeaders = customFields.map((field) => ({
      show: true,
      field,
      shouldBeInitialized: true,
    }));
// debugger
    updateShownHeaders([...newHeaders, ...customFieldHeaders]);
  };

  const updateSort = (column) => {
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

    const order = getNextSortOrder(column.sort);

    headers.value = changeHeadersSort({
      headers: headers.value,
      sortedHeader: column,
      order,
    });
  };

  const setupPersistence = async () => {
    const { restore: restoreFields } = usePersistedStorage({
      name: 'fields',
      value: fields,
      storages: [PersistedStorageType.LocalStorage, PersistedStorageType.Route],
      storagePath: id,
      onStore: (save, { name }) => {
        const value = fields.value.join(',');
        return save({ name, value });
      },
      onRestore: async (restore, name) => {
        const value = (await restore(name)) as string;
        if (value) {
          return updateFields(value.split(','));
        }
      },
    });

    const { restore: restoreSort } = usePersistedStorage({
      name: 'sort',
      value: sort,
    });

    const { restore: restoreWidths } = usePersistedStorage({
      name: 'widths',
      value: widths,
      storages: [PersistedStorageType.LocalStorage],
      storagePath: id,
      onStore: (save, { name }) => {
        const value = JSON.stringify(widths.value);
        return save({ name, value });
      },
      onRestore: async (restore, name) => {
        const value = (await restore(name)) as string;
        if (value) {
          const parsedWidths = JSON.parse(value);
          headers.value = headers.value.map((header) => ({
            ...header,
            width: parsedWidths[header.field] || header.width,
          }));
        }
      },
    });

    return Promise.allSettled([restoreFields(), restoreSort(), restoreWidths()]);
  };

  const columnResize = ({columnName, columnWidth}) => {
    const column = headers.value.find((header) => header.field === columnName);

    if (column) {
      column.width = columnWidth;
    }
  };

  const columnReorder = (orderedFields: string[]) => {
    const reorderedHeaders = [];

    orderedFields.forEach(field => {
      const header = headers.value.find((header) => header.field === field);
      if (header) {
        reorderedHeaders.push(header);
      }
    });

    updateShownHeaders(reorderedHeaders);
  };

  return {
    headers,
    shownHeaders,
    fields,
    sort,
    widths,

    updateShownHeaders,
    updateSort,
    columnResize,
    columnReorder,

    setupPersistence,
    $reset,
  };
};

export const createTableHeadersStore = <Entity>(
  namespace: string,
  config: useTableStoreConfig<Entity>,
  { headers: rawHeaders },
) => {
  const id = `${namespace}/headers`;
  return createDatalistStore({
    storeBody: () => tableHeadersStoreBody({ rawHeaders, id }),
    namespace: id,
    config,
  });
};
