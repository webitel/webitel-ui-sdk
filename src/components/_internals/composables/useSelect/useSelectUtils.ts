import type { SelectOption, SelectValue } from './types';

export const toArray = (value: SelectValue): SelectOption[] =>
	Array.isArray(value)
		? value
		: value
			? [
					value,
				]
			: [];

// Handles mixed comparisons: when optionValue is used, selected array contains
// primitives while filteredOptions contains full objects, so we compare by dataKey
// against the primitive directly instead of trying to read dataKey from both sides.
export const isOptionSelected = (
	option: SelectOption,
	selectedArray: SelectOption[],
	dataKey: string,
) => {
	const isObj = (v: unknown): boolean => v != null && typeof v === 'object';
	return selectedArray.some((s: SelectOption) => {
		if (!dataKey) return s === option;
		if (isObj(s) && isObj(option)) return s[dataKey] === option[dataKey]; // both objects
		if (!isObj(s) && isObj(option)) return s === option[dataKey]; // s is primitive (optionValue)
		if (isObj(s) && !isObj(option)) return s[dataKey] === option; // option is primitive
		return s === option; // both primitives
	});
};

export const dedupeByKey = (
	items: SelectOption[],
	key: string,
): SelectOption[] => {
	if (!key) {
		// no dataKey — fall back to reference dedup via Set
		return [
			...new Set(items),
		];
	}
	const seen = new Map();
	for (const item of items) {
		const k =
			item != null && typeof item === 'object'
				? (item as Record<string, unknown>)[key]
				: item;
		if (!seen.has(k)) seen.set(k, item);
	}
	return [
		...seen.values(),
	];
};

export const filterOptionsBySearchValue = (
	options: SelectOption[],
	value: string,
	getOptionLabel: (option: SelectOption) => string,
) => {
	return options.filter((option: SelectOption) =>
		getOptionLabel(option).toLowerCase().includes(value.toLowerCase()),
	);
};
