import { type ComputedRef, computed, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export interface CardTab {
	pathName: string;
	[key: string]: unknown;
}

export const useCardTabs = <T extends CardTab>(
	tabs: Ref<T[]> | ComputedRef<T[]>,
) => {
	const router = useRouter();
	const route = useRoute();

	const currentTab = computed<T | undefined>(() => {
		return (
			tabs.value.find(({ pathName }) =>
				route.matched.some(({ name }) => name === pathName),
			) || tabs.value[0]
		);
	});

	function changeTab(tab: T) {
		const { params, query, hash } = route;

		return router.push({
			name: tab.pathName,
			params,
			query,
			hash,
		});
	}

	return {
		currentTab,
		changeTab,
	};
};
