import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';
import type { EngineQuestion } from '@webitel/api-services/gen/models';

export const generateQuestionYesSchema = (): Partial<EngineQuestion> => ({
	type: EngineAuditQuestionType.QuestionYes,
	criticalViolation: false,
});
