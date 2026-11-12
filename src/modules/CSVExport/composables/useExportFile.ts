import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue';
import { useDownloadAction } from '../../../composables/useDownloadAction/useDownloadAction';
import { ExportFormat, FormatDateMode } from '../../../enums';
import type { DownloadFileResponse } from '../../../scripts/file';
import { downloadFile } from '../../../scripts/file';
import { formatDate } from '../../../utils';
import XLSExportClass from '../XLSExport';
import type { FetchMethod } from './useCSVExport';
import { useCSVExport } from './useCSVExport';

export type ExportOptions = {
	format: string;
	separator?: string;
};

export type ExportSettings = {
	format: string;
	separator: string;
};

export type ExportMethod = (options: ExportOptions) => Promise<{
	response: DownloadFileResponse;
}>;

interface UseExportFileParams {
	fetchMethod?: FetchMethod;
	exportMethod?: ExportMethod;
	filename: string;
	filters?: MaybeRefOrGetter<Record<string, unknown>>;
	fields?: MaybeRefOrGetter<string[]>;
	selectedIds?: MaybeRefOrGetter<(string | number)[]>;
}

const XLS_EXPORT_BATCH_SIZE = 5000;

export const useExportFile = ({
	fetchMethod,
	exportMethod,
	filename,
	filters = {},
	fields = [],
	selectedIds = [],
}: UseExportFileParams) => {
	const downloadProgress = ref(0);

	const { isLoading: isExporting, runDownload } = useDownloadAction();

	const selected = computed(() => toValue(selectedIds));

	const exportParams = computed(() => ({
		...toValue(filters),
		fields: toValue(fields),
		_columns: toValue(fields),
	}));

	const fetchWithProgress: FetchMethod = async (params) => {
		if (!fetchMethod) throw new Error('fetch method should be specified!');
		const response = await fetchMethod(params);
		downloadProgress.value += response.items.length;
		return response;
	};

	const { CSVExportInstance, initCSVExport, exportCSV } = useCSVExport({
		selected,
	});

	initCSVExport(fetchWithProgress, {
		filename,
	});

	const XLSExport = new XLSExportClass(fetchWithProgress, {
		filename,
	});

	const exporters: Record<string, (separator?: string) => Promise<unknown>> = {
		[ExportFormat.CSV]: (separator) =>
			exportCSV({
				...exportParams.value,
				delimiter: separator,
			}),
		[ExportFormat.XLSX]: () =>
			XLSExport.export({
				...exportParams.value,
				size: XLS_EXPORT_BATCH_SIZE,
				...(selected.value.length && {
					id: selected.value,
				}),
			}),
	};

	const getExportFilename = () => {
		const date = formatDate(Date.now(), FormatDateMode.DATE);
		const time = formatDate(Date.now(), FormatDateMode.TIME_SEC);
		return `${filename}-${date}-${time}`;
	};

	const setFilename = (exportFilename: string) => {
		if (CSVExportInstance.value) {
			CSVExportInstance.value.filename = exportFilename;
		}
		XLSExport.filename = exportFilename;
	};

	const exportFromServer = (method: ExportMethod, options: ExportOptions) =>
		runDownload(async () => {
			const { response } = await method(options);
			downloadFile({
				response,
				filename: getExportFilename(),
				fileFormat: options.format as ExportFormat,
			});
		});

	const exportOnClient = ({ format, separator }: ExportOptions) => {
		setFilename(getExportFilename());
		downloadProgress.value = 0;
		return runDownload(async () => exporters[format]?.(separator), {
			progress: {
				loaded: downloadProgress,
			},
		});
	};

	const exportFile = (options: ExportOptions) =>
		exportMethod
			? exportFromServer(exportMethod, options)
			: exportOnClient(options);

	return {
		isExporting,

		exportFile,
	};
};
