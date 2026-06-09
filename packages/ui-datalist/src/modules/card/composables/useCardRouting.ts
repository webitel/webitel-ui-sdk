import { computed, type Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { CardItemId } from '../types/CardStore.types';

export const useCardRouting = ({
	itemId,
	routeParamName = 'id',
}: {
	itemId: Ref<CardItemId>;
	routeParamName?: string;
}) => {
	const router = useRouter();
	const route = useRoute();

	const PARENT_PARAM_NAME = 'id';

	const isNestedCard = routeParamName !== PARENT_PARAM_NAME;

	const routeId = computed(() => route.params[routeParamName]);

	const parentId = computed(() => (isNestedCard ? route.params.id : null));

	const unwatch = watch(itemId, async (next, prev) => {
		if (next && !prev) {
			await router.replace({
				params: {
					...route.params,
					[routeParamName]: next,
				},
			});
			unwatch(); // Stop watching after successful redirect "null" -> "id"
		}
	});

	return {
		routeId,
		isNestedCard,
		parentId,
	};
};
