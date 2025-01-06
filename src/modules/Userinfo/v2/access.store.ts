import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import {
  AppVisibilityMap,
  CreateUserAccessStoreConfig,
  CreateUserAccessStoreRawAccess,
  CrudAction,
  GlobalActionAccessMap,
  ScopeAccessMap,
  SectionVisibilityMap,
  SpecialGlobalAction,
  UiSection,
  WtApplication,
  WtObject,
} from './UserAccess.types.ts';
import {
  castUiSectionToWtObject,
  getWtAppByUiSection,
  makeAppVisibilityMap,
  makeGlobalAccessMap,
  makeScopeAccessMap,
  makeSectionVisibilityMap,
} from './utils.ts';

export const createUserAccessStore = ({
                                        permissions: rawGlobalAccess,
                                        scope: rawScopeAccess,
                                        access: rawVisibilityAccess,
                                      }: CreateUserAccessStoreRawAccess,
                                      {
                                        namespace = 'userinfo',
                                        setupRouteGuards = true,
                                      }: CreateUserAccessStoreConfig) => {

  return defineStore(`${namespace}/access`, () => {
    const globalAccess: GlobalActionAccessMap = makeGlobalAccessMap(rawGlobalAccess);
    const scopeAccess: ScopeAccessMap = makeScopeAccessMap(rawScopeAccess);
    const appVisibilityAccess: AppVisibilityMap = makeAppVisibilityMap(rawVisibilityAccess);
    const sectionVisibilityAccess: SectionVisibilityMap = makeSectionVisibilityMap(rawVisibilityAccess);

    const hasAccess = (action: CrudAction | SpecialGlobalAction, object?: WtObject) => {
      return globalAccess.get(action) || (object && scopeAccess.get(object).get(action));
    };

    const hasReadAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Read, object);
    };

    const hasCreateAccess = () => {
      // todo
    };
    const hasEditAccess = () => {
      // todo
    };
    const hasDeleteAccess = () => {
      // todo
    };

    const hasApplicationVisibility = (app: WtApplication) => {
      return hasReadAccess() || appVisibilityAccess.get(app);
    };

    const hasSectionVisibility = (section: UiSection) => {
      const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = castUiSectionToWtObject(section);
      return hasReadAccess() ||
        [
          hasApplicationVisibility(appOfSection),
          hasReadAccess(objectOfSection),
          sectionVisibilityAccess.get(section),
        ].every((v) => v);
    };

    if (setupRouteGuards) {
      const router = useRouter();
      router.beforeEach((to, from, next) => {
        const wtObject = to.meta.WtObject;

        if (wtObject && !hasSectionVisibility(wtObject)) {
          return;
        }

        next();
      });
    }

    return {
      hasReadAccess,
      hasCreateAccess,
      hasEditAccess,
      hasDeleteAccess,

      hasApplicationVisibility,
      hasSectionVisibility,
    };
  });
};
