import type { EngineOutboundResourceGroup } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { i18nIssue } from '../_shared/i18nIssue';
import { filledLookupSchema } from '../_shared/lookup.validations';
import {
	dayMinuteSchema,
	getTimeRangeIssues,
	refineTimeRangesNotIntersect,
	type TimeRange,
} from '../_shared/timeRange.validations';
import type { ZodShape } from '../types';

const timeRangeUiSchema = z
	.object({
		start: dayMinuteSchema,
		end: dayMinuteSchema,
	})
	.superRefine((item, ctx) => {
		if (item.start >= item.end) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'start',
				],
				...i18nIssue('timerangeStartLessThanEnd'),
			});
		}
	});

const timeRangesUiArraySchema = z
	.array(timeRangeUiSchema)
	.min(1)
	.superRefine(refineTimeRangesNotIntersect());

export const getResourceGroupTimeRangeIssues = (items: unknown) =>
	getTimeRangeIssues(timeRangesUiArraySchema, items);

export const getDefaultResourceGroupTimeRange = (): TimeRange => ({
	start: 9 * 60,
	end: 20 * 60,
});

export const resourceGroupSchema = z.object<
	ZodShape<EngineOutboundResourceGroup> & {
		time?: z.ZodType;
	}
>({
	name: z.string().min(1),
	communication: filledLookupSchema,
	description: z.string().optional().default(''),
	time: timeRangesUiArraySchema.default(() => [
		getDefaultResourceGroupTimeRange(),
	]),
});
