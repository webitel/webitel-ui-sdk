import { getCallMediaUrl } from '@webitel/api-services/api';

import type {
	RecordingsListItem,
	UseRecordingsExportOptions,
	UseRecordingsExportReturn,
} from '../types/recordingsExport';

export const useRecordingsExport = <T extends RecordingsListItem>({
	fetchList,
	fileType,
	size = 200,
}: UseRecordingsExportOptions<T>): UseRecordingsExportReturn => ({
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
			auth: {
				baseUrl: import.meta.env.VITE_API_URL,
				accessToken: localStorage.getItem('access-token') || '',
			},
			download: true,
		}),
});
