import type { UseFilesExportOptions } from './filesExport';

export type DownloadOption = UseFilesExportOptions & {
	value: string;
	text: string;
	disabled?: boolean;
};
