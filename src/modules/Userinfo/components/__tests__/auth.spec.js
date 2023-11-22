import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import authAPI from '../../api/auth';
import userinfoAPI from '../../api/userinfo';
import Auth from '../the-auth.vue';
import UserinfoStoreModule from '../../store/UserinfoStoreModule';

import '../../../../../tests/mocks/localStorageMock';

localStorage.setItem('access-token', 'jest');

authAPI.setToken = vi.fn();
userinfoAPI.getSession = vi.fn(() => ({}));
userinfoAPI.getApplicationsAccess = vi.fn(() => ({}));

describe('Auth', () => {
  let store;
  let wrapper;
  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  });
  router.replace = vi.fn();

  const userinfo = new UserinfoStoreModule().getModule();
  beforeEach(() => {
    store = createStore({
      modules: { userinfo },
    });

    wrapper = shallowMount(Auth, {
      global: {
        plugins: [router, store],
      },
    });
  });

  it('renders a component', () => {
    expect(wrapper.classes('auth-wrap')).toBe(true);
  });

  it('sets token, gets session and opens app after auth token message emit', async () => {
    const accessToken = 'hello there';
    window.postMessage({ accessToken }, '*');
    await setTimeout(() => {
      expect(authAPI.setToken).toHaveBeenCalledWith(accessToken);
      expect(userinfoAPI.getSession).toHaveBeenCalled();
      expect(userinfoAPI.getApplicationsAccess).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalled();
    }, 100);
  });
});
