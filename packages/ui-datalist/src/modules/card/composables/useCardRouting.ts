import { computed, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { CardItemId } from '../types/CardStore.types';

/**
 * Routing logic shared by top-level and nested card components.
 *
 * - `routeParamName` — which `route.params` key holds the item ID (default: `'id'`)
 * - `nested` — when `true`, reads `parentId` from `route.params.id` and only
 *   updates the URL for newly created items (i.e. when `routeId === 'new'`)
 */
export const useCardRouting = ({
	itemId,
	routeParamName = 'id',
	nested = false,
}: {
	itemId: Ref<CardItemId>;
	routeParamName?: string;
	nested?: boolean;
}) => {
	const router = useRouter();
	const route = useRoute();

	const routeId = computed(() => route.params[routeParamName]);
	const parentId = computed(() => (nested ? (route.params.id ?? null) : null));

	const unwatch = watch(itemId, async (next, prev) => {
		if (next && !prev) {
			if (!nested || routeId.value === 'new') {
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

	return {
		routeId,
		parentId,
	};
};
