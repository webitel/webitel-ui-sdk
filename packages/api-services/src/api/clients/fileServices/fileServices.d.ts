import type { SearchFilesByCallParams } from '@webitel/api-services/gen/models';
export declare const FileServicesAPI: {
	getList: (params: { search?: string }) => Promise<{
		items: any;
		next: any;
	}>;
	delete: (id: any) => Promise<any>;
	getScreenRecordingsByUser: (params: {
		userId: string;
		search?: string;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	deleteScreenRecordingsByUser: ({
		userId,
		id,
	}: {
		userId: any;
		id: any;
	}) => Promise<any>;
	getScreenRecordingsByAgent: (params: {
		agentId: string;
		search?: string;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	deleteScreenRecordingsByAgent: ({
		agentId,
		id,
	}: {
		agentId: any;
		id: any;
	}) => Promise<any>;
	getListByCall: (
		params: SearchFilesByCallParams & {
			callId: string;
		},
	) => Promise<{
		items: any;
		next: any;
	}>;
};
