import { computed, type Ref, ref, watch } from 'vue';

import { type ImportRunner, useEventBus } from '../../../composables';
import {
	debounce,
	eventBus as defaultEventBus,
	isEmpty,
} from '../../../scripts';
import normalizeCSVData, {
	type CsvDataRow,
	type CsvMappingField,
} from '../scripts/normalizeCSVData';
import parseCSV from '../scripts/parseCSV';
import processFile from '../scripts/processFile';
import splitAndSaveData, {
	type SaveChunkContext,
} from '../scripts/splitAndSaveData';
import HandlingCSVMode from '../types/WtUploadCSVHandlingMode.enum';

/**
 * @param {Object} params
 * @param {Object} params.props - component props (file, mappingFields, handlingMode, addBulkItems, fileUploadHandler)
 * @param {Function} params.emit - emit from setup
 * @param {import('vue').Ref<boolean>} params.skipHeaders
 * @param {import('vue').Ref<string>} params.separator
 */

export interface UploadCsvParseSettings {
	separator: string;
}

export interface UseUploadCsvProps {
	file?: File | null;
	mappingFields?: CsvMappingField[];
	addBulkItems?: (
		items: unknown[],
		context: SaveChunkContext,
	) => unknown | Promise<unknown>;
	handlingMode?: HandlingCSVMode;
	fileUploadHandler?: (
		settings: UploadCsvParseSettings,
	) => unknown | Promise<unknown>;
	charset?: string;
	/**
	 * [Claude] when passed, "Save" closes the popup and the import continues in the background
	 * through this runner (e.g. useImportAction().runImport), which shows the loader and toasts
	 */
	importRunner?: ImportRunner;
}

interface UseUploadCsvParams {
	props: UseUploadCsvProps;
	// biome-ignore lint/suspicious/noExplicitAny: receives the component's typed emit
	emit: (event: any, ...args: any[]) => void;
	skipHeaders: Ref<boolean>;
	separator: Ref<string>;
}

