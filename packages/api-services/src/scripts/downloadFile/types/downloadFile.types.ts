import { FileFormat } from './fileFormat.types';

export interface DownloadFileOptions {
	response: any;
	fileFormat: FileFormat;
	filename?: string;
	mimetype?: string;
}
