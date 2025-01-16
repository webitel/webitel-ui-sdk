export enum WtApplication {
  Supervisor = 'supervisor',
  Admin = 'admin',
  Agent = 'agent',
  Audit = 'audit',
  History = 'history',
  CRM = 'crm',
  Grafana = 'grafana',
}

export enum AdminSections {
  Users = 'users',
  Devices = 'devices',
  Licenses = 'licenses',
  FlowSchemas = 'flowSchemas',
  Dialplans = 'dialplans',
  Gateways = 'gateways',
  Chatplans = 'chatplans',
  ChatGateways = 'chatGateways',
  AgentSkills = 'agentSkills',
  Buckets = 'buckets',
  Lists = 'lists',
  Locations = 'locations',
  Calendars = 'calendars',
  CommunicationTypes = 'communicationTypes',
  AgentStatuses = 'agentStatuses',
  MediaFiles = 'mediaFiles',
  Agents = 'agents',
  Teams = 'teams',
  Resources = 'resources',
  ResourceGroups = 'resourceGroups',
  Queues = 'queues',
  Storage = 'storage',
  CognitiveProfiles = 'cognitiveProfiles',
  EmailProfiles = 'emailProfiles',
  ImportsFromCcvFromFiles = 'importsFromCcvFromFiles',
  Triggers = 'triggers',
  Roles = 'roles',
  Objects = 'objects',
  ChangeLog = 'changelog',
  Configuration = 'configuration',
  GlobalVariables = 'globalVariables',
}

export enum SupervisorSections {
  Queues = 'queues',
  Agents = 'agents',
  ActiveCalls = 'activeCalls',
}
export enum AuditSections {
  Scorecards = 'scorecards',
}

export enum CrmSections {
  Contacts = 'contacts',
}

// no sections
export enum HistorySections {}
export enum AgentSections {}

export type UiSection =
  | AdminSections
  | SupervisorSections
  | AuditSections
  | CrmSections
  | HistorySections;

// wt system objects
export enum WtObject {
  Licenses = 'licenses',
  Users = 'users',
  Devices = 'devices',
  FlowSchemas = 'flowSchemas',
  Dialplans = 'dialplans',
  Gateways = 'gateways',
  Chatplans = 'chatplans',
  ChatGateways = 'chatGateways',
  AgentSkills = 'agentSkills',
  Buckets = 'buckets',
  Lists = 'lists',
  Locations = 'locations',
  Calendars = 'calendars',
  CommunicationTypes = 'communicationTypes',
  AgentStatuses = 'agentStatuses',
  MediaFiles = 'mediaFiles',
  Agents = 'agents',
  Teams = 'teams',
  Resources = 'resources',
  ResourceGroups = 'resourceGroups',
  Queues = 'queues',
  Storage = 'storage',
  CognitiveProfiles = 'cognitiveProfiles',
  EmailProfiles = 'emailProfiles',
  ImportsFromCcvFromFiles = 'importsFromCcvFromFiles',
  Triggers = 'triggers',
  Roles = 'roles',
  Objects = 'objects',
  ChangeLog = 'changelog',
  Configuration = 'configuration',
  GlobalVariables = 'globalVariables',
  ActiveCalls = 'activeCalls',
  Scorecards = 'scorecards',
  Contacts = 'contacts',
}

export enum CrudAction {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
}

export enum SpecialGlobalAction {
  PlaybackRecordFile = 'playbackRecordFile',
  ManageUserLicense = 'manageUserLicense',
  SchemeVariables = 'schemeVariables',
  SystemSetting = 'systemSetting',
  ManageUserRoles = 'manageUserRoles',
  ExportDataGrid = 'exportDataGrid',
  ViewCdrPhoneNumbers = 'viewCdrPhoneNumbers',
  ChangeUserPassword = 'changeUserPassword',
  EavesdropCall = 'eavesdropCall',
}

// backend, should be converted to CrudAction
export enum GlobalAccessCrudActionApiResponseItem {
  Read = 'read',
  Write = 'write',
  Delete = 'delete',
  Add = 'add',
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
  namespace?: string;
  setupRouteGuards?: boolean;
}

export type GlobalActionAccessMap = Map<
  CrudAction | SpecialGlobalAction,
  boolean
>;

export type ScopeAccessMap = Map<WtObject, Map<CrudAction, boolean>>;

export type AppVisibilityMap = Map<WtApplication, boolean>;

export type SectionVisibilityMap = Map<UiSection, boolean>;
