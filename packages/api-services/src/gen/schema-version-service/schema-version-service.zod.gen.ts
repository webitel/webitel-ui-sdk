/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

export const searchSchemaVersionParams = zod.object({
	schema_id: zod.string(),
});

export const searchSchemaVersionQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod.number().optional(),
	q: zod.string().optional(),
	sort: zod.string().optional(),
	fields: zod.array(zod.string()).optional(),
});

export const searchSchemaVersionResponse = zod.object({
	items: zod
		.array(
			zod.object({
				createdAt: zod.string().optional(),
				createdBy: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				id: zod.string().optional(),
				note: zod.string().optional(),
				schemaId: zod.string().optional(),
				version: zod.string().optional(),
			}),
		)
		.optional(),
	next: zod.boolean().optional(),
});
