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
    const access = ref(null)

    const initialize = async () => {
      const session = await getSession();
      access.value = await getUiVisibilityAccess();

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
        access: access.value,
      });
    };

    const setApplicationName = (name: string) => {
      thisApp.value = name;
    };

    const checkAppAccess = (applicationName: string) => {
      return (
        !access.value[applicationName] ||
        access.value[applicationName]?._enabled
      );
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

      setApplicationName,
      logoutUser,
    };
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window._userinfoStore = store;

  return store;
};
