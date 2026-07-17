export declare const ContactChatMessagesAPI: {
    getChat: ({ contactId, chatId }: {
        contactId: any;
        chatId: any;
    }) => Promise<{
        items: any;
        peers: any;
    }>;
    getAllMessages: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
};
