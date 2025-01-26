import {
  getSession,
  getUiVisibilityAccess,
  logout,
  setInstance,
} from '../v2/api/UserinfoAPI.js';

/**
 * @deprecated remove after v25.06 release
 * @description
 * backward compat
 * */
const userinfo = (instance) => {
  if (instance) {
    setInstance(instance);
  }

  return {
    getSession,
    logout,
    getUiVisibilityAccess,
  };
};

export default userinfo;
