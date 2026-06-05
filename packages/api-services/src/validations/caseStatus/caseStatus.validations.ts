import { CreateStatusBody as genCaseStatusSchema } from '../../gen';

/**
 * @author
 * Unlike CreateSourceBody, CreateStatusBody is a plain ZodObject (not wrapped with .default()),
 * so no outer .unwrap() is needed. Individual fields are .optional() and are unwrapped separately.
 */
export const caseStatusSchema = genCaseStatusSchema.extend({
	name: genCaseStatusSchema.shape.name.unwrap().min(1),
});
