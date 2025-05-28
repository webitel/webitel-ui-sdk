import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getSession, getUiVisibilityAccess } from '../api/UserinfoAPI';
import { createUserAccessStore } from './accessStore';

export const createUserinfoStore = () => {
  const namespace = 'userinfo';
  const useAccessStore = createUserAccessStore({
    namespace,
  });

  const store = defineStore(namespace, () => {
    const accessStore = useAccessStore();
    const {
      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,
      initialize: initializeAccessStore,
      routeAccessGuard,
      hasSpecialGlobalActionAccess,
    } = accessStore;

    const userId = ref();

    const initialize = async () => {
      const { scope, permissions, ...userinfo } = await getSession();
      const access = await getUiVisibilityAccess();

      userId.value = userinfo.userId;

      initializeAccessStore({
        scope,
        permissions,
        access,
      });
    };

    return {
      userId,
      initialize,

      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,

      routeAccessGuard,
      hasSpecialGlobalActionAccess,
    };
  });

  // @ts-ignore
  window._userinfoStore = store;

  return store;
};
