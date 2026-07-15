/**
 * @summary Search threads with filters
 */
export declare const ThreadManagementSearchQueryParams: any;
export declare const threadManagementSearchResponseItemsItemLastMsgReactedMetadataReactedByRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementSearchResponseItemsItemLastMsgSenderRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementSearchResponseItemsItemMembersItemRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementSearchResponseItemsItemTypeDefault = "UNKNOWN";
export declare const ThreadManagementSearchResponse: any;
export declare const ThreadManagementCreateBody: any;
export declare const threadManagementCreateResponseThreadLastMsgReactedMetadataReactedByRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementCreateResponseThreadLastMsgSenderRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementCreateResponseThreadMembersItemRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementCreateResponseThreadTypeDefault = "UNKNOWN";
export declare const ThreadManagementCreateResponse: any;
/**
 * @summary Search threads that the caller has left from
 */
export declare const ThreadManagementSearchLeftQueryParams: any;
export declare const threadManagementSearchLeftResponseItemsItemLastMsgReactedMetadataReactedByRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementSearchLeftResponseItemsItemLastMsgSenderRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementSearchLeftResponseItemsItemMembersItemRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementSearchLeftResponseItemsItemTypeDefault = "UNKNOWN";
export declare const ThreadManagementSearchLeftResponse: any;
/**
 * @summary Returns a single thread by its identifier.
 */
export declare const ThreadManagementGetParams: any;
export declare const ThreadManagementGetQueryParams: any;
export declare const threadManagementGetResponseLastMsgReactedMetadataReactedByRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementGetResponseLastMsgSenderRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementGetResponseMembersItemRoleDefault = "ROLE_UNSPECIFIED";
export declare const threadManagementGetResponseTypeDefault = "UNKNOWN";
export declare const ThreadManagementGetResponse: any;
/**
 * @summary Add member to the thread.
 */
export declare const ThreadManagementAddMemberParams: any;
export declare const threadManagementAddMemberBodyRoleDefault = "ROLE_UNSPECIFIED";
export declare const ThreadManagementAddMemberBody: any;
export declare const threadManagementAddMemberResponseMemberRoleDefault = "ROLE_UNSPECIFIED";
export declare const ThreadManagementAddMemberResponse: any;
/**
 * @summary Remove member from the thread.
 */
export declare const ThreadManagementRemoveMemberParams: any;
export declare const ThreadManagementRemoveMemberResponse: any;
/**
 * @summary Transfer unites add member and remove member.
It adds a new member to the thread and removes the initiator from the thread.
 */
export declare const ThreadManagementTransferParams: any;
export declare const threadManagementTransferBodyRoleDefault = "ROLE_UNSPECIFIED";
export declare const ThreadManagementTransferBody: any;
export declare const threadManagementTransferResponseMemberRoleDefault = "ROLE_UNSPECIFIED";
export declare const ThreadManagementTransferResponse: any;
/**
 * @summary Retrieves all variables for a specific thread.
 */
export declare const ThreadManagementLocateVariablesParams: any;
export declare const ThreadManagementLocateVariablesResponse: any;
/**
 * @summary Sets or updates variables for a specific thread.
Existing variables with the same keys will be overwritten if were setted by the caller.
New variables will be created if they do not exist.
 */
export declare const ThreadManagementSetVariablesParams: any;
export declare const ThreadManagementSetVariablesBody: any;
export declare const ThreadManagementSetVariablesResponse: any;
/**
 * @summary Removes specified variables from a thread with caller's permission.
If no keys are provided, all variables may be removed
depending on implementation.
 */
export declare const ThreadManagementFlushVariablesParams: any;
export declare const ThreadManagementFlushVariablesBody: any;
export declare const ThreadManagementFlushVariablesResponse: any;
/**
 * @summary Searches thread variables across multiple threads.
Supports pagination and field projection.
 */
export declare const ThreadManagementSearchVariablesQueryParams: any;
export declare const ThreadManagementSearchVariablesResponse: any;
