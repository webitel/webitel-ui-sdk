export declare const AgentChatsAPI: {
    getList: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
    markChatProcessed: (chatId: any) => Promise<any>;
    getChatCount: (params: any) => Promise<any>;
};
