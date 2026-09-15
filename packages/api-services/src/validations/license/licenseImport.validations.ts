import type { UpdateCustomerParams } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

/** Payload for importing a license certificate via `PUT /customer`. */
export const licenseImportSchema = z.object<
	ZodShape<Pick<UpdateCustomerParams, 'certificate'>>
>({
	certificate: z.string().min(1).default(''),
});
