import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

export const teamAgentSchema = z.object({
	agent: filledLookupSchema,
});
