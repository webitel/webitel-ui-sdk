import { type StoreDefinition, storeToRefs } from 'pinia';
import { watch } from 'vue';

import { useCardComponent } from './useCardComponent';
import { useCardRouting } from './useCardRouting';

/**
 * Composable for nested (popup) card components.
 *
 * Wraps `useCardComponent` with `manualSetup: true` and delegates
 * routing to `useCardRouting` with `nested: true`, which:
 * - Reads the item ID from `route.params[routeParamName]`
 * - Reads the parent ID from `route.params.id`
 * - Updates the URL only when a new item receives its server-assigned ID
 *
 * @example
 * ```ts
 * const { isNew, hasValidationErrors, save } = useNestedCardComponent({
 *   useCardStore: useSomeCardStore,
 *   routeParamName: 'conditionId',
 * });
 * ```
 */
export const useNestedCardComponent = <CardEntity>({
	useCardStore,
	onLoadErrorHandler,
	routeParamName,
}: {
	useCardStore: StoreDefinition;
	onLoadErrorHandler?: (err: unknown) => void;
	routeParamName: string;
}) => {
	const result = useCardComponent<CardEntity>({
		useCardStore,
		onLoadErrorHandler,
		manualSetup: true,
	});

	const cardStore = useCardStore();
	const { itemId } = storeToRefs(cardStore);
	const { initialize, $reset } = cardStore;

	const { routeId, parentId } = useCardRouting({
		itemId,
		routeParamName,
		nested: true,
	});

	watch(
		routeId,
		(value) => {
			if (value) {
				initialize({
					itemId: value === 'new' ? null : value,
					parentId: parentId.value,
				});
			} else {
				$reset();
			}
		},
		{
			immediate: true,
		},
	);

	return result;
};
