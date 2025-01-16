import createUserInfoStore from './userinfo.store';
import { WtApplication } from './UserAccess.types';
import { AxiosInstance } from 'axios';
// Тут все якось не дуже правильно точки зору логіки....
// Якщо викликати useUserInfo без initializeUserInfoStore - кинеться помилка - все правильно
// Якщо викликати useUserInfo із initializeUserInfoStore - помилки не буде але в userStor не зареєструється стейт.
// Щоб все працювало правильно треба спочатку викликати в main.ts initializeUserInfoStore потім initializeUserSession також в main.ts...  І тільки тоді в компонентах використовувати useUserInfo

// TODO: З вищесказаного - потрібно переглянути логіку ініціалізації userInfo стору

let useUserInfoStore: ReturnType<Awaited<ReturnType<typeof createUserInfoStore>>> | undefined;
export const initializeUserInfoStore = async (app: WtApplication, instance: AxiosInstance) => {
  try {
    if (!useUserInfoStore) {
      const userStoreFactory = await createUserInfoStore(app, instance);
      useUserInfoStore = userStoreFactory();
    }
  } catch (error) {
    console.error('Initialize user info store fail', error);
    throw error;
  }
};

export const initializeUserSession = async () => {
  if (!useUserInfoStore) {
    throw new Error(
      'UserInfoStore has not been initialized. Call initializeUserInfoStore() first.',
    );
  }
  await useUserInfoStore.initializeUserSession();
};

export const useUserInfo = () => {
  if (!useUserInfoStore) {
    throw new Error(
      'UserInfoStore has not been initialized. Call initializeUserInfoStore() first.',
    );
  }
  return useUserInfoStore;
};
