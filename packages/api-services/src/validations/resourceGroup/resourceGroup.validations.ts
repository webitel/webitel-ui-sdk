import type { EngineOutboundResourceGroup } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { filledLookupSchema } from '../_shared/lookup.validations';
import {
	getTimeRangeErrors,
	refineTimeRangesNotIntersect,
	type TimeRange,
	timeRangeSchema,
} from '../_shared/timeRange.validations';
import type { ZodShape } from '../types';

const timeRangesUiArraySchema = z
	.array(timeRangeSchema)
	.min(1)
	.superRefine(refineTimeRangesNotIntersect());

export const getResourceGroupTimeRangeErrors = (items: unknown) =>
	getTimeRangeErrors(timeRangesUiArraySchema, items);

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
