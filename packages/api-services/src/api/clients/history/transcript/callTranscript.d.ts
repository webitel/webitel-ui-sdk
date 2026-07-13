export declare const CallTranscriptAPI: {
	create: ({ callId }: { callId: any }) => Promise<any>;
	get: ({
		id,
		page,
		size,
	}: {
		id: any;
		page?: number;
		size?: number;
	}) => Promise<any>;
	delete: (item: any) => Promise<any>;
};
