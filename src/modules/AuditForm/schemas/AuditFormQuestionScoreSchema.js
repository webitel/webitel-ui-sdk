import { EngineAuditQuestionType } from 'webitel-sdk';

// eslint-disable-next-line import/prefer-default-export
export const generateQuestionScoreSchema = () => ({
  type: EngineAuditQuestionType.Score,
  min: 1,
  max: 5,
});
