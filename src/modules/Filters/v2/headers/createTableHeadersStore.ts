import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { WtTableHeader } from '../../../../components/wt-table/types/WtTable';
import { sortToQueryAdapter } from '../../../../scripts';
import { SortSymbols } from '../../../../scripts/sortQueryAdapters';
import { PersistedStorageType } from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage.ts';

export const createTableHeadersStore = (
  namespace: string,
  { headers: rawHeaders },
) => {
  const id = `${namespace}/headers`;

  return defineStore(id, () => {
    const headers = ref(rawHeaders);

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
      updateShownHeaders(newHeaders);
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

      const newHeaders = changeHeadersSort({
        headers: headers.value,
        sortedHeader: column,
        order,
      });

      headers.value = newHeaders;
    };
    const setupPersistence = async () => {
      const { restore: restoreFields } = usePersistedStorage({
        name: 'fields',
        value: fields,
        storages: [
          PersistedStorageType.LocalStorage,
          PersistedStorageType.Route,
        ],
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

      return Promise.allSettled([restoreFields(), restoreSort()]);
    };

    return {
      headers,
      shownHeaders,
      fields,
      sort,

      updateShownHeaders,
      updateSort,

      setupPersistence,
      $reset,
    };
  });
};