const useUploadCsv = ({
	props,
	emit,
	skipHeaders,
	separator,
}: UseUploadCsvParams) => {
	const eventBus = useEventBus() ?? defaultEventBus;

	const isReadingFile = ref(false);
	const isParsingCSV = ref(false);
	const parsedFile = ref<unknown>(null);
	const isParsingPreview = ref(false);
	const csvPreview = ref<unknown[]>([
		[],
	]);

	const csvValues = computed(() =>
		(props.mappingFields || [])
			.filter((field) => field.csv)
			.flatMap((field) => field.csv),
	);

	const csvColumns = computed(() => {
		const firstRow = (csvPreview.value[0] || {}) as object;
		const columns = Object.keys(firstRow);

		if (skipHeaders.value) {
			return columns;
		}

		return columns.map((_, index) => `${index + 1} column`);
	});

	const filteredCsvColumns = computed(() =>
		csvColumns.value.filter((item) => csvValues.value.indexOf(item) !== -1),
	);

	const parseCSVOptions = computed(() => ({
		/* docs: https://csv.js.org/parse/options/ */
		delimiter: separator.value,
		columns: (firstLine: string[]) => {
			if (skipHeaders.value) return firstLine;
			return firstLine.map((_, index) => `${index}`);
		},
		skipEmptyLines: true,
	}));

	const csvPreviewTableHeaders = computed(() =>
		csvColumns.value.map((col, index) => ({
			text: col,
			value: skipHeaders.value ? col : `${index}`,
		})),
	);

	const filteredCsvPreviewTableHeaders = computed(() =>
		filteredCsvColumns.value.map((col, index) => ({
			text: col,
			value: skipHeaders.value ? col : `${index}`,
		})),
	);

	const csvPreviewTableData = computed(() => csvPreview.value);

	const allowSaveAction = computed(() =>
		(props.mappingFields || []).every(
			(field) => !field.required || !isEmpty(field.csv),
		),
	);

	function notifyError(err: unknown) {
		eventBus.$emit('notification', {
			type: 'error',
			text: err instanceof Error ? err.message : String(err),
		});
	}

	async function createCSVPreview(file = parsedFile.value) {
		try {
			csvPreview.value = await parseCSV(file as string, {
				...parseCSVOptions.value,
				toLine: 4,
			});
		} catch (err) {
			notifyError(err);
			csvPreview.value = [
				[],
			];
		}
	}

	function resetMappings() {
		const mappingFields = (props.mappingFields || []).map((field) => ({
			...field,
			csv: field.multiple ? [] : '',
		}));
		emit('changeMappingFields', mappingFields);
	}

	async function handleParseOptionsChangeImpl() {
		// [Claude] nothing to re-parse until a file has been read
		if (!parsedFile.value) return;
		isParsingPreview.value = true;
		await createCSVPreview();
		resetMappings();
		isParsingPreview.value = false;
	}

	const handleParseOptionsChange = debounce(handleParseOptionsChangeImpl);

	async function initUploadPopup() {
		if (!props.file) return;

		isReadingFile.value = true;

		parsedFile.value = await processFile(props.file as File, {
			charset: props.charset,
		});
		await createCSVPreview(parsedFile.value);

		isReadingFile.value = false;
	}

	async function prepareCSVData() {
		const sourceData = await parseCSV(
			parsedFile.value as string,
			parseCSVOptions.value,
		);

		return normalizeCSVData({
			data: sourceData as CsvDataRow[],
			mappings: props.mappingFields ?? [],
		});
	}

	async function handleCSVProcessing() {
		await splitAndSaveData({
			data: await prepareCSVData(),
			saveCallback: props.addBulkItems,
		});
	}

	// [Claude] the file is parsed while the popup is open (parse errors keep it open), then saving runs in the background
	async function processCSVInBackground(importRunner: ImportRunner) {
		isParsingCSV.value = true;

		try {
			let importJob: Promise<unknown>;
			if (props.handlingMode === HandlingCSVMode.PROCESS) {
				const data = await prepareCSVData();
				importJob = importRunner({
					total: data.length,
					run: (onProgress) =>
						splitAndSaveData({
							data,
							saveCallback: props.addBulkItems,
							onProgress,
						}),
				});
			} else {
				const settings = {
					separator: separator.value,
				};
				importJob = importRunner({
					run: async () => props.fileUploadHandler?.(settings),
				});
			}

			// [Claude] closed after the runner has started, so the job has already captured the props it needs
			close();
			return importJob;
		} catch (err) {
			notifyError(err);
			throw err;
		} finally {
			isParsingCSV.value = false;
		}
	}

	async function processCSV() {
		if (props.importRunner) return processCSVInBackground(props.importRunner);

		isParsingCSV.value = true;

		try {
			if (props.handlingMode === HandlingCSVMode.PROCESS) {
				await handleCSVProcessing();
			} else {
				await props.fileUploadHandler?.({
					separator: separator.value,
				});
			}

			close();
		} catch (err) {
			notifyError(err);
			throw err;
		} finally {
			isParsingCSV.value = false;
		}
	}

	function handleSave() {
		emit('save');
		return processCSV();
	}

	function close() {
		emit('close');
	}

	watch(skipHeaders, async () => {
		await handleParseOptionsChange();
	});

	watch(separator, async () => {
		await handleParseOptionsChange();
	});

	watch(
		() => props.file,
		(file) => {
			if (file) initUploadPopup();
		},
		{
			immediate: true,
		}, // if popup has v-if=file
	);

	return {
		isReadingFile,
		isParsingCSV,
		isParsingPreview,
		csvPreviewTableData,
		csvPreviewTableHeaders,
		filteredCsvPreviewTableHeaders,
		csvColumns,
		allowSaveAction,

		processCSV,
		handleSave,
		close,
	};
};

export default useUploadCsv;
