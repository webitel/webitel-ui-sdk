import Sortable from 'sortablejs';
import type { Ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export type SortableEvent = {
	item: HTMLElement;
	from: HTMLElement;
	to: HTMLElement;
	oldIndex: number;
	newIndex: number;
	oldDraggableIndex: number;
	newDraggableIndex: number;
};

type SortableOptions = Record<string, unknown> & {
	onStart?: (event: SortableEvent) => void;
	onEnd?: (event: SortableEvent) => void;
};

export const useSortable = (
	el: Readonly<Ref<HTMLElement | null>>,
	options: SortableOptions,
) => {
	let sortable: {
		destroy: () => void;
	} | null = null;
	let dragOrigin: {
		parent: ParentNode | null;
		next: ChildNode | null;
	} | null = null;

	onMounted(() => {
		sortable = Sortable.create(el.value, {
			...options,
			onStart: (event: SortableEvent) => {
				dragOrigin = {
					parent: event.item.parentNode,
					next: event.item.nextSibling,
				};
				options.onStart?.(event);
			},
			onEnd: (event: SortableEvent) => {
				dragOrigin?.parent?.insertBefore(event.item, dragOrigin.next);
				options.onEnd?.(event);
			},
		});
	});

	onUnmounted(() => sortable?.destroy());
};
