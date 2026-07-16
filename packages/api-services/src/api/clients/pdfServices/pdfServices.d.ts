export declare const PdfServicesAPI: {
	createScreenrecordingExport: ({
		agentId,
		itemInstance,
	}: {
		agentId: any;
		itemInstance: any;
	}) => Promise<any>;
	getList: (params: { agentId: string }) => Promise<{
		items: any;
		next: any;
	}>;
	createCallExport: ({
		callId,
		itemInstance,
	}: {
		callId: any;
		itemInstance: any;
	}) => Promise<any>;
	listCallExports: (params: { callId: string }) => Promise<{
		items: any;
		next: any;
	}>;
	delete: (id: string) => Promise<any>;
};
