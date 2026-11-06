import { EngineCallFileType } from '@webitel/api-services/gen/models';

import { useRecordingsExport } from '../composables/useRecordingsExport';
import { useTranscriptsExport } from '../composables/useTranscriptsExport';
import { DownloadType } from '../enums/DownloadType';
import type { DownloadOptionConfig } from '../types/downloadAction';

const createRecordingsOption = (
	locale: string,
	fileType: EngineCallFileType,
): DownloadOptionConfig => ({
	locale,
	hasMaterial: (item) => !!item.files?.[fileType]?.length,
	getSource: (fetchList) =>
		useRecordingsExport({
			fetchList,
			fileType,
		}),
});

const createTranscriptsOption = (locale: string): DownloadOptionConfig => ({
	locale,
	hasMaterial: (item) => !!item.transcripts?.length,
	getSource: (fetchList) =>
		useTranscriptsExport({
			fetchList,
			getParticipants: ({ from, to }) => ({
				from,
				to,
			}),
		}),
});

export const downloadOptions: Record<DownloadType, DownloadOptionConfig> = {
	[DownloadType.AudioRecordings]: createRecordingsOption(
		'webitelUI.downloadAction.audioRecordings',
		EngineCallFileType.FileTypeAudio,
	),
	[DownloadType.VideoRecordings]: createRecordingsOption(
		'webitelUI.downloadAction.videoRecordings',
		EngineCallFileType.FileTypeVideo,
	),
	[DownloadType.ScreenRecordings]: createRecordingsOption(
		'webitelUI.downloadAction.screenRecordings',
		EngineCallFileType.FileTypeScreensharing,
	),
	[DownloadType.Transcriptions]: createTranscriptsOption(
		'webitelUI.downloadAction.transcriptions',
	),
};

export const defaultDownloadTypes = Object.values(DownloadType);
