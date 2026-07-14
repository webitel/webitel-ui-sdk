export declare const DefaultWorkspaceTabSettings: {
	readonly GeneralInfo: 'general_info';
	readonly ClientInfo: 'client_info';
	readonly KnowledgeBase: 'knowledge_base';
	readonly TaskProcessing: 'task_processing';
	readonly Flows: 'flows';
	readonly Screenshots: 'screenshots';
};
export type DefaultWorkspaceTabSettings =
	(typeof DefaultWorkspaceTabSettings)[keyof typeof DefaultWorkspaceTabSettings];
