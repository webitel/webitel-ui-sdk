import createUserInfoStore from './userinfo.store';
import { WtApplication } from './UserAccess.types';

export async function initializeUserSession(app: WtApplication) {
  const useUserInfoStore = createUserInfoStore(app);
  const { initializeUserSession } = useUserInfoStore();

  await initializeUserSession();

  return { useUserInfoStore };
}
