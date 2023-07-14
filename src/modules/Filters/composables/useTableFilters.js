import { useStore } from 'vuex';

export const useTableFilters = (namespace) => {
  const store = useStore();

  const filtersNamespace = `${namespace}/filters`;

  function restoreFilters(payload) {
    return store.dispatch(`${filtersNamespace}/RESTORE_FILTERS`, payload);
  }

  restoreFilters();

  return {
    filtersNamespace,
  };
};
