import Sortable from 'sortablejs';
import type { Ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export type AuditFormSortableEvent = {
	item: HTMLElement;
	from: HTMLElement;
	to: HTMLElement;
	oldDraggableIndex: number;
	newDraggableIndex: number;
};

export const useAuditFormSortable = (
	el: Readonly<Ref<HTMLElement | null>>,
	options: Record<string, unknown>,
) => {
	let sortable: {
		destroy: () => void;
	} | null = null;

	onMounted(() => {
		sortable = Sortable.create(el.value, options);
	});

	onUnmounted(() => sortable?.destroy());
};
