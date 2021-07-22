import userinfo from '../api/userinfo';
import ApplicationsAccess from '../classes/ApplicationsAccess';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';

const defaultState = () => ({
  isLoading: true,
  domainId: 0,
  name: '',
  username: '',
  account: '',
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
  }

  getters = {
    THIS_APP: (state) => state.thisApp,
    // if no access[app] => accessed by default
    CHECK_APP_ACCESS: (state) => (app) => !state.access[app] || state.access[app]?._enabled,
    CHECK_OBJECT_ACCESS: (state, getters) => ({ name, route }) => {
      if (!state.access[getters.THIS_APP] || !state.access._enabled) return false;
      if (route) return getters.CHECK_OBJECT_ACCESS_BY_ROUTE(route);
      return getters.CHECK_OBJECT_ACCESS_BY_NAME(name);
    },
    CHECK_OBJECT_ACCESS_BY_NAME: (state, getters) => (name) => (
      state.access[getters.THIS_APP][name]?._enabled
    ),
    CHECK_OBJECT_ACCESS_BY_ROUTE: (state, getters) => (route) => {
      const accessKey = Object.keys(state.access[getters.THIS_APP]).find((object) => route.name.includes(object));
      return state.access[getters.THIS_APP][accessKey]?._enabled;
    },
  }

  actions = {
    REDIRECT_TO_AUTH: () => {}, // should be overridden with router.replace('/auth');
    BEFORE_OPEN_SESSION_HOOK: () => {},
    AFTER_OPEN_SESSION_HOOK: () => {},
    CONVERT_USER_SCOPE: (context, scope) => scope,
    CONVERT_USER_PERMISSIONS: (context, permissions) => permissions,

    OPEN_SESSION: async (context) => {
      await context.dispatch('BEFORE_OPEN_SESSION_HOOK');
      if (!localStorage.getItem('access-token')) {
        context.dispatch('REDIRECT_TO_AUTH');
        throw new Error('No access-token in localStorage');
      }
      const session = await userinfo.getSession();
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

    SET_APPLICATIONS_ACCESS: (context, access) => context.commit('SET_APPLICATIONS_ACCESS', access),

    SET_LOADING: (context, isLoading) => {
      context.commit('SET_LOADING', isLoading);
    },

    RESET_STATE: (context) => {
      context.commit('RESET_STATE');
    },
  }

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
  }
}
