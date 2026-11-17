import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue';
import { useDownloadAction } from '../../../composables/useDownloadAction/useDownloadAction';
import { ExportFormat } from '../../../enums';
import { getExportFilename } from '../scripts/getExportFilename';
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

interface UseExportFileParams {
	fetchMethod: FetchMethod;
	filename: string;
	filters?: MaybeRefOrGetter<Record<string, unknown>>;
	fields?: MaybeRefOrGetter<string[]>;
	selectedIds?: MaybeRefOrGetter<(string | number)[]>;
}

const XLS_EXPORT_BATCH_SIZE = 5000;

export const useExportFile = ({
	fetchMethod,
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

	const setFilename = (exportFilename: string) => {
		if (CSVExportInstance.value) {
			CSVExportInstance.value.filename = exportFilename;
		}
		XLSExport.filename = exportFilename;
	};

	const exportFile = ({ format, separator }: ExportOptions) => {
		setFilename(getExportFilename(filename));
		downloadProgress.value = 0;
		return runDownload(async () => exporters[format]?.(separator), {
			progress: {
				loaded: downloadProgress,
			},
		});
	};

	return {
		isExporting,

		exportFile,
	};
};
