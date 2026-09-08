import { computed, type MaybeRefOrGetter, type Ref, toValue, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { CardItemId, CardParentId } from '../types/CardStore.types';

/**
 * Routing logic shared by top-level and nested card components.
 *
 * - `routeParamName` — which `route.params` key holds the item ID (default: `'id'`)
 * - `parentId` — when provided, the card is treated as nested: URL is updated
 *   only when a newly created item receives its server-assigned ID. Pass a ref
 *   or a getter whenever the parent can be created while the card is already
 *   mounted — a popup living inside its parent's card page watches
 *   `route.params.id` go from `'new'` to a real id underneath it, and a plain
 *   string captured at setup would keep addressing `'new'`.
 */
export const useCardRouting = ({
	itemId,
	routeParamName = 'id',
	parentId: rawParentId,
	manualSetup = false,
}: {
	itemId: Ref<CardItemId>;
	routeParamName?: string;
	parentId?: MaybeRefOrGetter<CardParentId>;
	manualSetup?: boolean;
}) => {
	const router = useRouter();
	const route = useRoute();

	const routeId = computed(() => route.params[routeParamName]);
	/** resolved on read, so a nested card always addresses the current parent */
	const parentId = computed(() => toValue(rawParentId));

	if (!manualSetup) {
		const unwatch = watch(itemId, async (next, prev) => {
			if (next && !prev) {
				if (!parentId.value || routeId.value === 'new') {
					await router.replace({
						params: {
							...route.params,
							[routeParamName]: next,
						},
					});
				}
				unwatch();
			}
		});
	}

	return {
		routeId,
		parentId,
	};
};
