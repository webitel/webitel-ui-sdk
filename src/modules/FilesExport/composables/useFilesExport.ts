import JSZip from 'jszip';
import { ref } from 'vue';

import { _wtUiLog } from '../../../scripts/logger';
import type {
	ExportedItem,
	FilesExportResult,
	UseFilesExportOptions,
	UseFilesExportReturn,
} from '../types/types';
import { fetchFileBinary, handleMimeType, saveZip } from '../utils/utils';

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
	getFileBlob,
	fetch,
	filename = 'export',
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

	const getFile = async (item: ExportedItem) => {
		if (getFileURL) {
			return fetchFileBinary(getFileURL(item));
		}
		if (getFileBlob) {
			return getFileBlob(item);
		}
		throw new Error('getFileURL or getFileBlob is required');
	};

	const fillZip = async (zip: JSZip): Promise<FilesExportResult> => {
		let page = 1;
		let hasNext = true;
		let downloaded = 0;
		let skipped = 0;
		let lastError: unknown;
		do {
			const { items, next } = await fetch({
				page,
				size: 1000,
			});
			for (const item of items) {
				try {
					const file = await getFile(item);
					const itemFilename = handleMimeType(item);
					zip.file(itemFilename, file);
					downloaded++;
					updateDownloadStatus(downloadStatus.value.count + 1);
				} catch (err) {
					_wtUiLog.warn({
						entity: 'script',
						module: 'FilesExport',
					})(`An error occurred while downloading a file id=${item.id}`, err);
					if (!skipFilesWithError) {
						throw err;
					}
					skipped++;
					lastError = err;
				}
			}
			hasNext = next;
			page++;
		} while (hasNext);

		// [Claude] every file failed (e.g. offline) – fail the export instead of saving an empty zip
		if (skipped && !downloaded) {
			throw lastError;
		}
		return {
			downloaded,
			skipped,
		};
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
			const result = await fillZip(zip);
			const blob = await generateZip(zip);
			saveZip(blob, filename);
			return result;
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
