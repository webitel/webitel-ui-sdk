import {
  AdminSections,
  CrudAction,
  WtApplication,
  WtObject,
} from '../../../enums';
import { CrudGlobalAction } from './enums';
import type {
  AppVisibilityMap,
  GlobalAccessApiResponseItem,
  GlobalAction,
  GlobalActionAccessMap,
  ScopeAccessApiResponseItem,
  ScopeAccessMap,
  SectionVisibilityMap,
  UiSection,
  VisibilityAccess,
} from './UserAccess.d.ts';

/**
 * @internal
 * @description
 * backend -> frontend
 * */
const castGlobalActionToCrudAction = (
  globalAction: GlobalAction,
): CrudAction | null => {
  if (globalAction === CrudGlobalAction.Write) {
    return CrudAction.Update;
  } else if (globalAction === CrudGlobalAction.Read) {
    return CrudAction.Read;
  } else if (globalAction === CrudGlobalAction.Delete) {
    return CrudAction.Delete;
  } else if (globalAction === CrudGlobalAction.Add) {
    return CrudAction.Create;
  }

  return null;
};

export const makeGlobalAccessMap = (
  rawGlobalAccess: GlobalAccessApiResponseItem[],
): GlobalActionAccessMap => {
  return rawGlobalAccess.reduce((map, { id }) => {
    const key = castGlobalActionToCrudAction(id) || id;
    return map.set(key, true);
  }, new Map());
};

export const makeScopeAccessMap = (
  rawScope: ScopeAccessApiResponseItem[],
): ScopeAccessMap => {
  return rawScope.reduce((scopeAccessMap, { class: scopeClass, access }) => {
    const objectAccessMap = access
      .split('')
      .reduce((scopeObjectAccessMap, token) => {
        if (token === 'r') {
          return scopeObjectAccessMap.set(CrudAction.Read, true);
        } else if (token === 'w') {
          return scopeObjectAccessMap.set(CrudAction.Update, true);
        } else if (token === 'd') {
          return scopeObjectAccessMap.set(CrudAction.Delete, true);
        } else if (token === 'x') {
          return scopeObjectAccessMap.set(CrudAction.Create, true);
        }
      }, new Map());

    return scopeAccessMap.set(scopeClass, objectAccessMap);
  }, new Map());
};

export const makeAppVisibilityMap = (
  rawVisibility: VisibilityAccess,
): AppVisibilityMap => {
  return Object.keys(rawVisibility).reduce((map, app) => {
    return map.set(app, true);
  }, new Map());
};

export const makeSectionVisibilityMap = (
  rawVisibility: VisibilityAccess,
): SectionVisibilityMap => {
  return Object.values(rawVisibility).reduce((map, section) => {
    if (section.startsWith('_')) return map; // skip private field
    return map.set(section, true);
  }, new Map());
};

// todo
export const castUiSectionToWtObject = (section: UiSection): WtObject => {
  const map = {
    ['AdminSections...']: WtObject.Agent,
    // todo
  };

  return map[section];
};

export const getWtAppByUiSection = (section: UiSection): WtApplication => {
  // todo
  if (AdminSections[section]) {
    return WtApplication.Admin;
  }
  // todo
};
