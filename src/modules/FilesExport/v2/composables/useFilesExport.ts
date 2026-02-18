import JSZip from 'jszip';
import { ref } from 'vue';

import { saveZip, fetchFileBinary, handleMimeType } from '../utils/utils';
import { _wtUiLog } from '../../../../scripts/logger';
import { UseFilesExportOptions, UseFilesExportReturn } from '../types/types';

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

export const useFilesExport = ({
	getFileURL,
	fetch,
	filename,
	skipFilesWithError,
}: UseFilesExportOptions): UseFilesExportReturn => {
	const {
		isLoading,
		downloadStatus,
		zippingStatus,
		start: startProgress,
		updateDownloadStatus,
		updateZippingStatus,
		reset: resetProgress,
	} = useFilesExportProgress();

	const fillZip = async (zip: JSZip) => {
		let page = 1;
		let hasNext = true;
		do {
			const { items, next } = await fetch({
				page,
				size: 1000,
			});
			for (const item of items) {
				try {
					const binary = await fetchFileBinary(getFileURL(item));
					const itemFilename = handleMimeType(item);
					zip.file(itemFilename, binary);
					updateDownloadStatus(downloadStatus.value.count + 1);
				} catch (err) {
					_wtUiLog.warn({
						entity: 'script',
						module: 'FilesExport',
					})(`An error occurred while downloading a file id=${item.id}`, err);
					if (!skipFilesWithError) {
						throw err;
					}
				}
			}
			hasNext = next;
			page++;
		} while (hasNext);
	};

	const generateZip = async (zip: JSZip): Promise<Blob> => {
		return zip.generateAsync(
			{
				type: 'blob',
			},
			(progress) => {
				updateZippingStatus(progress.percent);
			},
		);
	};

	const exportFiles = async () => {
		startProgress();
		try {
			const zip = new JSZip();
			await fillZip(zip);
			const blob = await generateZip(zip);
			saveZip(blob, filename);
		} finally {
			resetProgress();
		}
	};

	return {
		isLoading,
		downloadStatus,
		zippingStatus,

		exportFiles,
	};
};
