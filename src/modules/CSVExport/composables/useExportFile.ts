import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue';

import { ExportFormat, FormatDateMode } from '../../../enums';
import type { DownloadFileResponse } from '../../../scripts/file';
import { downloadFile } from '../../../scripts/file';
import { formatDate } from '../../../utils';
import XLSExportClass from '../XLSExport';
import type { FetchMethod } from './useCSVExport';
import { useCSVExport } from './useCSVExport';

export type ExportOptions = {
	format: string;
	separator: string;
};

export type ExportMethodOptions = {
	format: string;
	separator?: string;
};

export type ExportMethod = (options: ExportMethodOptions) => Promise<{
	response: DownloadFileResponse;
}>;

interface UseExportFileParams {
	fetchMethod?: FetchMethod;
	exportMethod?: ExportMethod;
	filename: string;
	filters: MaybeRefOrGetter<Record<string, unknown>>;
	fields: MaybeRefOrGetter<string[]>;
	selectedIds: MaybeRefOrGetter<(string | number)[]>;
}

const EXPORT_COUNTER_DELAY = 1000;
const XLS_EXPORT_BATCH_SIZE = 5000;

export const useExportFile = ({
	fetchMethod,
	exportMethod,
	filename,
	filters,
	fields,
	selectedIds,
}: UseExportFileParams) => {
	const isCounterVisible = ref(false);
	const isExporting = ref(false);
	const downloadProgress = ref(0);

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

	const exporters: Record<string, (separator: string) => Promise<unknown>> = {
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

	const exportFromServer = async (
		method: ExportMethod,
		{ format, separator }: ExportOptions,
	) => {
		isExporting.value = true;
		try {
			const { response } = await method({
				format,
				...(format === ExportFormat.CSV && {
					separator,
				}),
			});
			downloadFile({
				response,
				filename: getExportFilename(),
				fileFormat: format as ExportFormat,
			});
		} finally {
			isExporting.value = false;
		}
	};

	const exportOnClient = async ({ format, separator }: ExportOptions) => {
		setFilename(getExportFilename());
		downloadProgress.value = 0;
		isCounterVisible.value = true;
		try {
			await exporters[format]?.(separator);
			await new Promise((resolve) => setTimeout(resolve, EXPORT_COUNTER_DELAY));
		} finally {
			isCounterVisible.value = false;
		}
	};

	const exportFile = (options: ExportOptions) =>
		exportMethod
			? exportFromServer(exportMethod, options)
			: exportOnClient(options);

	return {
		isCounterVisible,
		isExporting,
		downloadProgress,

		exportFile,
	};
};
