import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';

import { flexibleLookupSchema } from '../_shared/lookup.validations';

/** Answering-machine detection, on the outbound IVR and the two auto-dialers. */
export const queueAmdSchema = z.object({
	enabled: z.boolean().optional(),
	ai: z.boolean().optional(),
	positive: z.array(z.string()).optional(),
	playback: flexibleLookupSchema.optional(),
	allowNotSure: z.boolean().optional(),
	silenceNotSure: z.boolean().optional(),
	maxWordLength: clearableNumberSchema,
	maxNumberOfWords: clearableNumberSchema,
	betweenWordsSilence: clearableNumberSchema,
	minWordLength: clearableNumberSchema,
	totalAnalysisTime: clearableNumberSchema,
	silenceThreshold: clearableNumberSchema,
	afterGreetingSilence: clearableNumberSchema,
	greeting: clearableNumberSchema,
	initialSilence: clearableNumberSchema,
});
