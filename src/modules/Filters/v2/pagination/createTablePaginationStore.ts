import { defineStore } from 'pinia';
import { ref } from 'vue';

import { usePersistedStorage } from '../persist/usePersistedStorage.ts';

export const createTablePaginationStore = (namespace: string) => {
  const id = `${namespace}/pagination`;

  return defineStore(id, () => {
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
          page.value = +value;
        },
      });

      const { restore: restoreSize } = usePersistedStorage({
        name: 'size',
        value: size,
        onRestore: async (restore, name) => {
          const value = await restore(name);
          size.value = +value;
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
  });
};
