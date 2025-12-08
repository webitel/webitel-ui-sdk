import isEmpty from "@webitel/ui-sdk/src/scripts/isEmpty";

/**
 *
 * @param data
 * @param mappings
 *
 * Data format: {
 * [colName]: [value]
 * }
 *
 * Mappings format: {
 * name: string, // webitel field name
 * csv: string | string[], // csv column name
 * required: boolean, // is this webitel field required?
 * locale: string, // ui
 * }
 */
const normalizeCSVData = ({ data, mappings }) => {
  const nonEmptyMappingFields = mappings.filter((field) => !isEmpty(field.csv));

  return data.map((dataItem, index) => {
    const normalized = nonEmptyMappingFields.reduce((normalizedItem, { name, csv, required }) => {
      const value = Array.isArray(csv) ? csv.map((csv) => dataItem[csv]) : dataItem[csv];

      let filteredValue; // Filter empty values in validation purposes
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
        throw new Error(`Required field is empty: ${name} on row ${index + 1}`);
      }

      return isValueEmpty
        ? normalizedItem
        : {
            ...normalizedItem,
            [name]: value, // Return the original value for proper mapping (e.g., variables in members)
          };
    }, {});

    return normalized;
  });
};

export default normalizeCSVData;
