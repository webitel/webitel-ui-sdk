import { cloneDeep } from 'lodash-es';
import type { MaybeRefOrGetter, Ref } from 'vue';
import { toValue } from 'vue';

import type { AuditFormQuestionModel } from './useAuditFormQuestions';

export type AuditFormGroupModel = {
	id: string;
	name: string;
};

export const useAuditFormGroups = ({
	groups,
	questions,
	updateQuestions,
}: {
	groups: Ref<AuditFormGroupModel[]>;
	questions: MaybeRefOrGetter<AuditFormQuestionModel[]>;
	updateQuestions: (questions: AuditFormQuestionModel[]) => void;
}) => {
	function isGroupNameInUse(name: string) {
		const normalizedName = name.trim().toLowerCase();
		return (
			groups.value.filter(
				(group) => group.name.trim().toLowerCase() === normalizedName,
			).length > 1
		);
	}

	function addGroup() {
		groups.value = [
			...groups.value,
			{
				id: crypto.randomUUID(),
				name: '',
			},
		];
	}

	function updateGroup(group: AuditFormGroupModel) {
		groups.value = groups.value.map((item) =>
			item.id === group.id ? group : item,
		);
	}

	function copyGroup({
		group,
		questions: groupQuestions,
	}: {
		group: AuditFormGroupModel;
		questions: AuditFormQuestionModel[];
	}) {
		const newGroup = {
			...group,
			id: crypto.randomUUID(),
		};
		const groupsList = [
			...groups.value,
		];
		groupsList.splice(groupsList.indexOf(group) + 1, 0, newGroup);
		groups.value = groupsList;

		if (!groupQuestions.length) return;
		const questionsList = [
			...toValue(questions),
		];
		questionsList.splice(
			questionsList.findLastIndex(({ groupId }) => groupId === group.id) + 1,
			0,
			...groupQuestions.map((question) => ({
				...cloneDeep(question),
				id: crypto.randomUUID(),
				groupId: newGroup.id,
			})),
		);
		updateQuestions(questionsList);
	}

	function deleteGroup(group: AuditFormGroupModel) {
		groups.value = groups.value.filter(({ id }) => id !== group.id);
		updateQuestions(
			toValue(questions).map((question) =>
				question.groupId === group.id
					? {
							...question,
							groupId: '',
						}
					: question,
			),
		);
	}

	return {
		isGroupNameInUse,
		addGroup,
		updateGroup,
		copyGroup,
		deleteGroup,
	};
};
