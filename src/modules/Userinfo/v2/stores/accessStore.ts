import { defineStore } from 'pinia';
import { ref } from 'vue';
import { NavigationGuard } from 'vue-router';

import {
  CrudAction,
  type WtApplication,
  type WtObject,
} from '../../../../enums';
import type { SpecialGlobalAction } from '../enums';
import {
  getWtAppByUiSection,
  makeAppVisibilityMap,
  makeGlobalAccessMap,
  makeScopeAccessMap,
  makeSectionVisibilityMap,
} from '../scripts/utils';
import type {
  AppVisibilityMap,
  CreateUserAccessStoreConfig,
  CreateUserAccessStoreRawAccess,
  GlobalActionAccessMap,
  ScopeAccessMap,
  SectionVisibilityMap,
  UiSection,
  UserAccessStore,
} from '../types/UserAccess.d.ts';

export const createUserAccessStore = ({
  namespace = 'userinfo',
}: CreateUserAccessStoreConfig = {}) => {
  return defineStore(`${namespace}/access`, (): UserAccessStore => {
    const globalAccess = ref<GlobalActionAccessMap>(new Map());

    const scopeAccess = ref<ScopeAccessMap>(new Map());

    const appVisibilityAccess = ref<AppVisibilityMap>(new Map());

    const sectionVisibilityAccess = ref<SectionVisibilityMap>(new Map());

    // Bypass mode for when no access data exists (new projects)
    const bypassMode = ref<boolean>(false);

    const checkAppAccess = (object: WtObject) => {
      return (
        !scopeAccess.value.has(object) ||
        scopeAccess.value.get(object)?._enabled
      );
    };

    const hasAccess = (
      action: CrudAction | SpecialGlobalAction,
      object?: WtObject,
    ) => {
      const allowGlobalAccess = globalAccess.value.get(action);
      if (allowGlobalAccess) return true;

      const allowScopeAccess =
        object && scopeAccess.value.get(object)?.get(action as CrudAction);
      if (allowScopeAccess) return true;

      return false;
    };

    const hasReadAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Read, object);
    };

    const hasCreateAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Create, object);
    };

    const hasUpdateAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Update, object);
    };

    const hasDeleteAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Delete, object);
    };

    const hasApplicationVisibility = (app: WtApplication) => {
      return appVisibilityAccess.value.get(app);
    };

    const hasSectionVisibility = (section: UiSection, object: WtObject) => {
      if (bypassMode.value) return true;

      const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = object; /*castUiSectionToWtObject(section)*/
      const hasSectionVisibilityAccess = (section: UiSection) => {
        return sectionVisibilityAccess.value.get(section);
      };

      const allowAppVisibility = hasApplicationVisibility(appOfSection);
      const allowObjectAccess = hasReadAccess(objectOfSection);
      const allowSectionVisibility = hasSectionVisibilityAccess(section);

      return allowAppVisibility && allowObjectAccess && allowSectionVisibility;
    };

    const routeAccessGuard: NavigationGuard = (to) => {
      /* find last because "matched" has top=>bottom routes order */
      let uiSection = to.matched
        .toReversed()
        .find(({ meta }) => meta.UiSection)?.meta?.UiSection as UiSection | ((RouteLocationNormalized) => UiSection);
      /* find last because "matched" has top=>bottom routes order */
      let wtObject = to.matched
        .toReversed()
        .find(({ meta }) => meta.UiSection)?.meta?.WtObject as WtObject | ((RouteLocationNormalized) => WtObject);

      // if, then compute fn
      if (typeof uiSection === 'function') {
        uiSection = uiSection(to);
      }
      // if, then compute fn
      if (typeof wtObject === 'function') {
        wtObject = wtObject(to);
      }

      if (uiSection && !hasSectionVisibility(uiSection, wtObject)) {
        // return false;
        return { path: '/access-denied' };
      }

      return true;
    };


    const hasSpecialGlobalActionAccess = (id: SpecialGlobalAction): boolean => {
      return !!globalAccess.value.get(id);
    };

    const initialize = ({
      permissions: rawGlobalAccess,
      scope: rawScopeAccess,
      access: rawVisibilityAccess,
    }: CreateUserAccessStoreRawAccess) => {
      // Enable bypass mode if access data is null/undefined
      // bypassMode.value = rawVisibilityAccess === null;

      globalAccess.value = makeGlobalAccessMap(rawGlobalAccess);
      scopeAccess.value = makeScopeAccessMap(rawScopeAccess);
      appVisibilityAccess.value = makeAppVisibilityMap(rawVisibilityAccess);
      sectionVisibilityAccess.value = makeSectionVisibilityMap(rawVisibilityAccess);
    };

    return {
      initialize,

      checkAppAccess,
      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,
      hasSectionVisibility,

      routeAccessGuard,
      hasSpecialGlobalActionAccess,

      /**
       * @internal
       * for pinia devtools debug
      */
      globalAccess,
      scopeAccess,
      appVisibilityAccess,
      sectionVisibilityAccess,
    };
  });
};
