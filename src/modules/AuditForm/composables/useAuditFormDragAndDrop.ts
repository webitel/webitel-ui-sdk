import type { Ref } from 'vue';
import { ref } from 'vue';

import type { AuditFormSortableEvent } from './useAuditFormSortable';
import { useAuditFormSortable } from './useAuditFormSortable';

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

	let dragOrigin: {
		parent: ParentNode | null;
		next: ChildNode | null;
	} | null = null;

	const groupIdOf = (el: HTMLElement) =>
		el.closest<HTMLElement>('[data-group-id]')?.dataset.groupId ?? '';

	function handleDragStart({ item }: AuditFormSortableEvent) {
		isDraggingQuestion.value = !!item.dataset.questionId;
		dragOrigin = {
			parent: item.parentNode,
			next: item.nextSibling,
		};
	}

	function handleDragEnd({
		item,
		from,
		to,
		oldDraggableIndex,
		newDraggableIndex,
	}: AuditFormSortableEvent) {
		isDraggingQuestion.value = false;
		dragOrigin?.parent?.insertBefore(item, dragOrigin.next);
		if (from === to && oldDraggableIndex === newDraggableIndex) return;
		moveItem({
			fromGroupId: groupIdOf(from),
			toGroupId: groupIdOf(to),
			oldIndex: oldDraggableIndex,
			newIndex: newDraggableIndex,
		});
	}

	useAuditFormSortable(wrapper, {
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
