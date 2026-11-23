export const DownloadType = {
	AudioRecordings: 'audio-recordings',
	VideoRecordings: 'video-recordings',
	ScreenRecordings: 'screen-recordings',
	Transcriptions: 'transcriptions',
} as const;

export type DownloadType = (typeof DownloadType)[keyof typeof DownloadType];
