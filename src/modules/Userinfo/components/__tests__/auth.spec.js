import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import JSDOM from 'jsdom';
import authAPI from '../../api/auth';
import userinfoAPI from '../../api/userinfo';
import Auth from '../the-auth.vue';
import UserinfoStoreModule from '../../store/UserinfoStoreModule';

import '../../../../../tests/mocks/localStorageMock';

localStorage.setItem('access-token', 'jest');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

authAPI.setToken = jest.fn();
userinfoAPI.getSession = jest.fn(() => ({}));
userinfoAPI.getApplicationsAccess = jest.fn(() => ({}));

describe('Auth', () => {
  let store;
  let wrapper;
  global.window = new JSDOM.JSDOM().window;
  const router = new VueRouter();
  router.replace = jest.fn();

  const userinfo = new UserinfoStoreModule().getModule();
  beforeEach(() => {
    store = new Vuex.Store({
      modules: { userinfo },
    });

    wrapper = shallowMount(Auth, {
      localVue,
      store,
      router,
    });
  });

  it('renders a component', () => {
    expect(wrapper.classes('auth-wrap')).toBe(true);
  });

  it('sets token, gets session and opens app after auth token message emit', async (done) => {
    const accessToken = 'hello there';
    window.postMessage({ accessToken }, '*');
    await setTimeout(() => {
      expect(authAPI.setToken).toHaveBeenCalledWith(accessToken);
      expect(userinfoAPI.getSession).toHaveBeenCalled();
      expect(userinfoAPI.getApplicationsAccess).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalled();
      done();
    }, 100);
  });
});
