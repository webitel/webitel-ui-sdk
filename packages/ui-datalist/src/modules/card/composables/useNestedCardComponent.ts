import { type StoreDefinition, storeToRefs } from 'pinia';
import { type MaybeRefOrGetter, watch } from 'vue';

import type { CardParentId } from '../types/CardStore.types';
import { useCardComponent } from './useCardComponent';
import { useCardRouting } from './useCardRouting';

/**
 * Composable for nested (popup) card components.
 *
 * Wraps `useCardComponent` with `manualSetup: true` and delegates
 * routing to `useCardRouting`. Pass `parentId` from the component —
 * its presence indicates a nested card context. A ref or getter is read on
 * every `initialize`, so a popup mounted while its parent was still `'new'`
 * follows the parent's real id instead of addressing `'new'` forever.
 *
 * @example
 * ```ts
 * const parentId = computed(() => route.params.id ?? null);
 *
 * const { isNew, hasValidationErrors, save } = useNestedCardComponent({
 *   useCardStore: useSomeCardStore,
 *   routeParamName: 'conditionId',
 *   parentId,
 * });
 * ```
 */
export const useNestedCardComponent = <
	// biome-ignore lint/suspicious/noExplicitAny: matches RegleSchema's own state constraint
	CardEntity extends Record<string, any>,
>({
	useCardStore,
	onLoadErrorHandler,
	routeParamName,
	parentId,
}: {
	useCardStore: StoreDefinition;
	onLoadErrorHandler?: (err: unknown) => void;
	routeParamName: string;
	parentId?: MaybeRefOrGetter<CardParentId>;
}) => {
	const cardSetup = useCardComponent<CardEntity>({
		useCardStore,
		onLoadErrorHandler,
		manualSetup: true,
	});

	const cardStore = useCardStore();
	const { itemId } = storeToRefs(cardStore);
	const { initialize, $reset } = cardStore;

	const { routeId, parentId: currentParentId } = useCardRouting({
		itemId,
		routeParamName,
		parentId,
	});

	watch(
		routeId,
		(value) => {
			if (value) {
				initialize({
					itemId: value === 'new' ? null : value,
					parentId: currentParentId.value,
				});
			} else {
				$reset();
			}
		},
		{
			immediate: true,
		},
	);

	return cardSetup;
};
