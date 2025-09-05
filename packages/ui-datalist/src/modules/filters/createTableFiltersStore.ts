import { computed, reactive, ref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import { PersistedStorageType } from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import { useTableStoreConfig } from '../types/tableStore.types';
import {
  createFiltersManager,
  FiltersManagerConfig,
} from './classes/FiltersManager';

export const tableFiltersStoreBody = (config?: {
  filtersManagerConfig: FiltersManagerConfig;
}, namespace) => {
  const filtersManager = reactive(
    createFiltersManager(config?.filtersManagerConfig),
  );

  /* for watchers in filter components */
  const isRestoring = ref(false);

  const searchMode = ref('');

  const updateSearchMode = (newSearch: string) => {
    searchMode.value = newSearch;
  };

  /*
   wrapping filtersManager methods to extend their functionality
   if it will be needed in future
   */
  const hasFilter = filtersManager.hasFilter.bind(filtersManager);
  const addFilter = filtersManager.addFilter.bind(filtersManager);
  const updateFilter = filtersManager.updateFilter.bind(filtersManager);
  const deleteFilter = filtersManager.deleteFilter.bind(filtersManager);

  const filtersList = computed(() => filtersManager.getFiltersList());

  const setupPersistence = () => {
    const { restore: restoreFilters } = usePersistedStorage({
      name: 'filters',

      value: computed(
        () => filtersManager,
      ) /* computed is used to provide value as ref(), not reactive() – as per usePersistedStorage interface */,

      storages: [PersistedStorageType.Route],

      /* use custom .toString() logic, provided by FiltersManager */
      onStore: async (save, { name }) => {
        const snapshotStr = filtersManager.toString();
        return save({ name, value: snapshotStr });
      },

      /* use custom .fromString() logic, provided by FiltersManager */
      onRestore: async (restore, name) => {
        isRestoring.value = true;
        const snapshotStr = await restore(name);
        /*
        snapshot as string because we know that filtersManager.toString() returns string,
         not string[]
         */
        if (snapshotStr) filtersManager.fromString(snapshotStr as string);

        isRestoring.value = false;
      },
    });

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

    return Promise.all([restoreFilters(), restoreSearchMode()]);
  };

  return {
    filtersManager,
    isRestoring,
    searchMode,

    filtersList,

    hasFilter,
    addFilter,
    updateFilter,
    deleteFilter,

    updateSearchMode,

    setupPersistence,
  };
};

export const createTableFiltersStore = <Entity>(
  namespace: string,
  config: useTableStoreConfig<Entity> & {
    filtersManagerConfig?: FiltersManagerConfig;
  },
) => {
  const id = `${namespace}/filters`;
  return createDatalistStore({
    storeBody: () => tableFiltersStoreBody(config, namespace),
    config,
    namespace: id,
  });
};
