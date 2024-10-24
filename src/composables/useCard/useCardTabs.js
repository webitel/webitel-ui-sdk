import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useCardTabs = (tabs) => {
  const router = useRouter();
  const route = useRoute();

  const currentTab = computed(() => {
    return tabs.find(({ pathName }) => route.name === pathName) || tabs[0];
  });

  function changeTab(tab) {
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
  }
}
