import { CreateSourceBody as genCaseSourceSchema } from '../../gen';

export const caseSourceSchema = genCaseSourceSchema.extend({
	name: genCaseSourceSchema.shape.name.default(''),
	description: genCaseSourceSchema.shape.description.unwrap().default(''),
	type: genCaseSourceSchema.shape.type.unwrap(),
});
