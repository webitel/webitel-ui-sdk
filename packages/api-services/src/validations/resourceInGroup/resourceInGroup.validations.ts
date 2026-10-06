import type { EngineOutboundResourceInGroup } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { clearableNumberSchema } from '../_shared/clearableNumber.validations';
import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const resourceInGroupSchema = z.object<
	ZodShape<EngineOutboundResourceInGroup>
>({
	resource: filledLookupSchema,
	reserveResource: flexibleLookupSchema.nullish().default({}),
	priority: clearableNumberSchema.default(0),
});
