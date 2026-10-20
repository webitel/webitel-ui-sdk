import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { cloneDeep } from 'lodash-es';
import type { MaybeRefOrGetter } from 'vue';
import { nextTick, toValue } from 'vue';

import { generateQuestionSchema } from '../schemas/AuditFormQuestionSchema';

export type AuditFormQuestionModel = EngineQuestion & {
	id?: string;
	groupId?: string;
};

export const useAuditFormQuestions = ({
	questions,
	updateQuestions,
}: {
	questions: MaybeRefOrGetter<AuditFormQuestionModel[]>;
	updateQuestions: (questions: AuditFormQuestionModel[]) => void;
}) => {
	const questionRefs: Record<
		string,
		{
			activateQuestion: () => void;
		} | null
	> = {};

	async function activateQuestion(id: string) {
		await nextTick();
		questionRefs[id]?.activateQuestion();
	}

	function addQuestion(groupId = '') {
		const newQuestion = {
			...generateQuestionSchema(),
			groupId,
		};
		const questionsList = [
			...toValue(questions),
		];
		const index = groupId
			? questionsList.findLastIndex(
					(question) => question.groupId === groupId,
				) + 1
			: 0;
		questionsList.splice(index || questionsList.length, 0, newQuestion);
		updateQuestions(questionsList);
		activateQuestion(newQuestion.id);
	}

	function updateQuestion(value: AuditFormQuestionModel) {
		updateQuestions(
			toValue(questions).map((question) =>
				question.id === value.id ? value : question,
			),
		);
	}

	function copyQuestion(question: AuditFormQuestionModel) {
		const questionsList = [
			...toValue(questions),
		];
		questionsList.splice(questionsList.indexOf(question) + 1, 0, {
			...cloneDeep(question),
			id: crypto.randomUUID(),
		});
		updateQuestions(questionsList);
	}

	function deleteQuestion(question: AuditFormQuestionModel) {
		updateQuestions(toValue(questions).filter(({ id }) => id !== question.id));
	}

	return {
		questionRefs,
		activateQuestion,
		addQuestion,
		updateQuestion,
		copyQuestion,
		deleteQuestion,
	};
};
