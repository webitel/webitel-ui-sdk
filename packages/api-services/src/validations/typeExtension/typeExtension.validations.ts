import type { WebitelProtoDataStruct } from 'webitel-sdk';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const typeExtensionSchema = z.object<ZodShape<WebitelProtoDataStruct>>({
	fields: z.array(z.any()).optional(),
});
