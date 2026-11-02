import type { EngineCommunicationType } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const communicationTypeSchema = z.object<
	ZodShape<EngineCommunicationType>
>({
	name: z.string().min(1).default(''),
	channel: z.string().min(1).default(''),
	code: z.string().min(1).default(''),
	description: z.string().optional().default(''),
	default: z.boolean().default(false),
});
