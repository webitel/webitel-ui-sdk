import { getCallMediaUrl } from '@webitel/api-services/api';

import { getMediaUrlAuth } from '../../../scripts/file/storageFile/getMediaUrlAuth';
import type {
	RecordingsExportOptions,
	RecordingsExportReturn,
	RecordingsListItem,
} from '../types/recordingsExport';

export const createRecordingsExport = <T extends RecordingsListItem>({
	fetchList,
	fileType,
	size = 200,
}: RecordingsExportOptions<T>): RecordingsExportReturn => ({
	fetch: async ({ page }) => {
		const { items, next } = await fetchList({
			page,
			size,
		});

		return {
			items: items.flatMap(({ files }) =>
				(files?.[fileType] || []).map((file) => ({
					...file,
					name: file.name || String(file.id),
				})),
			),
			next,
		};
	},
	getFileURL: ({ id }) =>
		getCallMediaUrl(String(id), {
			auth: getMediaUrlAuth(),
			download: true,
		}),
});
