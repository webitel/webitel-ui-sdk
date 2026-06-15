export const DefaultWorkspaceTabSettings = {
	GeneralInfo: 'general_info',
	ClientInfo: 'client_info',
	KnowledgeBase: 'knowledge_base',
	TaskProcessing: 'task_processing',
	Flows: 'flows',
	Screenshots: 'screenshots',
} as const;

export type DefaultWorkspaceTabSettings =
	(typeof DefaultWorkspaceTabSettings)[keyof typeof DefaultWorkspaceTabSettings];
