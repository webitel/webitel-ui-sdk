import { z } from 'zod';

import { lookupSchema } from '../_shared/lookup.validations';

/** Answering-machine detection, on the outbound IVR and the two auto-dialers. */
export const queueAmdSchema = z.object({
	enabled: z.boolean().optional(),
	ai: z.boolean().optional(),
	positive: z.array(z.string()).optional(),
	playback: lookupSchema.optional(),
	allowNotSure: z.boolean().optional(),
	silenceNotSure: z.boolean().optional(),
	maxWordLength: z.number().optional(),
	maxNumberOfWords: z.number().optional(),
	betweenWordsSilence: z.number().optional(),
	minWordLength: z.number().optional(),
	totalAnalysisTime: z.number().optional(),
	silenceThreshold: z.number().optional(),
	afterGreetingSilence: z.number().optional(),
	greeting: z.number().optional(),
	initialSilence: z.number().optional(),
});
