import { ref } from 'vue';

export type AskDeleteConfirmationParams = {
	deleted?: unknown;
	callback: () => unknown;
};

export const useDeleteConfirmationPopup = () => {
	const isVisible = ref(false);
	const deleteCount = ref(0);
	const deleteCallback = ref<() => unknown>(() => {});

	function askDeleteConfirmation({
		deleted,
		callback,
	}: AskDeleteConfirmationParams) {
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
