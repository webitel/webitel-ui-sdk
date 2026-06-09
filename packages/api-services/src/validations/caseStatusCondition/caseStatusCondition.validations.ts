import { z } from 'zod';

import type { ZodShape } from '../types';

interface CaseStatusConditionInput {
	name?: string;
	description?: string;
	final?: boolean;
	initial?: boolean;
}

export const caseStatusConditionSchema = z.object<
	ZodShape<CaseStatusConditionInput>
>({
	name: z.string().min(1),
	description: z.string().optional(),
	final: z.boolean().optional(),
	initial: z.boolean().optional(),
});
