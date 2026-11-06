import type { DownloadType } from '../enums/DownloadType';
import type {
	ExportedFileSource,
	FetchList,
	UseFilesExportOptions,
} from './filesExport';
import type { RecordingsListItem } from './recordingsExport';
import type {
	ExportedTranscriptItem,
	TranscriptsListItem,
} from './transcriptsExport';

export type DownloadListItem = RecordingsListItem &
	TranscriptsListItem &
	Pick<ExportedTranscriptItem, 'from' | 'to'>;

export type DownloadFetch = (params: {
	page: number;
	size: number;
	type: DownloadType;
}) => ReturnType<FetchList<DownloadListItem>>;

export type DownloadOptionConfig = {
	locale: string;
	hasMaterial: (item: DownloadListItem) => boolean;
	getSource: (
		fetchList: FetchList<DownloadListItem>,
	) => Pick<UseFilesExportOptions, 'fetch'> & ExportedFileSource;
};

export type DownloadActionProps = {
	filename: string;
	types?: DownloadType[];
	selected?: DownloadListItem[];
	disabled?: boolean;
	onFetch?: DownloadFetch;
};

export type CreateFetchListParams = Pick<
	DownloadActionProps,
	'selected' | 'onFetch'
> & {
	type: DownloadType;
};
