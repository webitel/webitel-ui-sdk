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

export type TimeRangeError = {
	index: number;
	prop: string;
	key: string;
};

const RANGE_PROPS = [
	'start',
	'end',
] as const;

const addRangeIssue = (
	ctx: z.RefinementCtx,
	key: string,
	...path: number[]
) => {
	RANGE_PROPS.forEach((prop) => {
		ctx.addIssue({
			code: 'custom',
			path: [
				...path,
				prop,
			],
			...i18nIssue(key),
		});
	});
};

export const refineTimeRangeStartLessThanEnd = (
	item: TimeRange,
	ctx: z.RefinementCtx,
) => {
	if (item.start >= item.end) addRangeIssue(ctx, 'timerangeStartLessThanEnd');
};

export const timeRangeSchema = z
	.object({
		start: dayMinuteSchema,
		end: dayMinuteSchema,
	})
	.superRefine(refineTimeRangeStartLessThanEnd);

const isIntersecting = (a: TimeRange, b: TimeRange) =>
	a.start <= b.end && b.start <= a.end;

export const refineTimeRangesNotIntersect =
	<T extends TimeRange>(groupBy?: (item: T) => unknown) =>
	(items: T[], ctx: z.RefinementCtx) => {
		items.forEach((item, index) => {
			const hasIntersection = items.some(
				(other, otherIndex) =>
					otherIndex !== index &&
					groupBy?.(item) === groupBy?.(other) &&
					isIntersecting(item, other),
			);

			if (hasIntersection) addRangeIssue(ctx, 'timerangeNotIntersect', index);
		});
	};

export const getTimeRangeErrors = (
	schema: z.ZodType,
	items: unknown,
): TimeRangeError[] => {
	const result = schema.safeParse(items);

	if (result.success) return [];

	return result.error.issues.flatMap((issue) => {
		const [index, prop] = issue.path;
		const key = issue.code === 'custom' ? issue.params?.i18nKey : undefined;

		if (
			typeof index !== 'number' ||
			typeof prop !== 'string' ||
			typeof key !== 'string'
		) {
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
