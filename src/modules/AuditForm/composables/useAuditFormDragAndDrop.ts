import type { MaybeRefOrGetter, Ref } from 'vue';
import { ref, toValue } from 'vue';

import type { AuditFormGroupModel } from './useAuditFormGroups';
import type { AuditFormQuestionModel } from './useAuditFormQuestions';

export const useAuditFormDragAndDrop = ({
	wrapper,
	groups,
	questions,
	updateQuestions,
}: {
	wrapper: Readonly<Ref<HTMLElement | null>>;
	groups: Ref<AuditFormGroupModel[]>;
	questions: MaybeRefOrGetter<AuditFormQuestionModel[]>;
	updateQuestions: (questions: AuditFormQuestionModel[]) => void;
}) => {
	const isDraggingQuestion = ref(false);
	let dragOrigin: {
		parent: ParentNode | null;
		next: ChildNode | null;
	} | null = null;

	function handleDragStart({ item }: { item: HTMLElement }) {
		isDraggingQuestion.value = !!item.dataset.questionId;
		dragOrigin = {
			parent: item.parentNode,
			next: item.nextSibling,
		};
	}

	function handleDragEnd({ item }: { item: HTMLElement }) {
		isDraggingQuestion.value = false;
		const questionsList = toValue(questions);
		const questionPlaces = Array.from(
			wrapper.value?.querySelectorAll<HTMLElement>('[data-question-id]') ?? [],
			(el) => ({
				questionId: el.dataset.questionId,
				groupId:
					el.closest<HTMLElement>('[data-group-id]')?.dataset.groupId ?? '',
			}),
		);
		const groupIds = Array.from(
			wrapper.value?.querySelectorAll<HTMLElement>('[data-group-id]') ?? [],
			(el) => el.dataset.groupId,
		);

		dragOrigin?.parent?.insertBefore(item, dragOrigin.next);

		groups.value = groupIds.flatMap((id) =>
			groups.value.filter((group) => group.id === id),
		);
		updateQuestions(
			questionPlaces.flatMap(({ questionId, groupId }) =>
				questionsList
					.filter(({ id }) => id === questionId)
					.map((question) =>
						question.groupId === groupId
							? question
							: {
									...question,
									groupId,
								},
					),
			),
		);
	}

	return {
		isDraggingQuestion,
		handleDragStart,
		handleDragEnd,
	};
};
