import type { Ref } from 'vue';

export type ExportedItem = {
	name: string; // file name inside zip
	mimeType?: string;
} & Record<string, unknown>;

export type UseFilesExportOptions = {
	getFileURL?: (item: ExportedItem) => string;
	getFileBlob?: (item: ExportedItem) => Promise<Blob>;
	fetch: ({ page, size }: { page: number; size?: number }) => Promise<{
		items: ExportedItem[];
		next: boolean;
	}>;
	filename?: string;
	/** [Claude] failed files are left out of the zip; the export still fails if none could be downloaded */
	skipFilesWithError?: boolean;
};

export type FilesExportResult = {
	downloaded: number;
	/** [Claude] failed files left out of the zip – non-zero only with `skipFilesWithError` */
	skipped: number;
};

export type FilesExportProgressStatus = {
	isLoading: Ref<boolean>;
	downloadStatus: Ref<{
		count: number;
	}>;
	zippingStatus: Ref<{
		percent: number;
	}>;
};

export type UseFilesExportReturn = {
	exportFiles: () => Promise<FilesExportResult>;
} & FilesExportProgressStatus;
