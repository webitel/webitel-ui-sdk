import { Ref } from 'vue';

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
	skipFilesWithError?: boolean;
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
	exportFiles: () => Promise<void>;
} & FilesExportProgressStatus;
