import { saveAs } from 'file-saver-es';

import type { CallTranscriptRow } from '../types/callTranscript';

interface DownloadTranscriptTxtParams {
	rows: CallTranscriptRow[];
	transcriptId?: string;
	callCreatedAt?: string;
}

export const downloadTranscriptTxt = ({
	rows,
	transcriptId,
	callCreatedAt,
}: DownloadTranscriptTxtParams) => {
	const text = rows
		.map(
			({ phrase, channel, time }) =>
				`${time} [${channel != null ? channel : 'author'}] ${phrase || ''}`,
		)
		.join('\n');
	const blob = new Blob(
		[
			text,
		],
		{
			type: 'text/plain;charset=utf-8',
		},
	);
	return saveAs(blob, `Transcript ${transcriptId} ${callCreatedAt}`);
};
