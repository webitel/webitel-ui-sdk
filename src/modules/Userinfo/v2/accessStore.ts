import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { CrudAction, WtApplication, WtObject } from '../../../enums';
import { SpecialGlobalAction } from './enums';
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
      const router = useRouter();
      router.beforeEach((to, from, next) => {
        const wtObject = to.meta.WtObject;

        if (wtObject && !hasSectionVisibility(wtObject)) {
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
