import { useRoute, useRouter } from 'vue-router';

/**
 * Opens a nested-card popup on the same route by setting/replacing its
 * optional route param (e.g. `phones/:commId?`). `open()` or `open('new')`
 * opens the "add" card, `open(id)` opens an existing one.
 */
export const useCardListNavigation = ({
	routeParamName,
}: {
	routeParamName: string;
}) => {
	const route = useRoute();
	const router = useRouter();

	const open = (id: string = 'new') => {
		return router.push({
			name: route.name,
			params: {
				...route.params,
				[routeParamName]: id,
			},
			query: route.query,
		});
	};

	return {
		open,
	};
};
