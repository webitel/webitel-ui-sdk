/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
/**
 * Enum to define types of case communications.

 - NO_TYPE: Default value, no type specified.
 - COMMUNICATION_CHAT: Communication type: Chat.
 - COMMUNICATION_CALL: Communication type: Call.
 - COMMUNICATION_EMAIL: Communication type: Email.
 */
export type CasesCaseCommunicationsTypes = (typeof CasesCaseCommunicationsTypes)[keyof typeof CasesCaseCommunicationsTypes];
export declare const CasesCaseCommunicationsTypes: {
    readonly NO_TYPE: "NO_TYPE";
    readonly COMMUNICATION_CHAT: "COMMUNICATION_CHAT";
    readonly COMMUNICATION_CALL: "COMMUNICATION_CALL";
    readonly COMMUNICATION_EMAIL: "COMMUNICATION_EMAIL";
};
