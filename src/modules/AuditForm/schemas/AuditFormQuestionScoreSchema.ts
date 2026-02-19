import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';

export const generateQuestionScoreSchema = (): Partial<EngineQuestion> => ({
	type: EngineAuditQuestionType.QuestionScore,
	min: 1,
	max: 5,
});
