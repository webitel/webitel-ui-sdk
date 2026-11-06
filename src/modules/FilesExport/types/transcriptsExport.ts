import type {
	EngineTranscriptLookup,
	StorageTranscriptPhrase,
} from '@webitel/api-services/gen/models';

import type {
	ExportedItem,
	FetchList,
	UseFilesExportOptions,
} from './filesExport';

type TranscriptParticipant = {
	name?: string;
	number?: string;
	destination?: string;
};

export type ExportedTranscriptItem = ExportedItem & {
	phrases: StorageTranscriptPhrase[];
	from?: TranscriptParticipant;
	to?: TranscriptParticipant;
};

export type TranscriptsListItem = {
	transcripts?: EngineTranscriptLookup[];
};

export type UseTranscriptsExportOptions<T extends TranscriptsListItem> = {
	fetchList: FetchList<T>;
	getParticipants: (item: T) => Pick<ExportedTranscriptItem, 'from' | 'to'>;
	size?: number;
};

export type UseTranscriptsExportReturn = Required<
	Pick<UseFilesExportOptions, 'fetch' | 'getFileBlob'>
>;
