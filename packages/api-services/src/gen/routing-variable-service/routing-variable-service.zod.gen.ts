/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

/**
 * @summary List of RoutingVariable
 */
export const searchRoutingVariableQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod.number().optional(),
	domainId: zod.string().optional(),
});

export const searchRoutingVariableResponse = zod.object({
	items: zod
		.array(
			zod.object({
				domainId: zod.string().optional(),
				id: zod.string().optional(),
				key: zod.string().optional(),
				value: zod.string().optional(),
			}),
		)
		.optional(),
});

/**
 * @summary Create RoutingVariable
 */
export const createRoutingVariableBody = zod.object({
	domainId: zod.string().optional(),
	key: zod.string().optional(),
	value: zod.string().optional(),
});

export const createRoutingVariableResponse = zod.object({
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	key: zod.string().optional(),
	value: zod.string().optional(),
});

/**
 * @summary Remove RoutingVariable
 */
export const deleteRoutingVariableParams = zod.object({
	id: zod.string(),
});

export const deleteRoutingVariableQueryParams = zod.object({
	domainId: zod.string().optional(),
});

export const deleteRoutingVariableResponse = zod.object({
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	key: zod.string().optional(),
	value: zod.string().optional(),
});

/**
 * @summary RoutingVariable item
 */
export const readRoutingVariableParams = zod.object({
	id: zod.string(),
});

export const readRoutingVariableQueryParams = zod.object({
	domainId: zod.string().optional(),
});

export const readRoutingVariableResponse = zod.object({
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	key: zod.string().optional(),
	value: zod.string().optional(),
});

/**
 * @summary Update RoutingVariable
 */
export const updateRoutingVariableParams = zod.object({
	id: zod.string(),
});

export const updateRoutingVariableBody = zod.object({
	domainId: zod.string().optional(),
	key: zod.string().optional(),
	value: zod.string().optional(),
});

export const updateRoutingVariableResponse = zod.object({
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	key: zod.string().optional(),
	value: zod.string().optional(),
});
