import type { EngineListCommunication } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const blacklistNumberSchema = z.object<
	ZodShape<EngineListCommunication>
>({
	number: z.string().min(1),
	description: z.string().optional(),
	/** [Claude] 0 means a permanent number — set by the "temporary" switcher */
	expireAt: z
		.union([
			z.string(),
			z.number(),
		])
		.optional()
		.default(0),
});
