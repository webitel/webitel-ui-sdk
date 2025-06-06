import { ref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import { useTableStoreConfig } from '../types/tableStore.types';

export const tablePaginationStoreBody = () => {
  const page = ref(1);
  const size = ref(10);
  const next = ref(false);

  const updatePage = (newPage: number) => {
    page.value = newPage;
  };

  const updateSize = (newSize: number) => {
    size.value = newSize;
  };

  const $reset = () => {
    page.value = 1;
    size.value = 10;
    next.value = false;
  };

  const setupPersistence = () => {
    const { restore: restorePage } = usePersistedStorage({
      name: 'page',
      value: page,
      onRestore: async (restore, name) => {
        const value = await restore(name);
        const numValue = +value;
        if (numValue) page.value = numValue;
      },
    });

    const { restore: restoreSize } = usePersistedStorage({
      name: 'size',
      value: size,
      onRestore: async (restore, name) => {
        const value = await restore(name);
        const numValue = +value;
        if (numValue) size.value = numValue;
      },
    });

    return Promise.allSettled([restorePage(), restoreSize()]);
  };

  return {
    page,
    size,
    next,

    updatePage,
    updateSize,

    setupPersistence,
    $reset,
  };
};

export const createTablePaginationStore = <Entity>(
  namespace: string,
  config: useTableStoreConfig<Entity>,
) => {
  const id = `${namespace}/pagination`;
  return createDatalistStore({
    storeBody: tablePaginationStoreBody,
    namespace: id,
    config,
  });
};
