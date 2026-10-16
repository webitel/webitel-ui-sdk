import type { EngineRegion } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const regionSchema = z.object<ZodShape<EngineRegion>>({
	name: z.string().min(1),
	timezone: filledLookupSchema,
	description: z.string().optional().default(''),
});
