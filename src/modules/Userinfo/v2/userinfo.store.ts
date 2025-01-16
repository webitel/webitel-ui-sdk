import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createUserAccessStore } from './access.store.js';
import { WtApplication } from './UserAccess.types.js';
import userinfoGenerator from '../api/userinfo.js';
import { AxiosInstance } from 'axios';

// import ApplicationsAccess from '@webitel/ui-sdk/src/modules/Userinfo/classes/ApplicationsAccess.js';

interface DefaultState {
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
}

type UseInfoSession = Omit<DefaultState, 'isLoading' | 'language'>;

const HOUR_LENGTH = 60 * 60 * 1000;

const defaultState = (): DefaultState => ({
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
});

export default async function createUserInfoStore(app: WtApplication, instance: AxiosInstance) {
  const userinfoAPI = userinfoGenerator(instance);
  const session = await userinfoAPI.getSession();
  const access = await userinfoAPI.getApplicationsAccess();

  const useUserAccess = createUserAccessStore(
    app,
    {
      permissions: session.permissions,
      scope: session.scope,
      access: access,
    },
    { namespace: 'userinfo' },
  );

  const {
    hasCreateAccess,
    hasReadAccess,
    hasEditAccess,
    hasDeleteAccess,
    hasSectionVisibility,
    hasApplicationVisibility,
  } = useUserAccess();

  return defineStore('userinfo', () => {
    const userInfo = ref<DefaultState>(defaultState());

    const setLoadingState = (isLoading: boolean) => {
      userInfo.value.isLoading = isLoading;
    };

    const resetUserInfoState = () => {
      userInfo.value = defaultState();
    };

    const logoutUser = async (authUrl = import.meta.env.VITE_AUTH_URL) => {
      if (!authUrl) throw new Error('No authUrl for LOGOUT provided');
      await userinfoAPI.logout();
      window.location.href = authUrl;
    };

    const setUserInfoState = async (session: UseInfoSession) => {
      resetUserInfoState();

      userInfo.value = { ...defaultState(), ...session };

      setLoadingState(false);
    };

    const initializeUserSession = async () => {
      try {
        const session = await userinfoAPI.getSession();
        if (session.expiresAt - Date.now() < HOUR_LENGTH) {
          await logoutUser();
          throw new Error(`Session expires soon ${session.expiresAt}`);
        }

        setUserInfoState(session);
      } catch (error) {
        throw new Error(`Failed to initialize user session: ${error}`);
      }
    };

    return {
      initializeUserSession,
      userInfo,

      hasCreateAccess,
      hasReadAccess,
      hasEditAccess,
      hasDeleteAccess,
      hasSectionVisibility,
      hasApplicationVisibility,
    };
  });
}
