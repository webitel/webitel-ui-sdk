import type { MediaUrlAuth } from '@webitel/api-services/api';
import type {
	EngineCallFile,
	EngineCallFileType,
} from '@webitel/api-services/gen/models';

import type { FetchList, UseFilesExportOptions } from './filesExport';

export type RecordingsListItem = {
	files?: Partial<Record<EngineCallFileType, EngineCallFile[]>>;
};

export type UseRecordingsExportOptions<T extends RecordingsListItem> = {
	fetchList: FetchList<T>;
	fileType: EngineCallFileType;
	getMediaUrlAuth: () => MediaUrlAuth;
	size?: number;
};

export type UseRecordingsExportReturn = Required<
	Pick<UseFilesExportOptions, 'fetch' | 'getFileURL'>
>;
