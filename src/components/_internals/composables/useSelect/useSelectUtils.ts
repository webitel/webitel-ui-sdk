export const toArray = (value) =>
	Array.isArray(value)
		? value
		: [
				value,
			];

export const isOptionSelected = (option, selectedArray, dataKey) => {
	return dataKey
		? selectedArray.some((s) => s[dataKey] === option[dataKey])
		: selectedArray.some((s) => s === option);
};
