export declare const MessagesServiceAPI: {
    patch: (changes: any) => Promise<any>;
    getChatHistory: ({ chatId, ...params }: {
        [x: string]: any;
        chatId: any;
    }) => Promise<{
        messages: any;
        peers: any;
        next: any;
    }>;
};
