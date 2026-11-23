import { type MaybeRefOrGetter, toValue } from 'vue';
import { useDownloadAction } from '../../../composables/useDownloadAction/useDownloadAction';
import type { ExportFormat } from '../../../enums';
import type { DownloadFileResponse } from '../../../scripts/file';
import { downloadFile } from '../../../scripts/file';
import { getExportFilename } from '../scripts/getExportFilename';
import type { ExportOptions } from './useExportFile';

export type ExportMethod = (
	params: Record<string, unknown> & ExportOptions,
) => Promise<{
	response: DownloadFileResponse;
}>;

interface UseServerExportFileParams {
	exportMethod: ExportMethod;
	filename: string;
	params?: MaybeRefOrGetter<Record<string, unknown>>;
}

export const useServerExportFile = ({
	exportMethod,
	filename,
	params = {},
}: UseServerExportFileParams) => {
	const { isLoading: isExporting, runDownload } = useDownloadAction();

	const exportFile = (options: ExportOptions) =>
		runDownload(async () => {
			const { response } = await exportMethod({
				...toValue(params),
				...options,
			});
			downloadFile({
				response,
				filename: getExportFilename(filename),
				fileFormat: options.format as ExportFormat,
			});
		});

	return {
		isExporting,

		exportFile,
	};
};
