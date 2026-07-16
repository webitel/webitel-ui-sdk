export declare const WtApplication: {
	readonly Admin: 'admin';
	readonly Agent: 'agent';
	readonly Supervisor: 'supervisor';
	readonly History: 'history';
	readonly Audit: 'audit';
	readonly Analytics: 'grafana';
	readonly Crm: 'crm';
	readonly Wfm: 'wfm';
	readonly Meet: 'meet';
};
export type WtApplication = (typeof WtApplication)[keyof typeof WtApplication];
