import { z } from 'zod';

/**
 * @description
 * Queues and queue members both hold user-defined variables as an editable
 * list of pairs, while the wire format is a plain map. The api modules convert
 * between the two; this is the form-side shape.
 */
export const variablePairSchema = z.object({
	key: z.string(),
	value: z.string(),
});

/**
 * The form-side pair, for the components that edit the list. Inferred from the
 * schema so it cannot drift from what the api modules convert against.
 */
export type VariablePair = z.infer<typeof variablePairSchema>;
