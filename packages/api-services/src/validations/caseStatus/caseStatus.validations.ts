import { z } from 'zod';
import { CreateStatusBody } from '../../gen';

export const caseStatusSchema = CreateStatusBody.extend({
	name: CreateStatusBody.shape.name.pipe(z.string().min(1)),
});
