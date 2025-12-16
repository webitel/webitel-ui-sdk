import { computed, defineEmits, ref, watch } from 'vue';

import { debounce, isEmpty } from '../../../../scripts';
import normalizeCSVData from '../scripts/normalizeCSVData';
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
const useUploadCsv = ({ props, emit, skipHeaders, separator }) => {
  const isReadingFile = ref(false);
  const isParsingCSV = ref(false);
  const parsedFile = ref(null);
  const isParsingPreview = ref(false);
  const parseErrorStackTrace = ref('');
  const csvPreview = ref([[]]);

  console.log('emit', emit);

  const csvValues = computed(() =>
    (props.mappingFields || [])
      .filter((field) => field.csv)
      .flatMap((field) => field.csv),
  );

  const csvColumns = computed(() => {
    const firstRow = csvPreview.value[0] || {};
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
    columns: (firstLine) => {
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

  async function createCSVPreview(file = parsedFile.value) {
    try {
      parseErrorStackTrace.value = '';
      csvPreview.value = await parseCSV(file, {
        ...parseCSVOptions.value,
        toLine: 4,
      });
    } catch (err) {
      parseErrorStackTrace.value = err;
      csvPreview.value = [[]];
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

    parsedFile.value = await processFile(props.file, {});
    await createCSVPreview(parsedFile.value);

    isReadingFile.value = false;
  }

  async function handleCSVProcessing() {
    const sourceData = await parseCSV(parsedFile.value, parseCSVOptions.value);

    const normalizedData = normalizeCSVData({
      data: sourceData,
      mappings: props.mappingFields,
    });

    await splitAndSaveData({
      data: normalizedData,
      saveCallback: props.addBulkItems,
    });
  }

  async function processCSV() {
    isParsingCSV.value = true;

    try {
      parseErrorStackTrace.value = '';

      const handler =
        props.handlingMode === HandlingCSVMode.PROCESS
          ? handleCSVProcessing
          : props.fileUploadHandler;

      if (handler) {
        await handler();
      }

      close();
    } catch (err) {
      parseErrorStackTrace.value = err;
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

  // watchers (те, що були в mixin.watch)
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
    parseErrorStackTrace,
    csvPreviewTableData,
    csvPreviewTableHeaders,
    filteredCsvPreviewTableHeaders,
    csvColumns,
    allowSaveAction,

    processCSV,
    handleSave,
    close,
  };
}

export default useUploadCsv;
