import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export const useAccessControl = () => {
  const store = useStore();
  const route = useRoute();

  const hasReadAccess = computed(() =>
    store.getters['userinfo/HAS_READ_ACCESS']({ route }),
  );
  const hasCreateAccess = computed(() =>
    store.getters['userinfo/HAS_CREATE_ACCESS']({ route }),
  );
  const hasEditAccess = computed(() =>
    store.getters['userinfo/HAS_EDIT_ACCESS']({ route }),
  );
  const hasDeleteAccess = computed(() =>
    store.getters['userinfo/HAS_DELETE_ACCESS']({ route }),
  );

  const hasSaveActionAccess = computed(() => {
    if (route.params.id === 'new') return hasEditAccess.value;
    return hasCreateAccess.value;
  });

  const disableUserInput = computed(() => {
    if (route.params.id === 'new') return !hasEditAccess.value;
    return !hasCreateAccess.value;
  });

  return {
    hasReadAccess,
    hasCreateAccess,
    hasEditAccess,
    hasDeleteAccess,

    hasSaveActionAccess,
    disableUserInput,
  };
};
