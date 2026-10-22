export interface CsvCharsetOption {
	name: string;
	value: string;
}

/** [Claude] csv files are read as utf-8, the only charset the importers offer */
export const defaultCsvCharset: CsvCharsetOption = {
	name: 'UTF-8',
	value: 'utf-8',
};
