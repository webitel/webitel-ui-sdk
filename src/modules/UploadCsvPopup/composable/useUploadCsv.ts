import { computed, type Ref, ref, watch } from 'vue';

import { useEventBus } from '../../../composables';
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
import splitAndSaveData from '../scripts/splitAndSaveData';
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
	addBulkItems?: (items: unknown[]) => unknown | Promise<unknown>;
	handlingMode?: string;
	fileUploadHandler?: (
		settings: UploadCsvParseSettings,
	) => unknown | Promise<unknown>;
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
			text: err,
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
		isParsingPreview.value = true;
		await createCSVPreview();
		resetMappings();
		isParsingPreview.value = false;
	}

	const handleParseOptionsChange = debounce(handleParseOptionsChangeImpl);

	async function initUploadPopup() {
		if (!props.file) return;

		isReadingFile.value = true;

		parsedFile.value = await processFile(props.file as File, {});
		await createCSVPreview(parsedFile.value);

		isReadingFile.value = false;
	}

	async function handleCSVProcessing() {
		const sourceData = await parseCSV(
			parsedFile.value as string,
			parseCSVOptions.value,
		);

		const normalizedData = normalizeCSVData({
			data: sourceData as CsvDataRow[],
			mappings: props.mappingFields ?? [],
		});

		await splitAndSaveData({
			data: normalizedData,
			saveCallback: props.addBulkItems,
		});
	}

	async function processCSV() {
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
