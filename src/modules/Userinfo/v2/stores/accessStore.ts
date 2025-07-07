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
      return hasReadAccess() || appVisibilityAccess.get(app);
    };

    const hasSectionVisibility = (section: UiSection, object: WtObject) => {
      const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = object; /*castUiSectionToWtObject(section)*/
      const hasSectionVisibilityAccess = (section: UiSection) => {
        return sectionVisibilityAccess.get(section);
      };

      // Condition 1: Check for application-level visibility.
      const allowAppVisibility = hasApplicationVisibility(appOfSection);
      // Condition 2: Check for 'Read (Select)' access on the specific object.
      const allowObjectAccess = hasReadAccess(objectOfSection);
      // Condition 3: Check for direct visibility grant for the section itself.
      const allowSectionVisibility = hasSectionVisibilityAccess(section);

      // The user must satisfy all three conditions to see the section.
      return allowAppVisibility && allowObjectAccess && allowSectionVisibility;
    };

     // A Vue Router navigation guard that protects routes based on section visibility.
     // It inspects the route's metadata to find the required UI section
     // and checks for access using `hasSectionVisibility`.
     // If access is denied, it redirects to the '/access-denied' page.
    const routeAccessGuard: NavigationGuard = (to) => {
      // Find the first matched route (from child to parent) that has section metadata.
      const matchedRoute = to.matched
        .toReversed()
        .find(({ meta }) => meta.UiSection || meta.paramForSectionName);

      const wtObject = to.matched
        .toReversed()
        .find(({ meta }) => meta.UiSection)?.meta?.WtObject as WtObject;
      // If no route has section metadata, access is not restricted by this guard.
      if (!matchedRoute) {
        return true;
      }

      const { meta } = matchedRoute;

      // Determine the UI section from route metadata, supporting dynamic sections from params.
      const sectionParamName = meta.paramForSectionName as string | undefined;
      const uiSection = sectionParamName
        ? (to.params[sectionParamName] as UiSection)
        : (meta.UiSection as UiSection);

      // Check for permission. If the user doesn't have visibility or the section is invalid, deny access.
      if (!hasSectionVisibility(uiSection, wtObject) || !uiSection) {
        return { path: '/access-denied' };
      }

      // If all checks pass, allow navigation.
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
