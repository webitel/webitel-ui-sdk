import type { EngineList } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const blacklistSchema = z.object<ZodShape<EngineList>>({
	name: z.string().min(1),
	description: z.string().optional(),
});
