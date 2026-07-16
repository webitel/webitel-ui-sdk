import type { DownloadFileOptions } from './types/downloadFile.types';
declare const downloadFile: ({
	response,
	fileFormat,
	filename,
	mimetype,
}: DownloadFileOptions) => void;
export default downloadFile;
