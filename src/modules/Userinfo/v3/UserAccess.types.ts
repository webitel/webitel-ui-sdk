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
  Licenses = 'license',

  FlowSchemas = 'flow',
  Dialplans = 'dialplan',
  Gateways = 'gateways',
  Chatplans = 'chatplan',
  ChatGateways = 'chat-gateways',

  Blacklist = 'blacklist',
  Regions = 'regions',
  Calendars = 'calendars',
  Communications = 'communications',
  PauseCause = 'pause-cause',
  Media = 'media',
  ShiftTemplates = 'shift-templates',
  PauseTemplates = 'pause-templates',
  WorkingConditions = 'working-conditions',

  Skills = 'skills',
  Agents = 'agents',
  Buckets = 'buckets',
  Queues = 'queues',
  Members = 'members',
  ResourceGroups = 'resource-groups',
  Resources = 'resources',
  Teams = 'teams',

  Storage = 'storage',
  CognitiveProfiles = 'cognitive-profiles',
  EmailProfiles = 'email-profiles',
  SingleSignOn = 'single-sign-on',
  ImportsCsv = 'import-csv',
  Triggers = 'triggers',

  Roles = 'roles',
  Objects = 'objects',

  ChangeLogs = 'changelogs',
  Configuration = 'configuration',
  GlobalVariables = 'global-variables',
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
  Users = 'users',
  Devices = 'devices',
  Licenses = 'license',
  FlowSchemas = 'flow',
  Dialplans = 'dialplan',
  Gateways = 'gateways',
  Chatplans = 'chatplan',
  ChatGateways = 'chat-gateways',
  Blacklist = 'blacklist',
  Regions = 'regions',
  Calendars = 'calendars',
  Communications = 'communications',
  PauseCause = 'pause-cause',
  Media = 'media',
  ShiftTemplates = 'shift-templates',
  PauseTemplates = 'pause-templates',
  WorkingConditions = 'working-conditions',
  Skills = 'skills',
  Agents = 'agents',
  Buckets = 'buckets',
  Queues = 'queues',
  Members = 'members',
  ResourceGroups = 'resource-groups',
  Resources = 'resources',
  Teams = 'teams',
  Storage = 'storage',
  CognitiveProfiles = 'cognitive-profiles',
  EmailProfiles = 'email-profiles',
  SingleSignOn = 'single-sign-on',
  ImportsCsv = 'import-csv',
  Triggers = 'triggers',
  Roles = 'roles',
  Objects = 'objects',
  ChangeLogs = 'changelogs',
  Configuration = 'configuration',
  GlobalVariables = 'global-variables',
  ActiveCalls = 'active-calls',
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
  Users = 'users',
  Devices = 'devices',
  // Flow = 'flow', Not sure if this is used
  AcrRouting = 'acr_routing',
  Gateways = 'gateways',
  AcrChatPlan = 'acr_chat_plan',
  Chats = 'chats',
  Dictionaries = 'dictionaries',
  CCList = 'cc_list',
  Calendars = 'calendars',
  CCAgent = 'cc_agent',
  CCQueue = 'cc_queue',
  CCTeam = 'cc_team',
  CCResourceGroup = 'cc_resource_group',
  CCResource = 'cc_resource',
  StorageProfile = 'storage_profile',
  CognitiveProfile = 'cognitive_profile',
  EmailProfile = 'email_profile',
  SingleSignOn = 'single_sign_on',
  ImportTemplate = 'import_template',
  Trigger = 'trigger',
  Schema = 'schema',
  Role = 'roles',
  Contacts = 'contacts',
  MediaFile = 'media_file',
  Logger = 'logger',
  Calls = 'calls',
  RecordFile = 'record_file',
  ContactGroups = 'contact_groups',
  ChatBots = 'chat_bots',
  Cases = 'cases',
  CaseComments = 'case_comments',
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
