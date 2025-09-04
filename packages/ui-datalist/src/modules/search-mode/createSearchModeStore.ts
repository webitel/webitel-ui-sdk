import { usePersistedStorage } from '../persist/usePersistedStorage';
import { PersistedStorageType } from '../persist/PersistedStorage.types';
import { useTableStoreConfig } from '../types/tableStore.types';
import { createDatalistStore } from '../_shared/createDatalistStore';
import { ref } from 'vue';

export const searchModeStoreBody = (namespace) => {

  const searchMode = ref('');

  const updateSearchMode = (newSearch: string) => {
    searchMode.value = newSearch;
  };

  const setupPersistence = () => {
    const { restore: restoreSearchMode } = usePersistedStorage({
      name: 'searchMode',
      value: searchMode,
      storages: [PersistedStorageType.LocalStorage],
      storagePath: namespace,

      onStore: async (save, { name }) => {
        return save({ name, value: searchMode.value });
      },
      onRestore: async (restore, name) => {
        const value = await restore(name);
        if (value) searchMode.value = value as string;
      },
    });

    return restoreSearchMode();
  }
  return {
    setupPersistence,
    searchMode,
    updateSearchMode,
  }
}

export const createSearchModeStore = <Entity>(
  namespace: string,
  config: useTableStoreConfig<Entity>,
) => {
 const id = `${namespace}/searchMode`;
  return createDatalistStore({
    storeBody: () => searchModeStoreBody(namespace),
    config,
    namespace: id,
  });
};

