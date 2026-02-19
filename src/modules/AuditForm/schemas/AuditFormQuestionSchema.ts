import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { generateQuestionScoreSchema } from './AuditFormQuestionScoreSchema';

export const generateQuestionSchema = ({
	required = true,
}: {
	required?: boolean;
} = {}): Partial<EngineQuestion> => ({
	required,
	question: '',
	...generateQuestionScoreSchema(),
});
