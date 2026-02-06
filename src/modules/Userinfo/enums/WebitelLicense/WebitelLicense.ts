export const WebitelLicense = {
	CallCenter: 'CALL_CENTER',
	CallManager: 'CALL_MANAGER',
	VoIPDevice: 'VOIP_DEVICE',
	Mobile: 'MOBILE',
	Email: 'EMAIL',
	Chat: 'CHAT',
	QualityAuditor: 'QUALITY_AUDITOR',
	CustomerService: 'CUSTOMER_SERVICE',
	CustomerPortal: 'CUSTOMER_PORTAL',
	WFM: 'WFM',
} as const;

export type WebitelLicense =
	(typeof WebitelLicense)[keyof typeof WebitelLicense];
