import type { Ref } from 'vue';
import { ref } from 'vue';

import type { SortableEvent } from '../../../composables/useSortable/useSortable';
import { useSortable } from '../../../composables/useSortable/useSortable';

export const useAuditFormDragAndDrop = ({
	wrapper,
	disabled,
	moveItem,
}: {
	wrapper: Readonly<Ref<HTMLElement | null>>;
	disabled: boolean;
	moveItem: (move: {
		fromGroupId: string;
		toGroupId: string;
		oldIndex: number;
		newIndex: number;
	}) => void;
}) => {
	const isDraggingQuestion = ref(false);

	const groupIdOf = (el: HTMLElement) =>
		el.closest<HTMLElement>('[data-group-id]')?.dataset.groupId ?? '';

	function handleDragStart({ item }: SortableEvent) {
		isDraggingQuestion.value = !!item.dataset.questionId;
	}

	function handleDragEnd({
		from,
		to,
		oldDraggableIndex,
		newDraggableIndex,
	}: SortableEvent) {
		isDraggingQuestion.value = false;
		if (from === to && oldDraggableIndex === newDraggableIndex) return;
		moveItem({
			fromGroupId: groupIdOf(from),
			toGroupId: groupIdOf(to),
			oldIndex: oldDraggableIndex,
			newIndex: newDraggableIndex,
		});
	}

	useSortable(wrapper, {
		group: 'audit-form-criteria',
		handle:
			'.audit-form-question-read__drag-icon, .audit-form-group__drag-icon',
		disabled,
		onStart: handleDragStart,
		onEnd: handleDragEnd,
	});

	return {
		isDraggingQuestion,
		handleDragStart,
		handleDragEnd,
	};
};
