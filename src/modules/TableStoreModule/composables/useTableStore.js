import { computed } from 'vue';
import { useStore } from 'vuex';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

// eslint-disable-next-line import/prefer-default-export
export const useTableStore = (namespace) => {
  const store = useStore();

  const tableNamespace = `${namespace}/table`;

  const dataList = computed(() => getNamespacedState(store.state, tableNamespace).dataList);

  const selected = computed(() => getNamespacedState(store.state, tableNamespace).selected);

  const isLoading = computed(() => getNamespacedState(store.state, tableNamespace).isLoading);

  const headers = computed(() => getNamespacedState(store.state, tableNamespace).headers);

  const isNext = computed(() => getNamespacedState(store.state, tableNamespace).isNextPage);

  const error = computed(() => getNamespacedState(store.state, tableNamespace).errors);

  function loadData(payload) {
    return store.dispatch(`${tableNamespace}/LOAD_DATA_LIST`, payload);
  }

  function patchProperty(payload) {
    return store.dispatch(`${tableNamespace}/PATCH_ITEM_PROPERTY`, payload);
  }

  function deleteData(payload) {
    return store.dispatch(`${tableNamespace}/DELETE`, payload);
  }

  function sort([header, nextSortOrder]) {
    return store.dispatch(`${tableNamespace}/SORT`, {
      header,
      nextSortOrder,
    });
  }

  function setSelected(payload) {
    return store.dispatch(`${tableNamespace}/SET_SELECTED`, payload);
  }

  return {
    namespace: tableNamespace,

    dataList,
    selected,
    isLoading,
    headers,
    isNext,
    error,

    loadData,
    patchProperty,
    deleteData,
    sort,
    setSelected,
  };
};
