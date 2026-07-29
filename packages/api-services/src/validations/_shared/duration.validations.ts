import { z } from 'zod';

export const requiredDurationSchema = (min = 1) =>
	z.union([
		z.string().min(min),
		z.number().min(min),
	]);
