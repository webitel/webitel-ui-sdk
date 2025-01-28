import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { CrudAction, type WtApplication, type WtObject } from '../../../enums';
import type { SpecialGlobalAction } from './enums';
import type {
  AppVisibilityMap,
  CreateUserAccessStoreConfig,
  CreateUserAccessStoreRawAccess,
  GlobalActionAccessMap,
  ScopeAccessMap,
  SectionVisibilityMap,
  UiSection,
  UserAccessStore,
} from './UserAccess.d.ts';
import {
  castUiSectionToWtObject,
  getWtAppByUiSection,
  makeAppVisibilityMap,
  makeGlobalAccessMap,
  makeScopeAccessMap,
  makeSectionVisibilityMap,
} from './utils';

export const createUserAccessStore = ({
  namespace = 'userinfo',
  useManualRouteGuards = false,
}: CreateUserAccessStoreConfig = {}) => {
  return defineStore(`${namespace}/access`, (): UserAccessStore => {
    const router = useRouter();

    let globalAccess: GlobalActionAccessMap = new Map();

    let scopeAccess: ScopeAccessMap = new Map();

    let appVisibilityAccess: AppVisibilityMap = new Map();

    let sectionVisibilityAccess: SectionVisibilityMap = new Map();

    const hasAccess = (
      action: CrudAction | SpecialGlobalAction,
      object?: WtObject,
    ) => {
      return (
        globalAccess.get(action) ||
        (object && scopeAccess.get(object).get(action))
      );
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

    const hasSectionVisibility = (section: UiSection) => {
      const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = castUiSectionToWtObject(section);
      return (
        hasReadAccess() ||
        [
          hasApplicationVisibility(appOfSection),
          hasReadAccess(objectOfSection),
          sectionVisibilityAccess.get(section),
        ].every((v) => v)
      );
    };

    const setupRouteGuards = () => {
      router.beforeEach((to, from, next) => {
        /* findLast because "matched" has top=>bottom order */
        const uiSection = to.matched.findLast(({ meta }) => meta.UiSection)
          ?.meta?.UiSection as UiSection;

        if (uiSection && !hasSectionVisibility(uiSection)) {
          return;
        }

        next();
      });
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

      if (!useManualRouteGuards) {
        setupRouteGuards();
      }
    };

    return {
      initialize,
      setupRouteGuards,

      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,

      hasApplicationVisibility,
      hasSectionVisibility,
    };
  });
};
