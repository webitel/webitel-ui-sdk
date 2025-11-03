import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getSession, getUiVisibilityAccess } from '../api/UserinfoAPI';
import { createUserAccessStore } from './accessStore';
import { createSettingsStore } from './settingsStore';

export const createUserinfoStore = () => {
  const namespace = 'userinfo';
  const useAccessStore = createUserAccessStore({
    namespace,
  });
  const useSettingsStore = createSettingsStore({
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
    const settings = useSettingsStore();

    const userId = ref();

    const initialize = async () => {
      const { scope, permissions, ...userinfo } = await getSession();
      const access = await getUiVisibilityAccess();
      await settings.initialize();

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

      hasSectionVisibility,
      routeAccessGuard,
      hasSpecialGlobalActionAccess,

      settings,
    };
  });

  // @ts-ignore
  window._userinfoStore = store;

  return store;
};
