/**
 * @summary Sends a contact card.
 */
export declare const MessageSendContactBody: any;
export declare const MessageSendContactResponse: any;
/**
 * @summary SendDocument delivers a document message.
 */
export declare const MessageSendDocumentBody: any;
export declare const MessageSendDocumentResponse: any;
/**
 * @summary Sends an interactive message (buttons, lists, CTA).
Supports idempotency via send_id.
 */
export declare const MessageSendInteractiveBody: any;
export declare const MessageSendInteractiveResponse: any;
/**
 * @summary Handles user interaction callbacks.
Should be called by client when user interacts with UI.
 */
export declare const MessageSendInteractiveCallbackParams: any;
export declare const MessageSendInteractiveCallbackBody: any;
export declare const MessageSendInteractiveCallbackResponse: any;
/**
 * @summary Sends a geographic location message.
 */
export declare const MessageSendLocationBody: any;
export declare const MessageSendLocationResponse: any;
/**
 * @summary SendText delivers a plain text message.
We use the shared Request/Response types directly to avoid duplication.
 */
export declare const MessageSendTextBody: any;
export declare const MessageSendTextResponse: any;
/**
 * @summary Mark message as read by id.
 */
export declare const MessageReadParams: any;
export declare const MessageReadQueryParams: any;
export declare const MessageReadResponse: any;
