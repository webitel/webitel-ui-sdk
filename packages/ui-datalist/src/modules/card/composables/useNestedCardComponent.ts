import { type StoreDefinition, storeToRefs } from 'pinia';
import { watch } from 'vue';

import { useCardComponent } from './useCardComponent';
import { useCardRouting } from './useCardRouting';

/**
 * Composable for nested (popup) card components.
 *
 * Wraps `useCardComponent` with `manualSetup: true` and delegates
 * routing to `useCardRouting`. Pass `parentId` from the component —
 * its presence indicates a nested card context.
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
export const useNestedCardComponent = <CardEntity>({
	useCardStore,
	onLoadErrorHandler,
	routeParamName,
	parentId,
}: {
	useCardStore: StoreDefinition;
	onLoadErrorHandler?: (err: unknown) => void;
	routeParamName: string;
	parentId?: string;
}) => {
	const cardSetup = useCardComponent<CardEntity>({
		useCardStore,
		onLoadErrorHandler,
		manualSetup: true,
	});

	const cardStore = useCardStore();
	const { itemId } = storeToRefs(cardStore);
	const { initialize, $reset } = cardStore;

	const { routeId } = useCardRouting({
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
					parentId,
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
