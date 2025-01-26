import { defineStore } from 'pinia';

import { createUserAccessStore } from './accessStore';
import { getSession, getUiVisibilityAccess } from './api/UserinfoAPI';

export const createUserinfoStore = () => {
  const namespace = 'userinfo';
  const useAccessStore = createUserAccessStore({
    namespace,
  });

  return defineStore(namespace, () => {
    const accessStore = useAccessStore();
    const { initialize: initializeAccessStore } = accessStore;

    const initialize = async () => {
      const { scope, permissions } = await getSession();
      const access = await getUiVisibilityAccess();

      initializeAccessStore({
        scope,
        permissions,
        access,
      });
    };

    return {
      initialize,
    };
  });
};
