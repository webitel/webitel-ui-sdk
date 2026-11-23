import { ref } from 'vue';

export const useFilesExportProgress = () => {
	const isLoading = ref(false);
	const downloadStatus = ref<{
		count: number;
	}>({
		count: 0,
	});
	const zippingStatus = ref<{
		percent: number;
	}>({
		percent: 0,
	});

	const updateDownloadStatus = (count: number) => {
		downloadStatus.value = {
			count,
		};
	};
	const updateZippingStatus = (percent: number) => {
		zippingStatus.value = {
			percent,
		};
	};

	const start = () => {
		isLoading.value = true;
	};

	const reset = () => {
		isLoading.value = false;
		downloadStatus.value = {
			count: 0,
		};
		zippingStatus.value = {
			percent: 0,
		};
	};

	return {
		isLoading,
		downloadStatus,
		zippingStatus,

		start,
		updateDownloadStatus,
		updateZippingStatus,
		reset,
	};
};
