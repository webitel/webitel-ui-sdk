import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

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

    return {
      filtersManager,

      filtersList,

      addFilter,
      updateFilter,
      deleteFilter,
    };
  });
};
