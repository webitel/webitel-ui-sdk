import { ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useDeleteConfirmationPopup = () => {
	const isVisible = ref(false);
	const deleteCount = ref(0);
	const deleteCallback = ref(() => {});

	function askDeleteConfirmation({ deleted, callback }) {
		if (Array.isArray(deleted)) deleteCount.value = deleted.length;
		else deleteCount.value = 1;
		isVisible.value = true;
		deleteCallback.value = callback;
	}

	function closeDelete() {
		isVisible.value = false;
	}

	return {
		isVisible,
		deleteCount,
		deleteCallback,

		askDeleteConfirmation,
		closeDelete,
	};
};
