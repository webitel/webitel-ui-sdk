import type { AgentAbsenceServiceCreateAgentAbsenceBody, AgentAbsenceServiceSearchAgentsAbsencesParams } from '@webitel/api-services/gen/models';
export interface GetAgentAbsenceParams {
    agentId: string;
    itemId: string;
}
export interface AddAgentAbsenceParams {
    agentId: string;
    itemInstance: AgentAbsenceServiceCreateAgentAbsenceBody;
}
export interface UpdateAgentAbsenceParams {
    itemId: string;
    itemInstance: AgentAbsenceServiceCreateAgentAbsenceBody;
}
export interface DeleteAgentAbsenceParams {
    id: string;
    agentId: string;
}
export declare const AgentAbsenceAPI: {
    getList: (params: AgentAbsenceServiceSearchAgentsAbsencesParams) => Promise<{
        items: any;
        next: any;
    }>;
    get: ({ agentId, itemId: id, }: GetAgentAbsenceParams) => Promise<any>;
    add: ({ agentId, itemInstance, }: AddAgentAbsenceParams) => Promise<any>;
    update: ({ itemInstance, itemId, }: UpdateAgentAbsenceParams) => Promise<any>;
    delete: ({ id, agentId, }: DeleteAgentAbsenceParams) => Promise<any>;
    getLookup: (params: AgentAbsenceServiceSearchAgentsAbsencesParams) => Promise<{
        items: any;
        next: any;
    }>;
};
