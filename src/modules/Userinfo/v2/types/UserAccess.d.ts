import { NavigationGuard } from 'vue-router';

import type {
  AdminSections,
  AuditorSections,
  CrmSections,
  CrudAction,
  SupervisorSections,
  WtApplication,
  WtObject,
} from '../../../../enums';
import type {
  CrudGlobalAction,
  ScopeClass,
  SpecialGlobalAction,
} from '../enums';

/**
 * @description
 * Represents union of all Webitel web client applications/sections
 * */
export type UiSection =
  | AdminSections
  | AuditorSections
  | SupervisorSections
  | CrmSections;

/**
 * @internal
 * @description Received from backend
 * */
export type GlobalAction = CrudGlobalAction | SpecialGlobalAction;

/**
 * @internal
 * */
export interface GlobalAccessApiResponseItem {
  id: GlobalAction;
  name: string;
  usage: string;
}

/**
 * @internal
 * */
export interface ScopeAccessApiResponseItem {
  class: ScopeClass;
  access: string;
}

/**
 * @internal
 * @description
 * Represents admin->permissions->roles->access.
 * */
export type VisibilityAccess = unknown;

/**
 * @internal
 * @description
 * Represents raw access data, received from backend.
 * */
export interface CreateUserAccessStoreRawAccess {
  permissions: GlobalAccessApiResponseItem[];
  scope: ScopeAccessApiResponseItem[];
  access: VisibilityAccess;
}

/**
 * @internal
 */
export interface CreateUserAccessStoreConfig {
  /**
   * @default 'userinfo'
   * */
  namespace?: string;
}

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type GlobalActionAccessMap = Map<
  CrudAction | SpecialGlobalAction,
  boolean
>;

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type ScopeAccessMap = Map<WtObject, Map<CrudAction, boolean>>;

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type AppVisibilityMap = Map<WtApplication, boolean>;

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type SectionVisibilityMap = Map<UiSection, boolean>;

export interface UserAccessStore {
  initialize: (CreateUserAccessStoreRawAccess) => void;

  hasReadAccess: (object?: WtObject) => boolean;
  hasCreateAccess: (object?: WtObject) => boolean;
  hasUpdateAccess: (object?: WtObject) => boolean;
  hasDeleteAccess: (object?: WtObject) => boolean;

  routeAccessGuard: NavigationGuard;

  hasSpecialGlobalActionAccess: (id: SpecialGlobalAction) => boolean;

  // hasApplicationVisibility: (app: WtApplication) => boolean;
  // hasSectionVisibility: (section: UiSection) => boolean;
}
