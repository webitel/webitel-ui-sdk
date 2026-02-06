/**
 * @description
 * backend `scope` field userinfo response classes
 * `class` represents a group of entities, managed by this one class
 */
export const ScopeClass = {
	/**
	 * Includes:
	 * - {@link WtObject.Agent}
	 * - {@link }
	 */
	Agent: 'cc_agent',
	Queue: 'cc_queue',
	Dictionaries: 'dictionaries',
	EmailProfile: 'email_profile',

	Skills: 'cc_skill',
	Users: 'users',
	Devices: 'devices',
	AcrRouting: 'acr_routing',
	Gateways: 'gateways',
	AcrChatPlan: 'acr_chat_plan',
	Chats: 'chats',
	List: 'cc_list',
	Calendars: 'calendars',
	Team: 'cc_team',
	ResourceGroup: 'cc_resource_group',
	Resource: 'cc_resource',
	StorageProfile: 'storage_profile',
	CognitiveProfile: 'cognitive_profile',
	SingleSignOn: 'single_sign_on',
	ImportTemplate: 'import_template',
	Trigger: 'trigger',
	Schema: 'schema',
	Role: 'roles',
	Contacts: 'contacts',
	MediaFile: 'media_file',
	Logger: 'logger',
	Calls: 'calls',
	RecordFile: 'record_file',
	ContactGroups: 'contact_groups',
	ChatBots: 'chat_bots',
	Cases: 'cases',
	CaseComments: 'case_comments',
	AuditForm: 'cc_audit_form',
	AuditRating: 'rating',
	PauseTemplates: 'pause_templates',
	ShiftTemplates: 'shift_templates',
	WorkingConditions: 'working_conditions',
	AgentWorkingConditions: 'agent_working_conditions',
	ListNumber: 'cc_list_number',
	CaseLookups: 'case_lookups',
	FilesPolicy: 'files_policy',
	PortalUsers: 'portal_users',
	Custom: 'custom',
} as const;

export type ScopeClass = (typeof ScopeClass)[keyof typeof ScopeClass];
