export const SupervisorSections = {
  Queues: 'queues',
  Agents: 'agents',
  ActiveCalls: 'activeCalls',
} as const;

export type SupervisorSections =
  (typeof SupervisorSections)[keyof typeof SupervisorSections];
