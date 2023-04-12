import { computed } from 'vue';
import { useStore } from 'vuex';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

// eslint-disable-next-line import/prefer-default-export
export const useCardStore = (namespace) => {
  const store = useStore();

  const cardNamespace = `${namespace}/card`;

  const id = computed(() => getNamespacedState(store.state, cardNamespace).itemId);
  const itemInstance = computed(() => getNamespacedState(store.state, cardNamespace).itemInstance);

  function loadItem(payload) {
    return store.dispatch(`${cardNamespace}/LOAD_ITEM`, payload);
  }

  function addItem(payload) {
    return store.dispatch(`${cardNamespace}/ADD_ITEM`, payload);
  }

  function updateItem(payload) {
    return store.dispatch(`${cardNamespace}/UPDATE_ITEM`, payload);
  }

  function setId(payload) {
    return store.dispatch(`${cardNamespace}/SET_ITEM_ID`, payload);
  }

  function resetState() {
    return store.dispatch(`${cardNamespace}/RESET_ITEM_STATE`);
  }

  return {
    id,
    itemInstance,

    loadItem,
    addItem,
    updateItem,
    setId,
    resetState,
  };
};
