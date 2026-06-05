import { CreateStatusConditionBody as genCaseStatusConditionSchema } from '../../gen';

export const caseStatusConditionSchema = genCaseStatusConditionSchema.extend({
	name: genCaseStatusConditionSchema.shape.name.unwrap().min(1),
});
