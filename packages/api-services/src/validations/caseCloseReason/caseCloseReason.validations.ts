import type { WebitelCasesCloseReason } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const caseCloseReasonSchema = z.object<
	ZodShape<WebitelCasesCloseReason>
>({
	name: z.string().min(1),
	description: z.string().optional(),
});
