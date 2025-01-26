/**
 * @augments WtApplication
 * represents ui sections in Admin WtApplication
 * without any relation to WtObjects (?)
 */
export const AdminSections = {
  Agents: 'agents',
  Blacklist: 'blacklist',
  Buckets: 'buckets',
  Calendars: 'calendars',
  Changelogs: 'changelogs',
  ChatGateways: 'chat-gateways',
  Chatplan: 'chatplan',
  CognitiveProfiles: 'cognitive-profiles',
  Communications: 'communications',
  Configuration: 'configuration',
  Dialplan: 'dialplan',
  Devices: 'devices',
  EmailProfiles: 'email-profiles',
  Flow: 'flow',
  Gateways: 'gateways',
  GlobalVariables: 'global-variables',
  ImportCsv: 'import-csv',
  License: 'license',
  Media: 'media',
  Members: 'members',
  Objects: 'objects',
  PauseCause: 'pause-cause',
  PauseTemplates: 'pause-templates',
  Queues: 'queues',
  Regions: 'regions',
  ResourceGroups: 'resource-groups',
  Resources: 'resources',
  Roles: 'roles',
  ShiftTemplates: 'shift-templates',
  SingleSignOn: 'single-sign-on',
  Skills: 'skills',
  Storage: 'storage',
  StoragePolicies: 'storage-policies',
  Teams: 'teams',
  Triggers: 'triggers',
  Users: 'users',
  WorkingConditions: 'working-conditions',
} as const;

export type AdminSections = (typeof AdminSections)[keyof typeof AdminSections];
