import { z } from 'zod';

import { requiredLookupSchema } from '../_shared/lookup.validations';

/** [Claude] The media "Text-to-Speech" popup: the fields a file can't be generated without. */
export const textToSpeechSchema = z.object({
	name: z.string().min(1),
	profile: requiredLookupSchema,
	text: z.string().min(1),
});
