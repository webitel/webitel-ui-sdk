import type { ProtoDataStruct } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const typeExtensionSchema = z.object<ZodShape<ProtoDataStruct>>({
	fields: z.array(z.any()).optional(),
});
