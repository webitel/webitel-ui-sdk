import type { FileFormat } from './fileFormat.types';

/** Minimal shape of the (axios-style) HTTP response consumed by `downloadFile`. */
export interface DownloadFileResponse {
	data: BlobPart;
	headers?: Record<string, string | undefined>;
}

export interface DownloadFileOptions {
	response: DownloadFileResponse;
	fileFormat: FileFormat;
	filename?: string;
	mimetype?: string;
}
