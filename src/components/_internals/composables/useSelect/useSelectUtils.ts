export const toArray = (value) =>
	Array.isArray(value)
		? value
		: [
				value,
			];

export const isOptionSelected = (option, selectedArray, dataKey) => {
	return dataKey
		? selectedArray.some((s) => s != null && s[dataKey] === option[dataKey])
		: selectedArray.some((s) => s === option);
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
		const k = (item as any)[key];
		if (!seen.has(k)) seen.set(k, item);
	}
	return [
		...seen.values(),
	];
};
