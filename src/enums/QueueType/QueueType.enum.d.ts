export declare const QueueType: {
    readonly OFFLINE_QUEUE: 0;
    readonly INBOUND_QUEUE: 1;
    readonly OUTBOUND_IVR_QUEUE: 2;
    readonly PREVIEW_DIALER: 3;
    readonly PROGRESSIVE_DIALER: 4;
    readonly PREDICTIVE_DIALER: 5;
    readonly CHAT_INBOUND_QUEUE: 6;
    readonly INBOUND_JOB_QUEUE: 7;
    readonly OUTBOUND_JOB_QUEUE: 8;
    readonly IM_CHAT_QUEUE: 9;
};
export type QueueType = (typeof QueueType)[keyof typeof QueueType];
export declare const QueueTypeName: {
    readonly OFFLINE_QUEUE: "offline";
    readonly INBOUND_QUEUE: "inbound";
    readonly OUTBOUND_IVR_QUEUE: "ivr";
    readonly PREVIEW_DIALER: "preview";
    readonly PROGRESSIVE_DIALER: "progressive";
    readonly PREDICTIVE_DIALER: "predictive";
    readonly CHAT_INBOUND_QUEUE: "inbound chat";
    readonly INBOUND_JOB_QUEUE: "task";
    readonly OUTBOUND_JOB_QUEUE: "outbound_task";
    readonly OUTBOUND_CALL: "outbound_call";
    readonly IM_CHAT_QUEUE: "im_chat";
    readonly NOT_IMPLEMENT: "NOT_IMPLEMENT";
};
export type QueueTypeName = (typeof QueueTypeName)[keyof typeof QueueTypeName];
