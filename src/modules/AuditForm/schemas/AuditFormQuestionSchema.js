import { generateQuestionScoreSchema } from './AuditFormQuestionScoreSchema';

// eslint-disable-next-line import/prefer-default-export
export const generateQuestionSchema = () => ({
  required: false,
  text: 'Title',
  ...generateQuestionScoreSchema(),
});
