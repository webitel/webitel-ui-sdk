import { CreateSourceBody as genCaseSourceSchema } from '../../gen';

/**
 * @author r.zatirskyi
 * Inner schema is required because started from orval v8.4.1
 * default values from the OpenAPI spec are preserved during Zod schema generation.
 *
 * Previously, orval ignored `default` values and generated plain `ZodObject`.
 * Now schemas are wrapped with `.default(...)`, which transforms
 * `CreateSourceBody` from `ZodObject` into `ZodDefault<ZodObject>`.
 */
const innerSchema = genCaseSourceSchema.unwrap();

export const caseSourceSchema = innerSchema.extend({
	name: innerSchema.shape.name.unwrap().default(''),
	description: innerSchema.shape.description.default(''),
	type: innerSchema.shape.type.unwrap(),
});
