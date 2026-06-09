import { z } from 'zod';
import { CreateStatusConditionBody } from '../../gen';

export const caseStatusConditionSchema = z.object({
	name: CreateStatusConditionBody.shape.name.pipe(z.string().min(1)),
});
