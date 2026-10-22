import { isEqual } from 'lodash-es';
import type { MaybeRefOrGetter, Ref } from 'vue';
import { computed, nextTick, toValue } from 'vue';

import { generateGroupSchema } from '../schemas/AuditFormGroupSchema';
import { generateQuestionSchema } from '../schemas/AuditFormQuestionSchema';
import type {
	AuditFormGroupItem,
	AuditFormGroupModel,
	AuditFormItem,
	AuditFormQuestionModel,
} from '../scripts/criteriaTree';
import {
	cloneWithNewIds,
	isGroupItem,
	toTree,
	toWire,
} from '../scripts/criteriaTree';

export const useAuditFormCriteria = ({
	groups,
	questions,
	updateQuestions,
}: {
	groups: Ref<AuditFormGroupModel[]>;
	questions: MaybeRefOrGetter<AuditFormQuestionModel[] | undefined>;
	updateQuestions: (questions: AuditFormQuestionModel[]) => void;
}) => {
	const items = computed(() => toTree(groups.value, toValue(questions) ?? []));

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

	function commit(change: (list: AuditFormItem[]) => void) {
		const list = items.value.map((item) =>
			isGroupItem(item)
				? {
						...item,
						questions: [
							...item.questions,
						],
					}
				: item,
		);
		change(list);
		const wire = toWire(list);
		if (!isEqual(groups.value, wire.criteriaGroups)) {
			groups.value = wire.criteriaGroups;
		}
		updateQuestions(wire.questions);
	}

	const listOf = (list: AuditFormItem[], groupId = '') =>
		groupId
			? (list.find(({ id }) => id === groupId) as AuditFormGroupItem).questions
			: list;

	const indexIn = (list: AuditFormItem[], id: string) =>
		list.findIndex((item) => item.id === id);

	function addQuestion(groupId = '') {
		const question = generateQuestionSchema();
		commit((list) => listOf(list, groupId).push(question));
		activateQuestion(question.id);
	}

	const addGroup = () => commit((list) => list.push(generateGroupSchema()));

	const updateItem = (value: AuditFormItem, groupId = '') =>
		commit((list) => {
			const target = listOf(list, groupId);
			target.splice(indexIn(target, value.id), 1, value);
		});

	const copyItem = (item: AuditFormItem, groupId = '') =>
		commit((list) => {
			const target = listOf(list, groupId);
			target.splice(indexIn(target, item.id) + 1, 0, cloneWithNewIds(item));
		});

	const deleteItem = (item: AuditFormItem, groupId = '') =>
		commit((list) => {
			const target = listOf(list, groupId);
			target.splice(
				indexIn(target, item.id),
				1,
				...(isGroupItem(item) ? item.questions : []),
			);
		});

	const moveItem = ({
		fromGroupId,
		toGroupId,
		oldIndex,
		newIndex,
	}: {
		fromGroupId: string;
		toGroupId: string;
		oldIndex: number;
		newIndex: number;
	}) =>
		commit((list) =>
			listOf(list, toGroupId).splice(
				newIndex,
				0,
				...listOf(list, fromGroupId).splice(oldIndex, 1),
			),
		);

	const isGroupNameInUse = (name: string) =>
		groups.value.filter(
			(group) => group.name.trim().toLowerCase() === name.trim().toLowerCase(),
		).length > 1;

	return {
		items,
		questionRefs,
		activateQuestion,
		addQuestion,
		addGroup,
		updateItem,
		copyItem,
		deleteItem,
		moveItem,
		isGroupNameInUse,
	};
};
