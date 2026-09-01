import type { ExportFormat } from '../../../../enums';

/** Minimal shape of the (axios-style) HTTP response consumed by `downloadFile`. */
export interface DownloadFileResponse {
	data: BlobPart;
	headers?: Record<string, string | undefined>;
}

export interface DownloadFileOptions {
	response: DownloadFileResponse;
	fileFormat: ExportFormat;
	filename?: string;
	mimetype?: string;
}
