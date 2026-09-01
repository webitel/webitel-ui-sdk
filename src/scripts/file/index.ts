/**
 * separate re-export barrel file for file-related scripts coz they have jszip opt dep
 */

export { downloadFile } from './downloadFile/downloadFile';
export type {
	DownloadFileOptions,
	DownloadFileResponse,
} from './downloadFile/types/downloadFile.types';
export { downloadFilesAsZip } from './storageFile/downloadFilesAsZip';
export { downloadStorageFile } from './storageFile/downloadStorageFile';
export { getFileTypeIcon } from './storageFile/getFileTypeIcon';
export { getStorageFileUrl } from './storageFile/getStorageFileUrl';
export { openStorageFileInNewTab } from './storageFile/openStorageFileInNewTab';
