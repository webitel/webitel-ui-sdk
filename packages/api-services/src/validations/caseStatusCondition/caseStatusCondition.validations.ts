import { z } from 'zod';
import { CreateStatusConditionBody } from '../../gen';

export const caseStatusConditionSchema = CreateStatusConditionBody.extend({
	name: CreateStatusConditionBody.shape.name.pipe(z.string().min(1)),
});
