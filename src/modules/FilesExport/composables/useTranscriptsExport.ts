import { CallTranscriptAPI } from '@webitel/api-services/api';

import type {
	ExportedTranscriptItem,
	TranscriptsListItem,
	UseTranscriptsExportOptions,
	UseTranscriptsExportReturn,
} from '../types/transcriptsExport';

export const useTranscriptsExport = <T extends TranscriptsListItem>({
	fetchList,
	getParticipants,
	size = 200,
}: UseTranscriptsExportOptions<T>): UseTranscriptsExportReturn => ({
	fetch: async ({ page }) => {
		const { items, next } = await fetchList({
			page,
			size,
		});

		const exportedItems: ExportedTranscriptItem[] = [];
		for (const item of items) {
			for (const { id } of item.transcripts || []) {
				if (!id) continue;
				exportedItems.push({
					name: `${id}.txt`,
					phrases: await CallTranscriptAPI.get({
						id: String(id),
					}),
					...getParticipants(item),
				});
			}
		}

		return {
			items: exportedItems,
			next,
		};
	},
	getFileBlob: async (item) => generateTxt(item as ExportedTranscriptItem),
});

function generateTxt({ phrases, from, to }: ExportedTranscriptItem) {
	const text = (phrases || [])
		.map(
			({ phrase, channel, startSec, endSec }) =>
				`${startSec}-${endSec} [${
					channel
						? to?.name || to?.number || to?.destination || channel
						: from?.name || from?.number || from?.destination || channel
				}] ${phrase || ''}`,
		)
		.join('\n');
	return new Blob(
		[
			text,
		],
		{
			type: 'text/plain;charset=utf-8',
		},
	);
}
