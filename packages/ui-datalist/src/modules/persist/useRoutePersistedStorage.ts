import { useRoute, useRouter } from 'vue-router';

import { StorageLike } from './PersistedStorage.types.ts';

export const useRoutePersistedStorage = (): StorageLike => {
  const router = useRouter();
  const route = useRoute();

  const getItem = async (key: string) => {
    return route.query[key];
  };

  const setItem = async (key: string, value: string | string[]) => {
    await router.replace({
      name: route.name,
      params: route.params,
      hash: route.hash,
      query: {
        ...route.query,
        [key]: value,
      },
    });
  };

  const removeItem = async (key: string) => {
    const query = { ...route.query };
    delete query[key];
    await router.replace({
      name: route.name,
      params: route.params,
      hash: route.hash,
      query,
    });
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
