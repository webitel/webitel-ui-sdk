import type {
	EngineCallFile,
	EngineCallFileType,
} from '@webitel/api-services/gen/models';

import type { FetchList, UseFilesExportOptions } from './filesExport';

export type RecordingsListItem = {
	files?: Partial<Record<EngineCallFileType, EngineCallFile[]>>;
};

export type RecordingsExportOptions<T extends RecordingsListItem> = {
	fetchList: FetchList<T>;
	fileType: EngineCallFileType;
	size?: number;
};

export type RecordingsExportReturn = Required<
	Pick<UseFilesExportOptions, 'fetch' | 'getFileURL'>
>;
