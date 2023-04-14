import { ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useDeleteConfirmationPopup = () => {
  const isVisible = ref(false);
  const deleteCount = ref(null);
  const deleteCallback = ref(null);

  function askDeleteConfirmation({ deleted, callback }) {
    if (Array.isArray(deleted)) deleteCount.value = deleted.length;
    else deleteCount.value = 1;
    isVisible.value = true;
    deleteCallback.value = callback;
  }

  function confirmDelete() {
    return deleteCallback.value();
  }

  function closeDelete() {
    isVisible.value = false;
  }

  return {
    isVisible,
    deleteCount,
    deleteCallback,

    askDeleteConfirmation,
    confirmDelete,
    closeDelete,
  };
};
