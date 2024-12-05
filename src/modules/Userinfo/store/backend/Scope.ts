// https://www.youtube.com/watch?v=_i6Bv96BaSc
type Permutations<T extends string, U extends string = T> = T extends any ? `${T}${Permutations<Exclude<U, T>>}` | T : never;

export type ScopeAccess = Permutations<'x' | 'r' | 'w' | 'd'>;
export enum ScopeClasses {
  USERS = 'users',
  DEVICES = 'devices',
  FLOW = 'flow',
  ACR_ROUTING = 'acr_routing',
  GATEWAYS = 'gateways',
  ACR_CHAT_PLAN = 'acr_chat_plan',
  CHATS = 'chats',
  DICTIONARIES = 'dictionaries',
  CC_LIST = 'cc_list',
  CALENDARS = 'calendars',
  REGIONS = 'regions',
  BUCKETS = 'buckets',
  COMMUNICATIONS = 'communications',
  PAUSE_CAUSE = 'pause_cause',
  MEDIA_FILE = 'media_file',
  CC_AGENT = 'cc_agent',
  CC_QUEUE = 'cc_queue',
  CC_RESOURCE_GROUP = 'cc_resource_group',
  CC_RESOURCE = 'cc_resource',
  CC_TEAM = 'cc_team',
  STORAGE_PROFILE = 'storage_profile',
  COGNITIVE_PROFILE = 'cognitive_profile',
  EMAIL_PROFILE = 'email_profile',
  SINGLE_SIGN_ON = 'single_sign_on',
  IMPORT_TEMPLATE = 'import_template',
  TRIGGER = 'trigger',
  SCHEMA = 'schema',
  CONTACTS = 'contacts',
  ROLES = 'roles',
}

export type ClassesScope = {
  id: number;
  class: ScopeClasses;
  access: ScopeAccess;
};
