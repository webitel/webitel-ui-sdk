import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getSession, getUiVisibilityAccess } from '../api/UserinfoAPI';
import { createUserAccessStore } from './accessStore';

export const createUserinfoStore = () => {
  const namespace = 'userinfo';
  const useAccessStore = createUserAccessStore({
    namespace,
  });

  return defineStore(namespace, () => {
    const accessStore = useAccessStore();
    const { initialize: initializeAccessStore } = accessStore;

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
    };
  });
};
