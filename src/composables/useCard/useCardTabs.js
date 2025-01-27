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
    const { params, hash } = route;

    return router.push({
      name: tab.pathName,
      params,
      hash,
    });
  }

  return {
    currentTab,

    changeTab,
  };
};
