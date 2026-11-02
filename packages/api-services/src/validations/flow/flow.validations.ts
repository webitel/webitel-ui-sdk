import {
	type EngineRoutingSchema,
	EngineRoutingSchemaType,
} from '@webitel/api-services/gen/models';
import { z } from 'zod';

/**
 * [Claude] A code-editor flow: `schema` travels as JSON text (the API stringifies
 * it on read and parses it back on write), so the form only needs it non-empty.
 */
export const flowSchema = z.object({
	name: z.string().min(1).default(''),
	schema: z.string().min(1).default('[]'),
	type: z.enum(EngineRoutingSchemaType).optional(),
	tags: z
		.array(
			z.object({
				name: z.string().optional(),
			}),
		)
		.optional()
		.default([]),
	editor: z.boolean().optional().default(false),
});

export type FlowFormShape = z.input<typeof flowSchema>;

/** [Claude] the flow as a card holds it: the API entity with the form's fields (`schema` as text) */
export type FlowCard = Omit<EngineRoutingSchema, keyof FlowFormShape> &
	FlowFormShape;
