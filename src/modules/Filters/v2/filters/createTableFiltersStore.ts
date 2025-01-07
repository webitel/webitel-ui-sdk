import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import { usePersistedStorage } from '../persist/usePersistedStorage.ts';
import { createFiltersManager } from './classes/FiltersManager.class.ts';

export const createTableFiltersStore = (namespace: string) => {
  const id = `${namespace}/filters`;

  return defineStore(id, () => {
    const filtersManager = reactive(
      createFiltersManager({ storagePrefix: namespace }),
    );

    // wrapping filtersManager method to extend their functionality, if it will be necessary in future
    const addFilter = filtersManager.add.bind(filtersManager);
    const updateFilter = filtersManager.update.bind(filtersManager);
    const deleteFilter = filtersManager.delete.bind(filtersManager);

    const filtersList = computed(() => filtersManager.filters.values());

    const setupPersistence  = () => {
      const { restore: restoreFilters } = usePersistedStorage({
        name: 'filters',
        value: filtersManager,
        storagePath: `${namespace}/filters`,
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
