/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

/**
 * @summary List of WebHook
 */
export const searchWebHookQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod.number().optional(),
	q: zod.string().optional(),
	sort: zod.string().optional(),
	fields: zod.array(zod.string()).optional(),
	id: zod.array(zod.number()).optional(),
});

export const searchWebHookResponse = zod.object({
	items: zod
		.array(
			zod.object({
				authorization: zod.string().optional(),
				createdAt: zod.string().optional(),
				createdBy: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				description: zod.string().optional(),
				enabled: zod.boolean().optional(),
				id: zod.number().optional(),
				key: zod.string().optional(),
				name: zod.string().optional(),
				origin: zod.array(zod.string()).optional(),
				schema: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				updatedAt: zod.string().optional(),
				updatedBy: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
			}),
		)
		.optional(),
	next: zod.boolean().optional(),
});

/**
 * @summary Create WebHook
 */
export const createWebHookBody = zod.object({
	authorization: zod.string().optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

export const createWebHookResponse = zod.object({
	authorization: zod.string().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	id: zod.number().optional(),
	key: zod.string().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary Remove WebHook
 */
export const deleteWebHookParams = zod.object({
	id: zod.number(),
});

export const deleteWebHookResponse = zod.object({
	authorization: zod.string().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	id: zod.number().optional(),
	key: zod.string().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary WebHook item
 */
export const readWebHookParams = zod.object({
	id: zod.number(),
});

export const readWebHookResponse = zod.object({
	authorization: zod.string().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	id: zod.number().optional(),
	key: zod.string().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary Patch WebHook
 */
export const patchWebHookParams = zod.object({
	id: zod.number(),
});

export const patchWebHookBody = zod.object({
	authorization: zod.string().optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	fields: zod.array(zod.string()).optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

export const patchWebHookResponse = zod.object({
	authorization: zod.string().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	id: zod.number().optional(),
	key: zod.string().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary Update WebHook
 */
export const updateWebHookParams = zod.object({
	id: zod.number(),
});

export const updateWebHookBody = zod.object({
	authorization: zod.string().optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

export const updateWebHookResponse = zod.object({
	authorization: zod.string().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	enabled: zod.boolean().optional(),
	id: zod.number().optional(),
	key: zod.string().optional(),
	name: zod.string().optional(),
	origin: zod.array(zod.string()).optional(),
	schema: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});
