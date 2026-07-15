/**
 * @summary SendDocument delivers file attachments to the external chat partner.
 */
export declare const providerMessageServiceSendDocumentBodyTypeDefault =
	'PROVIDER_TYPE_UNSPECIFIED';
export declare const ProviderMessageServiceSendDocumentBody: any;
export declare const ProviderMessageServiceSendDocumentResponse: any;
/**
 * @summary SendImage delivers images to the external chat partner.
 */
export declare const providerMessageServiceSendImageBodyTypeDefault =
	'PROVIDER_TYPE_UNSPECIFIED';
export declare const ProviderMessageServiceSendImageBody: any;
export declare const ProviderMessageServiceSendImageResponse: any;
/**
 * @summary SendInteractive delivers a message with interactive UI elements (buttons, menus).
 */
export declare const ProviderMessageServiceSendInteractiveBody: any;
export declare const ProviderMessageServiceSendInteractiveResponse: any;
/**
 * @summary SendSystemMessage delivers a system event notification to the external chat partner.
The im-providers-service resolves the gate-specific template and renders it as text
before forwarding to the underlying provider (Facebook, WhatsApp, etc.).
 */
export declare const ProviderMessageServiceSendSystemMessageBody: any;
export declare const ProviderMessageServiceSendSystemMessageResponse: any;
/**
 * @summary SendText delivers a plain text message to the external chat partner.
 */
export declare const providerMessageServiceSendTextBodyTypeDefault =
	'PROVIDER_TYPE_UNSPECIFIED';
export declare const ProviderMessageServiceSendTextBody: any;
export declare const ProviderMessageServiceSendTextResponse: any;
