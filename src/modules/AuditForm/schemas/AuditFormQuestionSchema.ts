import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { generateQuestionScoreSchema } from './AuditFormQuestionScoreSchema';

export const generateQuestionSchema = ({
	required = true,
}: {
	required?: boolean;
} = {}): Partial<EngineQuestion> & {
	id: string;
} => ({
	id: crypto.randomUUID(),
	required,
	question: '',
	...generateQuestionScoreSchema(),
});
