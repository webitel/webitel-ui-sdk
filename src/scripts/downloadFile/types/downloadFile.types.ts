import type { FileFormat } from './fileFormat.types';

export interface DownloadFileOptions {
	response: never;
	fileFormat: FileFormat;
	filename?: string;
	mimetype?: string;
}
