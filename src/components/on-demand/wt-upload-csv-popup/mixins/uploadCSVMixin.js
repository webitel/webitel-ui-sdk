import debounce from '@webitel/ui-sdk/src/scripts/debounce';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';

import HandlingCSVMode from '../enums/HandlingCSVMode.enum.js'
import normalizeCSVData from '../scripts/normalizeCSVData';
import parseCSV from '../scripts/parseCSV';
import processFile from '../scripts/processFile';
import splitAndSaveData from '../scripts/splitAndSaveData';

export default {
  props: {
    file: {
      required: true,
    },
    mappingFields: {
      type: Array,
      description: '[{ name: String, required: Boolean, csv: String, multiple: Boolean }]',
    },
    addBulkItems: {
      type: Function,
    },
    handlingMode: {
      type: String,
      default: HandlingCSVMode.PROCESS,
      description:
        "'process' - parse and process CSV, 'upload' - upload whole file",
    },
    fileUploadHandler: { type: Function },
  },
  model: {
    prop: 'mappingFields',
    event: 'changeMappingFields',
  },
  data: () => ({
    isReadingFile: false,
    isParsingCSV: false,
    parsedFile: null,
    isParsingPreview: false,
    parseErrorStackTrace: '',
    csvPreview: [[]],
  }),
  computed: {
    csvValues() {
      return this.mappingFields.filter((field) => field.csv).flatMap((field) => field.csv);
    },
    filteredCsvColumns() {
      return this.csvColumns.filter((item) => this.csvValues.indexOf(item) !== -1);
    },
    csvColumns() {
      return this.skipHeaders
        ? Object.keys(this.csvPreview[0])
        : Object.keys(this.csvPreview[0]).map((col, index) => `${index + 1} column`);
    },
    parseCSVOptions() {
      /* docs: https://csv.js.org/parse/options/ */
      return {
        delimiter: this.separator,
        columns: (firstLine) => {
          if (this.skipHeaders) return firstLine;
          return firstLine.map((item, index) => `${index}`);
        },
        // skipLinesWithError: true,
        skipEmptyLines: true,
        // cast: true,
      };
    },
    csvPreviewTableHeaders() {
      return this.csvColumns.map((col, index) => ({
        text: col,
        value: this.skipHeaders ? col : `${index}`,
      }));
    },
    filteredCsvPreviewTableHeaders() {
      return this.filteredCsvColumns.map((col, index) => ({
        text: col,
        value: this.skipHeaders ? col : `${index}`,
      }));
    },
    csvPreviewTableData() {
      return this.csvPreview;
    },
    allowSaveAction() {
      return this.mappingFields.every((field) => !field.required || !isEmpty(field.csv));
    },
  },
  methods: {
    async initUploadPopup() {
      this.isReadingFile = true;

      this.parsedFile = await processFile(this.file, {});
      await this.createCSVPreview(this.parsedFile);

      this.isReadingFile = false;
    },
    async handleParseOptionsChange() {
      this.isParsingPreview = true;
      await this.createCSVPreview();
      this.resetMappings();
      this.isParsingPreview = false;
    },
    async createCSVPreview(file = this.parsedFile) {
      try {
        this.parseErrorStackTrace = '';
        this.csvPreview = await parseCSV(file, {
          ...this.parseCSVOptions,
          toLine: 4,
        });
      } catch (err) {
        this.parseErrorStackTrace = err;
        this.csvPreview = [[]];
      }
    },
    async handleCSVProcessing() {
      const sourceData = await parseCSV(this.parsedFile, this.parseCSVOptions);

      const normalizedData = normalizeCSVData({
        data: sourceData,
        mappings: this.mappingFields,
      });

      await splitAndSaveData({
        data: normalizedData,
        saveCallback: this.addBulkItems,
      });
    },

    async processCSV() {
      this.isParsingCSV = true;

      try {
        this.parseErrorStackTrace = '';

        const handler = this.handlingMode === HandlingCSVMode.PROCESS
          ? this.handleCSVProcessing
          : this.fileUploadHandler;

        await handler();

        this.close();
      } catch (err) {
        this.parseErrorStackTrace = err;
        throw err;
      } finally {
        this.isParsingCSV = false;
      }
    },
    resetMappings() {
      // reset previously selected values
      const mappingFields = this.mappingFields.map((field) => ({
        ...field,
        csv: field.multiple ? [] : '',
      }));
      this.$emit('changeMappingFields', mappingFields);
    },
    handleSave() {
      this.$emit('save');
      return this.processCSV();
    },
    close() {
      this.$emit('close');
    },
  },
  created() {
    this.handleParseOptionsChange = debounce(this.handleParseOptionsChange);
  },
  watch: {
    async skipHeaders() {
      await this.handleParseOptionsChange();
    },
    async separator() {
      await this.handleParseOptionsChange();
    },
    file: {
      handler(file) {
        if (file) this.initUploadPopup();
      },
    },
  },
};
