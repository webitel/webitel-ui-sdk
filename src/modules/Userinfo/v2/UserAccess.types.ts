import { AdminSections, WtObject } from '../../../enums';

export enum SupervisorSections {}

// todo

// todo ... app section enums

export type UiSection = AdminSections | SupervisorSections; // todo

export enum WtApplication {
  Supervisor = 'supervisor',
  Admin = 'admin',
  // todo
}

export enum CrudAction {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
}

export enum SpecialGlobalAction {
  Download = 'download',
  // todo
}

// backend, should be converted to CrudAction
export enum GlobalAccessCrudActionApiResponseItem {
  Read = 'read',
  Write = 'write',
  Delete = 'delete',
  Create = 'create',
}

// received from backend
export type GlobalAction =
  | GlobalAccessCrudActionApiResponseItem
  | SpecialGlobalAction;

// received from backend
export enum ScopeClass {
  Agent = 'cc_agent',
  Queue = 'cc_queue',
  Dictionaries = 'dictionaries',
  EmailProfile = 'email_profile',
  // todo
}

export interface GlobalAccessApiResponseItem {
  id: GlobalAction;
  name: string;
  usage: string;
}

export interface ScopeAccessApiResponseItem {
  class: ScopeClass;
  access: string;
}

export type VisibilityAccess = unknown;

export interface CreateUserAccessStoreRawAccess {
  permissions: GlobalAccessApiResponseItem[];
  scope: ScopeAccessApiResponseItem[];
  access: VisibilityAccess;
}

export interface CreateUserAccessStoreConfig {
  namespace: string;
  setupRouteGuards?: boolean;
}

export type GlobalActionAccessMap = Map<
  CrudAction | SpecialGlobalAction,
  boolean
>;

export type ScopeAccessMap = Map<WtObject, Map<CrudAction, boolean>>;

export type AppVisibilityMap = Map<WtApplication, boolean>;

export type SectionVisibilityMap = Map<UiSection, boolean>;
