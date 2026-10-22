import type { WfmForecastCalculation } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const forecastCalculationSchema = z.object<
	ZodShape<WfmForecastCalculation>
>({
	name: z.string().min(1).max(250),
	procedure: z.string().min(1),
	description: z.string().optional().default(''),
	args: z.array(z.string()).optional().default([]),
});
