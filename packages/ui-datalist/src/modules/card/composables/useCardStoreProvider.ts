import { type InjectionKey, inject, provide } from 'vue';

import type { CardItemId, NestedList } from '../types/CardStore.types';

/**
 * What a nested tab needs from the card page it lives in: the record it is a
 * tab of, and somewhere to register its list so the card can empty it.
 */
export interface NestedListsOwner {
	itemId: CardItemId;
	registerNestedList: (list: NestedList) => void;
}

export const CardStoreKey: InjectionKey<NestedListsOwner> =
	Symbol('datalistCardStore');

/**
 * `useCardComponent` provides the card's own store, so the tabs below it need
 * no wiring of their own — see `useNestedTableList`.
 */
export const provideCardStore = (store: NestedListsOwner) => {
	provide(CardStoreKey, store);
};

/** `null` outside a card page, where a list has no owner to reset it */
export const useInjectedCardStore = () => inject(CardStoreKey, null);
