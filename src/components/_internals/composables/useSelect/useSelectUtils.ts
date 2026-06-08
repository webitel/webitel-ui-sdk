export const toArray = (value) =>
	Array.isArray(value)
		? value
		: [
				value,
			];

// Handles mixed comparisons: when optionValue is used, selected array contains
// primitives while filteredOptions contains full objects, so we compare by dataKey
// against the primitive directly instead of trying to read dataKey from both sides.
export const isOptionSelected = (option, selectedArray, dataKey) => {
	const isObj = (v) => v != null && typeof v === 'object';
	return selectedArray.some((s) => {
		if (!dataKey) return s === option;
		if (isObj(s) && isObj(option)) return s[dataKey] === option[dataKey]; // both objects
		if (!isObj(s) && isObj(option)) return s === option[dataKey]; // s is primitive (optionValue)
		if (isObj(s) && !isObj(option)) return s[dataKey] === option; // option is primitive
		return s === option; // both primitives
	});
};

export const dedupeByKey = (items: unknown[], key: string): unknown[] => {
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
