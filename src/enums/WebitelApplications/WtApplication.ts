export const WtApplication = {
  Admin: 'admin',
  Agent: 'agent',
  Supervisor: 'supervisor',
  History: 'history',
  Audit: 'audit',
  Analytics: 'grafana',
  Crm: 'crm',
} as const;

export type WtApplication = (typeof WtApplication)[keyof typeof WtApplication];
