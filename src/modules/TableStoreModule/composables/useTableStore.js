import { computed } from 'vue';
import { useStore } from 'vuex';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

// eslint-disable-next-line import/prefer-default-export
export const useTableStore = (namespace) => {
  const store = useStore();

  const tableNamespace = `${namespace}/table`;

  const dataList = computed(() => getNamespacedState(store.state, tableNamespace).dataList);

  const isLoading = computed(() => getNamespacedState(store.state, tableNamespace).isLoading);

  const headers = computed(() => getNamespacedState(store.state, tableNamespace).headers);

  const isNext = computed(() => getNamespacedState(store.state, tableNamespace).isNextPage);

  const error = computed(() => getNamespacedState(store.state, tableNamespace).errors);
  async function loadData(payload) {
    return store.dispatch(`${tableNamespace}/LOAD_DATA_LIST`, payload);
  }

  async function patchProperty(payload) {
    return store.dispatch(`${tableNamespace}/PATCH_ITEM_PROPERTY`, payload);
  }

  async function deleteData(payload) {
    return store.dispatch(`${tableNamespace}/DELETE`, payload);
  }

  async function sort(...params) {
    return store.dispatch(`${tableNamespace}/SORT`, {
      header: params[0],
      nextSortOrder: params[1],
    });
  }

  async function setHeaders(payload) {
    return store.dispatch(`${tableNamespace}/SET_HEADERS`, payload);
  }

  return {
    namespace: tableNamespace,

    dataList,
    isLoading,
    headers,
    isNext,
    error,

    loadData,
    patchProperty,
    deleteData,
    sort,
    setHeaders,
  };
};
