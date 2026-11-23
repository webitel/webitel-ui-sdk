import JSZip from 'jszip';

import { _wtUiLog } from '../../../scripts/logger';
import type {
	UseFilesExportOptions,
	UseFilesExportReturn,
} from '../types/filesExport';
import { getFile, handleMimeType, saveZip } from '../utils/utils';
import { useFilesExportProgress } from './useFilesExportProgress';

export const useFilesExport = (
	defaults?: UseFilesExportOptions,
): UseFilesExportReturn => {
	const {
		isLoading,
		downloadStatus,
		zippingStatus,
		start: startProgress,
		updateDownloadStatus,
		updateZippingStatus,
		reset: resetProgress,
	} = useFilesExportProgress();

	const fillZip = async (zip: JSZip, options: UseFilesExportOptions) => {
		const { fetch, skipFilesWithError } = options;
		let page = 1;
		let hasNext = true;
		do {
			const { items, next } = await fetch({
				page,
				size: 1000,
			});
			for (const item of items) {
				try {
					const file = await getFile(item, options);
					const itemFilename = handleMimeType(item);
					zip.file(itemFilename, file);
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

	const generateZip = (zip: JSZip): Promise<Blob> =>
		zip.generateAsync(
			{
				type: 'blob',
			},
			(progress) => {
				updateZippingStatus(progress.percent);
			},
		);

	const exportFiles = async (options = defaults) => {
		if (!options) {
			throw new Error('export options are required');
		}
		startProgress();
		try {
			const zip = new JSZip();
			await fillZip(zip, options);
			const blob = await generateZip(zip);
			saveZip(blob, options.filename);
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
