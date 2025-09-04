import { usePersistedStorage } from '../persist/usePersistedStorage';
import { PersistedStorageType } from '../persist/PersistedStorage.types';
import { FiltersManagerConfig } from './classes/FiltersManager';
import { useTableStoreConfig } from '../types/tableStore.types';
import { createDatalistStore } from '../_shared/createDatalistStore';
import { tableFiltersStoreBody } from './createTableFiltersStore';
import { ref } from 'vue';

export const searchFiltersStoreBody = () => {

  const search = ref('');

  const updateSearch = (newSearch: string) => {
    console.log(newSearch);
    search.value = newSearch;
  };

  const setupPersistence = () => {
    const { restore: restoreSearch } = usePersistedStorage({
      name: 'search',
      value: search,
      storages: [PersistedStorageType.Route],
      onStore: async (save, { name }) => {
        return save({ name, value: 'search' });
      },
      onRestore: async (restore, name) => {
        const value = await restore(name);
        if (value) search.value = value as string;
      },
    });

    return restoreSearch();
  }
  return {
    setupPersistence,
    search,
    updateSearch,
  }
}

export const createSearchFiltersStore = <Entity>(
  namespace: string,
  config: useTableStoreConfig<Entity>,
) => {
  const id = `${namespace}/search`;
  return createDatalistStore({
    storeBody: searchFiltersStoreBody,
    config,
    namespace: id,
  });
};
