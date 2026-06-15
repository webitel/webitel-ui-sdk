export const DefaultWorkspaceTab = {
	GeneralInfo: 'general_info',
	ClientInfo: 'client_info',
	KnowledgeBase: 'knowledge_base',
	TaskProcessing: 'task_processing',
	Flows: 'flows',
	Screenshots: 'screenshots',
} as const;

export type DefaultWorkspaceTab =
	(typeof DefaultWorkspaceTab)[keyof typeof DefaultWorkspaceTab];
