import { z } from 'zod';
import { CreateSourceBody as GenCreateSourceBody } from '../../gen';

export const CreateSourceBody = GenCreateSourceBody.extend({
	name: GenCreateSourceBody.shape.name.pipe(z.string().min(1)),
});
