import {computed, Ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {CardItemId} from "../types/CardStore.types";

export const useCardRouting = ({ itemId }: {
  itemId: Ref<CardItemId>;
}) => {
  const router = useRouter();
  const route = useRoute();

  const routeId = computed(() => {
    return route.params.id;
  });

  const unwatch = watch(itemId, async (next, prev) => {
    if (next && !prev) {
      await router.replace({
        params: {
          ...route.params,
          id: next,
        },
      });
      unwatch(); // Stop watching after successful redirect "null" -> "id"
    }
  });

  return {
    routeId,
  };
};
