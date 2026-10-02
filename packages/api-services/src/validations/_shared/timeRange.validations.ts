import { z } from 'zod';

import { i18nIssue } from './i18nIssue';

export const dayMinuteSchema = z
	.number()
	.int()
	.refine((value) => value >= 0 && value < 24 * 60, i18nIssue('hourRange'));

export type TimeRange = {
	start: number;
	end: number;
};

export type TimeRangeIssue = {
	index: number;
	prop: string;
	key: string;
};

const isIntersecting = (current: TimeRange, range: TimeRange) =>
	(current.start >= range.start && current.end <= range.end) ||
	(current.start <= range.start && current.end >= range.start) ||
	(current.start <= range.end && current.end >= range.end);

export const getIntersectingIndices = <T extends TimeRange>(
	items: T[],
	groupBy: (item: T) => unknown = () => null,
) => {
	const indices = new Set<number>();

	items.forEach((current, index) => {
		items.slice(0, index).forEach((range, rangeIndex) => {
			if (
				groupBy(current) === groupBy(range) &&
				isIntersecting(current, range)
			) {
				indices.add(index);
				indices.add(rangeIndex);
			}
		});
	});

	return indices;
};

export const refineTimeRangesNotIntersect =
	<T extends TimeRange>(groupBy?: (item: T) => unknown) =>
	(items: T[], ctx: z.RefinementCtx) => {
		getIntersectingIndices(items, groupBy).forEach((index) => {
			ctx.addIssue({
				code: 'custom',
				path: [
					index,
					'start',
				],
				...i18nIssue('timerangeNotIntersect'),
			});
			ctx.addIssue({
				code: 'custom',
				path: [
					index,
					'end',
				],
				...i18nIssue('timerangeNotIntersect'),
			});
		});
	};

export const getTimeRangeIssues = (
	schema: z.ZodType,
	items: unknown,
): TimeRangeIssue[] => {
	const result = schema.safeParse(items);

	if (result.success) return [];

	return result.error.issues.flatMap((issue) => {
		const [index, prop] = issue.path;
		const key =
			issue.code === 'custom' && typeof issue.params?.i18nKey === 'string'
				? issue.params.i18nKey
				: undefined;

		if (typeof index !== 'number' || typeof prop !== 'string' || !key) {
			return [];
		}

		return [
			{
				index,
				prop,
				key,
			},
		];
	});
};
