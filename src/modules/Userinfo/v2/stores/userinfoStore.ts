import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getSession, getUiVisibilityAccess, logout } from '../api/UserinfoAPI';
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
      hasSectionVisibility,
    } = accessStore;

    const userId = ref();
    const thisApp = ref<string | undefined>()
    const userInfo = ref(null)

    const initialize = async () => {
      const { scope, permissions, ...userinfoData } = await getSession();
      const access = await getUiVisibilityAccess();

      userId.value = userinfoData.userId;

      initializeAccessStore({
        scope,
        permissions,
        access,
      });
    };

    const setApplicationName = (name: string) => {
      thisApp.value = name
    }

    const logoutUser = async () => {
      await logout()
      userInfo.value = null
      // todo redirect to auth page
    }

    return {
      userId,
      thisApp,
      initialize,

      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,

      hasSectionVisibility,
      routeAccessGuard,
      hasSpecialGlobalActionAccess,

      setApplicationName,
      logoutUser,
    };
  });

  // @ts-ignore
  window._userinfoStore = store;

  return store;
};
