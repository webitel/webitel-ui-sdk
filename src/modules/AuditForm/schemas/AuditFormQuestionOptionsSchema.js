import { EngineAuditQuestionType } from 'webitel-sdk';

export const generateOption = () => ({
  name: '',
  score: 10,
});

export const generateQuestionOptionsSchema = () => ({
  type: EngineAuditQuestionType.Option,
  options: [
    generateOption(),
  ],
});
