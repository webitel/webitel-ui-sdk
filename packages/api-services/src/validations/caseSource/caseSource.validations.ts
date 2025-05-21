import {
  createSourceBody as genCaseSourceSchema,
} from '../../gen';

export const caseSourceSchema = genCaseSourceSchema.extend({
  name: genCaseSourceSchema.shape.name.default(''),
  description: genCaseSourceSchema.shape.name.default(''),
});
