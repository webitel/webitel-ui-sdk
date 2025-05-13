import { createPinia, setActivePinia, type StoreDefinition } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp, h } from 'vue';
import { createRouter, createWebHistory, type Router } from 'vue-router';

import { AdminSections, WtApplication, WtObject } from '../../../../../enums';
import { CrudGlobalAction } from '../../enums';
import { createUserAccessStore } from '../accessStore';

describe('AccessStore', () => {
  let router: Router;
  let useAccessStore: StoreDefinition;

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: () => h('div', 'home'),
        },
        {
          path: '/users',
          name: 'users',
          component: () => h('div', 'users'),
          meta: {
            WtObject: WtObject.User,
            UiSection: AdminSections.Users,
          },
        },
      ],
    });

    const pinia = createPinia();
    const app = createApp({});
    app.use(router);
    app.use(pinia);
    setActivePinia(pinia);
    useAccessStore = createUserAccessStore();
  });

  it('restricts route if no access', async () => {
    const { initialize, routeAccessGuard } = useAccessStore();
    router.beforeEach(routeAccessGuard);

    initialize({
      permissions: [],
      scope: [],
      access: {},
    });

    await router.push({ name: 'users' });

    /* because guard should not allow to navigate
    there since we pass empty permissions */
    expect(router.currentRoute.value.name).not.toBe('users');
  });

  it('allows route access if has global permission', async () => {
    const { initialize, routeAccessGuard } = useAccessStore();
    router.beforeEach(routeAccessGuard);

    initialize({
      permissions: [{ id: CrudGlobalAction.Read }],
      scope: [],
      access: {},
    });

    await router.push({ name: 'users' });
    expect(router.currentRoute.value.name).toBe('users');
  });

  it('allows route access if has scope permission, app visibility and section visibility', async () => {
    const { initialize, routeAccessGuard } = useAccessStore();
    router.beforeEach(routeAccessGuard);

    initialize({
      permissions: [],
      scope: [{ class: 'users', access: 'r' }],
      access: {
        [WtApplication.Admin]: {
          _enabled: true,
          [AdminSections.Users]: {
            _enabled: true,
          },
        },
      },
    });

    await router.push({ name: 'users' });
    expect(router.currentRoute.value.name).toBe('users');
  });

  it('restricts route access if has scope permission, app visibility, but no section visibility', async () => {
    const { initialize, routeAccessGuard } = useAccessStore();
    router.beforeEach(routeAccessGuard);

    initialize({
      permissions: [],
      scope: [{ class: 'users', access: 'r' }],
      access: {
        [WtApplication.Admin]: {
          _enabled: true,
          [AdminSections.Users]: {
            _enabled: false,
          },
        },
      },
    });

    await router.push({ name: 'users' });
    expect(router.currentRoute.value.name).not.toBe('users');
  });

  it('restricts route access if has scope permission, section visibility but no app visibility', async () => {
    const { initialize, routeAccessGuard } = useAccessStore();
    router.beforeEach(routeAccessGuard);

    initialize({
      permissions: [],
      scope: [{ class: 'users', access: 'r' }],
      access: {
        [WtApplication.Admin]: {
          _enabled: false,
          [AdminSections.Users]: {
            _enabled: true,
          },
        },
      },
    });

    await router.push({ name: 'users' });
    expect(router.currentRoute.value.name).not.toBe('users');
  });
});
