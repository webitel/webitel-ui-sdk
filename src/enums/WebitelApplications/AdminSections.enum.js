/* eslint-disable no-multi-spaces */

const AdminSections = Object.freeze({
  // DIRECTORY
  LICENSE: 'license',                   // permissions: add
  USERS: 'users',                       // scope: users
  DEVICES: 'devices',                   // scope: devices

  // ROUTING
  FLOW: 'flow',                          // scope: flow
  DIALPLAN: 'dialplan',                  // scope: acr_routing
  GATEWAYS: 'gateways',                  // scope: gateways
  CHATPLAN: 'chatplan',                  // scope: acr_routing
  CHAT_GATEWAYS: 'chat-gateways',        // scope: chats

  // LOOKUPS
  BLACKLIST: 'blacklist',                // scope: cc_list
  REGIONS: 'regions',                    // scope: lookups
  CALENDARS: 'calendars',                // scope: calendars
  COMMUNICATIONS: 'communications',      // scope: lookups
  PAUSE_CAUSE: 'pause-cause',            // scope: lookups
  MEDIA: 'media',                        // scope: media_file

  // CONTACT CENTER
  SKILLS: 'skills',                     // scope: lookups
  AGENTS: 'agents',                      // scope: cc_agent
  BUCKETS: 'buckets',                    // scope: cc_bucket
  QUEUES: 'queues',                      // scope: cc_queue
  MEMBERS: 'members',                    // scope: cc_queue
  RESOURCE_GROUPS: 'resource-groups',    // scope: cc_resource_group
  RESOURCES: 'resources',               // scope: cc_resource
  TEAMS: 'teams',                       // scope: cc_team

  // INTEGRATIONS
  STORAGE: 'storage',                   // scope: storage_profile
  COGNITIVE_PROFILES: 'cognitive-profiles',  // scope: cognitive_profile
  EMAIL_PROFILES: 'email-profiles',  // scope: email_profile
  IMPORT_CSV: 'import-csv',

  // PERMISSIONS
  OBJECTS: 'objects',                // permissions: add
  ROLES: 'roles',                   // scope: roles
});

export default AdminSections;
