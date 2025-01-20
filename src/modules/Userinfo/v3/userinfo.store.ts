import { defineStore } from 'pinia';
import { ref } from 'vue';
import instance from '../../../app/api/instance';
import {
  AppVisibilityMap,
  CrudAction,
  GlobalAccessApiResponseItem,
  GlobalActionAccessMap,
  ScopeAccessApiResponseItem,
  ScopeAccessMap,
  SectionVisibilityMap,
  SpecialGlobalAction,
  UiSection,
  VisibilityAccess,
  WtApplication,
  WtObject,
} from './UserAccess.types';

import userinfoGenerator from '@webitel/ui-sdk/src/modules/Userinfo/api/userinfo.js';
import {
  castUiSectionToWtObject,
  makeAppVisibilityMap,
  makeGlobalAccessMap,
  makeScopeAccessMap,
  makeSectionVisibilityMap,
} from './utils';
import { useRouter } from 'vue-router';
// import ApplicationsAccess from '@webitel/ui-sdk/src/modules/Userinfo/classes/ApplicationsAccess.js';

interface DefaultUserInfoState {
  isLoading: boolean;
  dc: string;
  domain: string;
  domainId: number;
  name: string;
  username: string;
  account: string;
  preferredUsername: string;
  userId: number;
  roles: string[];
  license: string[];
  language: string;
  expiresAt: number;
  scope: ScopeAccessApiResponseItem[];
  permissions: GlobalAccessApiResponseItem[];
  access: VisibilityAccess;
}

interface DefaultUserAccessState {
  globalAccess: GlobalActionAccessMap;
  scopeAccess: ScopeAccessMap;
  appVisibilityAccess: AppVisibilityMap;
  sectionVisibilityAccess: SectionVisibilityMap;
}

type UserInfoSession = Omit<DefaultUserInfoState, 'isLoading' | 'language'>;

const HOUR_LENGTH = 60 * 60 * 1000;

const defaultUserInfoState = (): DefaultUserInfoState => ({
  isLoading: true,
  dc: '',
  domain: '',
  domainId: 0,
  name: '',
  username: '',
  account: '',
  preferredUsername: '',
  userId: 0,
  roles: [],
  license: [],
  language: localStorage.getItem('lang'),
  expiresAt: 0,
  scope: [],
  permissions: [],
  access: [],
});

const defaultUserAccessState = (): DefaultUserAccessState => ({
  globalAccess: new Map(),
  scopeAccess: new Map(),
  appVisibilityAccess: new Map(),
  sectionVisibilityAccess: new Map(),
});

export default function createUserInfoStore(
  currentApp: WtApplication,
  setupRouteGuards: boolean = true,
) {
  const userinfoAPI = userinfoGenerator(instance);

  return defineStore('userinfo', () => {
    const userInfo = ref<DefaultUserInfoState>(defaultUserInfoState());
    const userAccess = ref<DefaultUserAccessState>(defaultUserAccessState());

    const setLoadingState = (isLoading: boolean) => {
      userInfo.value.isLoading = isLoading;
    };

    const resetUserInfoState = () => {
      userInfo.value = defaultUserInfoState();
    };

    const logoutUser = async (authUrl = import.meta.env.VITE_AUTH_URL) => {
      if (!authUrl) throw new Error('No authUrl for LOGOUT provided');
      await userinfoAPI.logout();
      window.location.href = authUrl;
    };

    const setUserInfoState = (
      session: UserInfoSession,
      access: VisibilityAccess,
    ) => {
      resetUserInfoState();

      userInfo.value = { ...defaultUserInfoState(), ...session, access };

      setLoadingState(false);
    };

    const setUserAccessState = (
      session: UserInfoSession,
      access: VisibilityAccess,
    ) => {
      const globalAccess: GlobalActionAccessMap = makeGlobalAccessMap(
        session.permissions,
      );
      const scopeAccess: ScopeAccessMap = makeScopeAccessMap(session.scope);
      const appVisibilityAccess: AppVisibilityMap =
        makeAppVisibilityMap(access);
      const sectionVisibilityAccess: SectionVisibilityMap =
        makeSectionVisibilityMap(access);

      userAccess.value = {
        ...defaultUserAccessState(),
        globalAccess,
        scopeAccess,
        appVisibilityAccess,
        sectionVisibilityAccess,
      };
    };

    const initializeUserSession = async () => {
      try {
        const session = await userinfoAPI.getSession();

        if (session.expiresAt - Date.now() < HOUR_LENGTH) {
          await logoutUser();
          throw new Error(`Session expires soon ${session.expiresAt}`);
        }

        const access = await userinfoAPI.getApplicationsAccess();
        setUserInfoState(session, access);
        setUserAccessState(session, access);
      } catch (error) {
        throw new Error(`Failed to initialize user session: ${error}`);
      }
    };

    const hasAccess = (
      action: CrudAction | SpecialGlobalAction,
      object?: WtObject,
    ) => {
      return (
        userAccess.value.globalAccess.get(action) ||
        (object &&
          userAccess.value.scopeAccess.get(object) && // тут wtObject може бути відсутній бо не всі wtObject керуються scope Access
          userAccess.value.scopeAccess.get(object).get(action as CrudAction))
      );
    };

    const hasReadAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Read, object);
    };

    const hasCreateAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Create, object);
    };
    const hasEditAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Edit, object);
    };
    const hasDeleteAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Delete, object);
    };

    const hasApplicationVisibility = (app: WtApplication) => {
      return hasReadAccess() || userAccess.value.appVisibilityAccess.get(app);
    };

    const hasSectionVisibility = (section: UiSection) => {
      // const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = castUiSectionToWtObject(section, currentApp);
      console.log(objectOfSection);

      return (
        hasReadAccess() ||
        [
          hasApplicationVisibility(currentApp),
          hasReadAccess(objectOfSection),
          userAccess.value.sectionVisibilityAccess.get(section),
        ].every((v) => v)
      );
    };

    if (setupRouteGuards) {
      const router = useRouter();
      router.beforeEach((to, _from, next) => {
        const wtObject = to.meta.WtObject;

        if (wtObject && !hasSectionVisibility(wtObject as UiSection)) {
          next('/access-denied');
          console.error('Access Denied');
          return;
        }

        next();
      });
    }

    return {
      initializeUserSession,
      userInfo,
      userAccess,

      hasAccess,
      hasReadAccess,
      hasCreateAccess,
      hasEditAccess,
      hasDeleteAccess,
      hasApplicationVisibility,
      hasSectionVisibility,
      logoutUser,
    };
  });
}
