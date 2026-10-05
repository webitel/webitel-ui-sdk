import type { EngineResourceDisplay } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { phoneNumberSchema } from '../_shared/phoneNumber.validations';
import type { ZodShape } from '../types';

export const resourceDisplaySchema = z.object<ZodShape<EngineResourceDisplay>>({
	display: phoneNumberSchema.default(''),
});
