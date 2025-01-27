import invert from 'lodash/fp/invert';

import {
  AdminSections,
  AuditorSections,
  CrmSections,
  CrudAction,
  SupervisorSections,
  WtApplication,
  WtObject,
} from '../../../enums';
import { _wtUiLog as wtlog } from '../../../scripts/logger';
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
  }
  if (globalAction === CrudGlobalAction.Read) {
    return CrudAction.Read;
  }
  if (globalAction === CrudGlobalAction.Delete) {
    return CrudAction.Delete;
  }
  if (globalAction === CrudGlobalAction.Add) {
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
        }
        if (token === 'w') {
          return scopeObjectAccessMap.set(CrudAction.Update, true);
        }
        if (token === 'd') {
          return scopeObjectAccessMap.set(CrudAction.Delete, true);
        }
        if (token === 'x') {
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
  const map = new Map();

  Object.values(rawVisibility).forEach((appSectionsVisibility) => {
    Object.entries(appSectionsVisibility).forEach(([section, visibility]) => {
      if (section.startsWith('_')) return map; // skip private fields
      map.set(section, visibility._enabled);
    });
  });

  return map;
};

const WtObjectToUiSectionMap = {
  // todo
  [AdminSections.Users]: WtObject.User,
  [AdminSections.Agents]: WtObject.Agent,
};

const UiSectionToWtObjectMap = invert(WtObjectToUiSectionMap);

export const castUiSectionToWtObject = (section: UiSection): WtObject => {
  return UiSectionToWtObjectMap[section];
};

export const castWtObjectToUiSection = (object: WtObject): UiSection => {
  return WtObjectToUiSectionMap[object];
};

export const getWtAppByUiSection = (section: UiSection): WtApplication => {
  if (AdminSections[section]) {
    return WtApplication.Admin;
  }
  if (AuditorSections[section]) {
    return WtApplication.Audit;
  }
  if (CrmSections[section]) {
    return WtApplication.Crm;
  }
  if (SupervisorSections[section]) {
    return WtApplication.Supervisor;
  }
  wtlog.error({ module: 'modules/userinfo' })('Unknown section', section);
};
