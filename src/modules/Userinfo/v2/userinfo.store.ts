import { defineStore } from 'pinia';

import { createUserAccessStore } from './access.store.ts';

export const createUserinfoStore = async () => {
  const scope = await null; // from API
  const { hasReadAccess } = createUserAccessStore();

  return defineStore('userinfo', () => {
    return {
      hasReadAccess,
    };
  });
};
