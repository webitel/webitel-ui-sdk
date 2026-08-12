import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useCardTabs = (tabs) => {
	const router = useRouter();
	const route = useRoute();

	const currentTab = computed(() => {
		return (
			tabs?.value.find(({ pathName }) => route.name === pathName) ||
			tabs?.value[0]
		);
	});

	function changeTab(tab) {
		if (!tab?.pathName) return;

		return router.push({
			...route,
			name: tab.pathName,
		});
	}

	return {
		currentTab,

		changeTab,
	};
};
