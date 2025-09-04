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
}) => {
  const filtersManager = reactive(
    createFiltersManager(config?.filtersManagerConfig),
  );

  /* for watchers in filter components */
  const isRestoring = ref(false);

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



    return Promise.allSettled([restoreFilters()]);
  };

  return {
    filtersManager,
    isRestoring,

    filtersList,

    hasFilter,
    addFilter,
    updateFilter,
    deleteFilter,

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
    storeBody: tableFiltersStoreBody,
    config,
    namespace: id,
  });
};
