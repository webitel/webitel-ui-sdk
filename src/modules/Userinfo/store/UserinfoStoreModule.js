import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule.js';
import userinfoGenerator from '../api/userinfo.js';
import ApplicationsAccess from '../classes/ApplicationsAccess.js';
import Permissions from '../enums/Permissions.enum.js';

let userinfo = null;

const defaultState = () => ({
  isLoading: true,
  domainId: 0,
  name: '',
  username: '',
  account: '',
  preferredUsername: '',
  userId: 0,
  scope: {},
  permissions: {},
  roles: [],
  license: [],
  access: {},
  language: localStorage.getItem('lang'),
});

export default class UserinfoStoreModule extends BaseStoreModule {
  state = {
    ...defaultState(),
  };

  getters = {
    THIS_APP: (state) => state.thisApp,
    // if no access[app] => accessed by default
    CHECK_APP_ACCESS: (state) => (app) => !state.access[app] ||
      state.access[app]?._enabled,
    CHECK_OBJECT_ACCESS: (state, getters) => ({ name, route }) => {
      if (!state.access[getters.THIS_APP] ||
        !state.access[getters.THIS_APP]._enabled) return false;
      if (route) return getters.CHECK_OBJECT_ACCESS_BY_ROUTE(route);
      return getters.CHECK_OBJECT_ACCESS_BY_NAME(name);
    },
    CHECK_OBJECT_ACCESS_BY_NAME: (state, getters) => (name) => (
      state.access[getters.THIS_APP][name]?._enabled
    ),
    CHECK_OBJECT_ACCESS_BY_ROUTE: (state, getters) => (route) => {
      const accessKey = Object.keys(state.access[getters.THIS_APP])
      .find((object) => route.name.includes(object));
      return state.access[getters.THIS_APP][accessKey]?._enabled;
    },
    GET_OBJECT_SCOPE: (state, getters) => ({ name, route }) => {
      if (route) return getters.GET_OBJECT_SCOPE_BY_ROUTE(route);
      return getters.GET_OBJECT_SCOPE_BY_NAME(name);
    },
    GET_OBJECT_SCOPE_BY_NAME: (state) => (name) => (
      Object.values(state.scope).find((object) => name === object.name)
    ),
    GET_OBJECT_SCOPE_BY_ROUTE: (state) => (route) => (
      Object.values(state.scope)
      .find((object) => route.name.includes(object.route))
    ),
    HAS_READ_ACCESS: (state, getters) => (checkedObject) => {
      if (!getters.CHECK_OBJECT_ACCESS(checkedObject)) return false;
      if (state.permissions[Permissions.READ]) return true;
      const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
      return objectScope?.access?.includes('r');
    },
    HAS_CREATE_ACCESS: (state, getters) => (checkedObject) => {
      if (state.permissions[Permissions.CREATE]) return true;
      const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
      return objectScope?.access?.includes('x');
    },
    HAS_EDIT_ACCESS: (state, getters) => (checkedObject) => {
      if (state.permissions[Permissions.EDIT]) return true;
      const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
      return objectScope?.access?.includes('w');
    },
    HAS_DELETE_ACCESS: (state, getters) => (checkedObject) => {
      if (state.permissions[Permissions.DELETE]) return true;
      const objectScope = getters.GET_OBJECT_SCOPE(checkedObject);
      return objectScope?.access?.includes('d');
    },
  };

  actions = {
    BEFORE_OPEN_SESSION_HOOK: () => {},
    AFTER_OPEN_SESSION_HOOK: () => {},
    CONVERT_USER_SCOPE: (context, scope) => scope,
    CONVERT_USER_PERMISSIONS: (context, initialPermissions) => {
      let permissions = {};
      if (!initialPermissions) return permissions;
      permissions = initialPermissions.reduce((
        permissions,
        currentPermission,
      ) => ({
        ...permissions,
        [currentPermission.id]: currentPermission,
      }), {});
      return permissions;
    },

    OPEN_SESSION: async (context, { instance }) => {
      userinfo = userinfoGenerator(instance);

      await context.dispatch('BEFORE_OPEN_SESSION_HOOK');

      const HOUR_LENGTH = 60 * 60 * 1000;

      const session = await userinfo.getSession();

      if ((session.expiresAt - Date.now() < HOUR_LENGTH)) {
        await context.dispatch('LOGOUT');
        throw new Error(`Session expires soon ${session.expiresAt}`);
      }

      await context.dispatch('SET_SESSION', session);
      const access = await userinfo.getApplicationsAccess();
      await context.dispatch('SET_APPLICATIONS_ACCESS', new ApplicationsAccess({ access }).getAccess());
      await context.dispatch('AFTER_OPEN_SESSION_HOOK');
    },
    SET_SESSION: async (context, _session) => {
      const defaultSession = {
        domainId: 0,
        username: '',
        userId: 0,
        scope: [],
        roles: [],
        license: [],
      };

      try {
        await context.dispatch('RESET_STATE');
        const session = { ...defaultSession, ..._session };
        const scope = await context.dispatch('CONVERT_USER_SCOPE', session.scope);
        const permissions = await context.dispatch('CONVERT_USER_PERMISSIONS', session.permissions);
        context.commit('SET_SESSION', { ...session, scope, permissions });
        await context.dispatch('SET_LOADING', false);
      } catch (err) {
        throw err;
      }
    },

    LOGOUT: async (
      context,
      { authUrl = import.meta.env.VITE_AUTH_URL } = {},
    ) => {
      if (!authUrl) throw new Error('No authUrl for LOGOUT provided');
      await userinfo.logout();
      window.location.href = authUrl;
    },

    SET_APPLICATIONS_ACCESS: (
      context,
      access,
    ) => context.commit('SET_APPLICATIONS_ACCESS', access),

    SET_LOADING: (context, isLoading) => {
      context.commit('SET_LOADING', isLoading);
    },

    RESET_STATE: (context) => {
      context.commit('RESET_STATE');
    },
  };

  mutations = {
    SET_SESSION: (state, session) => {
      Object.assign(state, session);
    },

    SET_APPLICATIONS_ACCESS: (state, access) => {
      state.access = access;
    },

    SET_LOADING: (state, isLoading) => {
      state.isLoading = isLoading;
    },

    RESET_STATE: (state) => {
      Object.assign(state, defaultState());
    },
  };
}
