import type { WebitelCasesCloseReasonGroup } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const caseCloseReasonGroupSchema = z.object<
	ZodShape<WebitelCasesCloseReasonGroup>
>({
	name: z.string().min(1),
	description: z.string().optional(),
});
