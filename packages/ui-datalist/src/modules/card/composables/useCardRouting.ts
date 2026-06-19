import { computed, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { CardItemId } from '../types/CardStore.types';

/**
 * Routing logic shared by top-level and nested card components.
 *
 * - `routeParamName` — which `route.params` key holds the item ID (default: `'id'`)
 * - `parentId` — when provided, the card is treated as nested: URL is updated
 *   only when a newly created item receives its server-assigned ID
 */
export const useCardRouting = ({
	itemId,
	routeParamName = 'id',
	parentId,
	manualSetup = false,
}: {
	itemId: Ref<CardItemId>;
	routeParamName?: string;
	parentId?: string;
	manualSetup?: boolean;
}) => {
	const router = useRouter();
	const route = useRoute();

	const routeId = computed(() => route.params[routeParamName]);

	if (!manualSetup) {
		const unwatch = watch(itemId, async (next, prev) => {
			if (next && !prev) {
				if (!parentId || routeId.value === 'new') {
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
