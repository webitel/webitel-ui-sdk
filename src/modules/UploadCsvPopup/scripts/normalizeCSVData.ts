import isEmpty from '../../../scripts/isEmpty';

/** maps a webitel field to the csv column(s) it is built from */
export interface CsvMappingField {
	name: string;
	csv: string | string[];
	required?: boolean;
	/** ui locale key */
	locale?: string;
	/** the field maps to several csv columns */
	multiple?: boolean;
	/** hint rendered under the mapping row */
	tooltip?: string;
}

export type CsvDataRow = Record<string, unknown>;

const normalizeCSVData = ({
	data,
	mappings,
}: {
	data: CsvDataRow[];
	mappings: CsvMappingField[];
}) => {
	const nonEmptyMappingFields = mappings.filter((field) => !isEmpty(field.csv));

	return data.map((dataItem, index) => {
		const normalized = nonEmptyMappingFields.reduce(
			(normalizedItem: Record<string, unknown>, { name, csv, required }) => {
				const value = Array.isArray(csv)
					? csv.map((csv) => dataItem[csv])
					: dataItem[csv];

				let filteredValue: unknown; // Filter empty values in validation purposes
				if (Array.isArray(value)) {
					// Because required field can be combined from many fields in multiple select, so we need to check all values.
					// For example, if we have 3 fields and they are empty, we will get empty array.
					filteredValue = value.filter((item) => !isEmpty(item));
				} else {
					filteredValue = value;
				}

				const isValueEmpty = isEmpty(filteredValue);
				// This check is only for required fields
				if (required && isValueEmpty) {
					throw new Error(
						`Required field is empty: ${name} on row ${index + 1}`,
					);
				}

				if (isValueEmpty) {
					return normalizedItem;
				}
				// Original value for proper mapping (e.g., variables in members)
				normalizedItem[name] = value;
				return normalizedItem;
			},
			{} as Record<string, unknown>,
		);

		return normalized;
	});
};

export default normalizeCSVData;
