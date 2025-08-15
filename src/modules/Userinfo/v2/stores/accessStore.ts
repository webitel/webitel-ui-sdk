import { defineStore } from 'pinia';
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
    let globalAccess: GlobalActionAccessMap = new Map();

    let scopeAccess: ScopeAccessMap = new Map();

    let appVisibilityAccess: AppVisibilityMap = new Map();

    let sectionVisibilityAccess: SectionVisibilityMap = new Map();

    const hasAccess = (
      action: CrudAction | SpecialGlobalAction,
      object?: WtObject,
    ) => {
      const allowGlobalAccess = globalAccess.get(action);
      if (allowGlobalAccess) return true;

      const allowScopeAccess =
        object && scopeAccess.get(object)?.get(action as CrudAction);
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
      return appVisibilityAccess.get(app);
    };

    const hasSectionVisibility = (section: UiSection, object: WtObject) => {
      const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = object; /*castUiSectionToWtObject(section)*/
      const hasSectionVisibilityAccess = (section: UiSection) => {
        return sectionVisibilityAccess.get(section);
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
      return !!globalAccess.get(id);
    };

    const initialize = ({
      permissions: rawGlobalAccess,
      scope: rawScopeAccess,
      access: rawVisibilityAccess,
    }: CreateUserAccessStoreRawAccess) => {
      globalAccess = makeGlobalAccessMap(rawGlobalAccess);
      scopeAccess = makeScopeAccessMap(rawScopeAccess);
      appVisibilityAccess = makeAppVisibilityMap(rawVisibilityAccess);
      sectionVisibilityAccess = makeSectionVisibilityMap(rawVisibilityAccess);
    };

    return {
      initialize,

      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,

      routeAccessGuard,
      hasSpecialGlobalActionAccess,
    };
  });
};
