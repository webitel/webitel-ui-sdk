import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import { PersistedStorageType } from '../persist/PersistedStorage.types.ts';
import { usePersistedStorage } from '../persist/usePersistedStorage.ts';
import { createFiltersManager } from './classes/FiltersManager.class.ts';
import { FiltersManagerConfig } from './types/FiltersManager.types.ts';

export const createTableFiltersStore = (namespace: string, config?: { filtersManagerConfig: FiltersManagerConfig }) => {
  const id = `${namespace}/filters`;

  return defineStore(id, () => {
    const filtersManager = reactive(
      createFiltersManager(config?.filtersManagerConfig),
    );

    // wrapping filtersManager method to extend their functionality, if it will be necessary in future
    const addFilter = filtersManager.add.bind(filtersManager);
    const updateFilter = filtersManager.update.bind(filtersManager);
    const deleteFilter = filtersManager.delete.bind(filtersManager);

    const filtersList = computed(() => filtersManager.filters.values());

    const setupPersistence  = () => {
      const { restore: restoreFilters } = usePersistedStorage({
        name: 'filters',
        value: computed(() => filtersManager),
        storages: [PersistedStorageType.Route],
        onStore: async (save, { name }) => {
          const snapshotStr = filtersManager.toString();
          return save({ name, value: snapshotStr });
        },
        onRestore: async (restore, name) => {
          const snapshotStr = await restore(name);
          /*
          snapshot as string because we know that filtersManager.toString() returns string,
           not string[]
           */
          if (snapshotStr) filtersManager.fromString(snapshotStr as string);
        },
      });

      return restoreFilters();
    };

    return {
      filtersManager,

      filtersList,

      addFilter,
      updateFilter,
      deleteFilter,

      setupPersistence,
    };
  });
};
