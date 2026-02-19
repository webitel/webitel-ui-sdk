import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';
import type {
	EngineQuestion,
	EngineQuestionOption,
} from '@webitel/api-services/gen/models';

export const generateOption = (): EngineQuestionOption => ({
	name: '',
	score: 10,
});

export const generateQuestionOptionsSchema = (): Partial<EngineQuestion> => ({
	type: EngineAuditQuestionType.QuestionOption,
	options: [
		generateOption(),
	],
});
