import pick from 'lodash/pick';
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
      checkAppAccess,
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
    const thisApp = ref<string | undefined>();
    const userInfo = ref(null);

    const initialize = async (applicationName = null) => {
      const session = await getSession();
      const access = await getUiVisibilityAccess();
      thisApp.value = applicationName

      userId.value = session.userId;
      userInfo.value = pick(session, [
        'domainId',
        'username',
        'permissions',
        'userId',
        'scope',
        'roles',
        'license',
      ]);

      initializeAccessStore({
        scope: session.scope,
        permissions: session.permissions,
        access,
      });
    };

    const logoutUser = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const authUrl = import.meta.env.VITE_AUTH_URL;
      if (!authUrl) throw new Error('No authUrl for LOGOUT provided');
      await logout();
      window.location.href = authUrl;
    };

    return {
      userId,
      thisApp,
      userInfo,
      initialize,

      checkAppAccess,
      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,

      hasSectionVisibility,
      routeAccessGuard,
      hasSpecialGlobalActionAccess,
      logoutUser,
    };
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window._userinfoStore = store;

  return store;
};
