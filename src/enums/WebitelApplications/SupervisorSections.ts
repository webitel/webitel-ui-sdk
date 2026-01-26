export const SupervisorSections = {
	Queues: 'queues',
	Agents: 'agents',
	ActiveCalls: 'active-calls',
} as const;

export type SupervisorSections =
	(typeof SupervisorSections)[keyof typeof SupervisorSections];
