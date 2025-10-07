import { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { sortToQueryAdapter } from '@webitel/ui-sdk/scripts';
import { SortSymbols } from '@webitel/ui-sdk/scripts/sortQueryAdapters';
import { computed, ref, nextTick } from 'vue';

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
  const isReorderingColumn = ref(false);

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

  const columnWidths = computed(() => {
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

  const setHeaderOrder = (orderedFields: string[]) => {
    const arrayFieldOrder = new Map<string, number>();
    headers.value.forEach((header, idx) => arrayFieldOrder.set(header.field, idx));

    const newOrder = orderedFields.map(field => arrayFieldOrder.get(field));

    return newOrder.map(idx => headers.value[idx]);
  };

  const updateFields = (fields: string[]) => {
    const newHeaders = headers.value.map((header: WtTableHeader) => ({
      ...header,
      show: fields.includes(header.field),
    }));

    const customFields = fields.filter((field) => !headers.value.some((header) => header.field === field));
    const customFieldHeaders = customFields.map((field) => ({
      show: true,
      field,
      shouldBeInitialized: true,
    }));

    const mergedHeaders = [...newHeaders, ...customFieldHeaders];
    const orderedFields = fields.filter(field => mergedHeaders.some(header => header.field === field));
    const reordered = setHeaderOrder(orderedFields);

    updateShownHeaders(reordered);
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

    const { restore: restoreColumnWidths } = usePersistedStorage({
      name: 'columnWidths',
      value: columnWidths,
      storages: [PersistedStorageType.LocalStorage],
      storagePath: id,
      onStore: (save, { name }) => {
        const value = JSON.stringify(columnWidths.value);
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

    return Promise.allSettled([restoreFields(), restoreSort(), restoreColumnWidths()]);
  };

  const getHeaderByField = (field: string) => {
    return headers.value.find((header) => header.field === field);
  };

  const columnResize = ({columnName, columnWidth}) => {
    const column = getHeaderByField(columnName);

    if (column) {
      column.width = columnWidth;
    }
  };

  const columnReorder = (orderedFields: string[]) => {
    isReorderingColumn.value = true;

    const reordered = setHeaderOrder(orderedFields);
    updateShownHeaders(reordered);

    nextTick(() => {
      isReorderingColumn.value = false;
    });
  };

  return {
    headers,
    shownHeaders,
    fields,
    sort,
    columnWidths,
    isReorderingColumn,

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
