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
