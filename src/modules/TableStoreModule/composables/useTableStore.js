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

  const isNext = computed(() => getNamespacedState(store.state, tableNamespace).isNext);

  const page = computed(() => getNamespacedState(store.state, tableNamespace).page);

  const size = computed(() => getNamespacedState(store.state, tableNamespace).size);

  const search = computed(() => getNamespacedState(store.state, tableNamespace).search);

  async function loadData() {
    return store.dispatch(`${tableNamespace}/LOAD_DATA_LIST`);
  }

  async function setSize(payload) {
    return store.dispatch(`${tableNamespace}/SET_SIZE`, payload);
  }

  async function nextPage() {
    return store.dispatch(`${tableNamespace}/SET_NEXT_PAGE`);
  }

  async function prevPage() {
    return store.dispatch(`${tableNamespace}/PREV_PAGE`);
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

  async function setSearch(payload) {
    return store.dispatch(`${tableNamespace}/SET_SEARCH`, payload);
  }

  return {
    dataList,
    isLoading,
    headers,
    isNext,
    page,
    size,
    search,

    loadData,
    setSize,
    nextPage,
    prevPage,
    patchProperty,
    deleteData,
    sort,
    setHeaders,
    setSearch,
  };
};
