export const TypesResourceStrategy = {
	PRIORITY_BASED: 'priority-based',
	EVEN_DISTRIBUTION: 'even-distribution',
} as const;

export type TypesResourceStrategy =
	(typeof TypesResourceStrategy)[keyof typeof TypesResourceStrategy];
