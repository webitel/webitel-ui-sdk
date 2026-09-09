import type { StoreDefinition } from 'pinia';
import { computed, type MaybeRefOrGetter, toValue, watch } from 'vue';

import { useInjectedCardStore } from '../../card/composables/useCardStoreProvider';
import type { CardItemId } from '../../card/types/CardStore.types';

/**
 * The list of a card page's nested tab.
 *
 * The store is shared by every card of its kind and outlives all of them, so a
 * tab that read it directly showed the rows of whichever record was opened
 * before — and a card for an unsaved record, having no id to initialize with,
 * showed them until it was saved.
 *
 * Registering the list with the card store makes the card responsible for
 * emptying it, and the parent to load comes from the card's own `itemId`: it
 * arrives late for a record created from a nested tab, and the list follows.
 *
 * ```ts
 * const tableStore = useNestedTableList({ useTableStore: useQueueBucketsStore });
 * const { dataList, isLoading } = storeToRefs(tableStore);
 * ```
 *
 * [WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)
 */
export const useNestedTableList = ({
	useTableStore,
	parentId,
}: {
	useTableStore: StoreDefinition;
	/** only where the parent is not the card's own record */
	parentId?: MaybeRefOrGetter<CardItemId>;
}) => {
	const tableStore = useTableStore();
	const cardStore = useInjectedCardStore();

	cardStore?.registerNestedList(tableStore);

	const parent = computed<CardItemId>(
		() => toValue(parentId) ?? cardStore?.itemId ?? null,
	);

	watch(
		parent,
		(id) => {
			if (id)
				tableStore.initialize({
					parentId: id,
				});
		},
		{
			immediate: true,
		},
	);

	return tableStore;
};
