import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const OAuthSchema = z.object<ZodShape<ApiOAuthService>>({
	name: z.string().min(1),
	type: z.string().min(1),
	clientId: z.string().min(1),
	clientSecret: z.string().min(1),
	discoveryUrl: z.string().min(1),
	scopes: z.array(z.string()).optional(),
	claims: z
		.array(
			z.object({
				type: z.string().optional(),
				value: z.string().optional(),
			}),
		)
		.min(1),
});
