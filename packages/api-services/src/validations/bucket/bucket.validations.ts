import type { EngineBucket } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const bucketSchema = z.object<ZodShape<EngineBucket>>({
	name: z.string().min(1),
	description: z.string().optional(),
});
