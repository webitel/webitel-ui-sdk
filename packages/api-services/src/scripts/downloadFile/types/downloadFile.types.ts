import type { FileFormat } from './fileFormat.types';

export interface DownloadFileOptions {
	response: any;
	fileFormat: FileFormat;
	filename?: string;
	/** `null` is the explicit "detect from response headers" default. */
	mimetype?: string | null;
}
