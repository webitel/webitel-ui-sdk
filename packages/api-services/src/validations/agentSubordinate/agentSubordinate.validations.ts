import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

export const agentSubordinateSchema = z.object({
	agent: filledLookupSchema,
});
