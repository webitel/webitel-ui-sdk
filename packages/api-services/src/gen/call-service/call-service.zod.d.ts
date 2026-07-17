/**
 * @summary CreateCall initiates a new outbound call with specified parameters.
 */
export declare const CreateCallBody: any;
export declare const CreateCallResponse: any;
/**
 * @summary SearchActiveCall returns a list of all calls currently in progress.
 */
export declare const SearchActiveCallQueryParams: any;
export declare const SearchActiveCallResponse: any;
/**
 * @summary HangupCall terminates an active call session.
 */
export declare const HangupCallParams: any;
export declare const HangupCallBody: any;
export declare const HangupCallResponse: any;
/**
 * @summary ReadCall returns detailed real-time information for a specific active call.
 */
export declare const ReadCallParams: any;
export declare const ReadCallQueryParams: any;
export declare const ReadCallResponse: any;
/**
 * @summary ConfirmPush confirms receipt of a push notification for synchronization.
 */
export declare const ConfirmPushParams: any;
export declare const ConfirmPushResponse: any;
/**
 * @summary DtmfCall sends DTMF digits to an active call.
 */
export declare const DtmfCallParams: any;
export declare const DtmfCallBody: any;
export declare const DtmfCallResponse: any;
/**
 * @summary EavesdropCall allows a supervisor to listen, whisper, or join an active call.
 */
export declare const EavesdropCallParams: any;
export declare const EavesdropCallBody: any;
export declare const EavesdropCallResponse: any;
/**
 * @summary HoldCall puts an active call on hold.
 */
export declare const HoldCallParams: any;
export declare const HoldCallBody: any;
export declare const HoldCallResponse: any;
/**
 * @summary BlindTransferCall redirects an active call to another destination.
 */
export declare const BlindTransferCallParams: any;
export declare const BlindTransferCallBody: any;
export declare const BlindTransferCallResponse: any;
/**
 * @summary UnHoldCall resumes a call from hold state.
 */
export declare const UnHoldCallParams: any;
export declare const UnHoldCallBody: any;
export declare const UnHoldCallResponse: any;
/**
 * @summary SetVariablesCall updates call channel variables in real-time.
 */
export declare const SetVariablesCallParams: any;
export declare const SetVariablesCallBody: any;
export declare const SetVariablesCallResponse: any;
/**
 * @summary SearchHistoryCall retrieves a list of completed calls using filters (GET).
Supports advanced filtering by participants, duration, causes, and custom variables.
 */
export declare const SearchHistoryCallQueryParams: any;
export declare const searchHistoryCallResponseItemsItemFilesItemTypeDefault = "file_type_empty";
export declare const searchHistoryCallResponseItemsItemFilesJobItemActionDefault = "undefined";
export declare const searchHistoryCallResponseItemsItemFilesJobItemStateDefault = "idle";
export declare const SearchHistoryCallResponse: any;
/**
 * @summary SearchHistoryCallPost retrieves a list of completed calls using a complex filter body (POST).
Ideal for large filter sets that exceed URL length limits.
 */
export declare const SearchHistoryCallPostBody: any;
export declare const searchHistoryCallPostResponseItemsItemFilesItemTypeDefault = "file_type_empty";
export declare const searchHistoryCallPostResponseItemsItemFilesJobItemActionDefault = "undefined";
export declare const searchHistoryCallPostResponseItemsItemFilesJobItemStateDefault = "idle";
export declare const SearchHistoryCallPostResponse: any;
/**
 * @summary AggregateHistoryCall performs statistical analysis on historical data.
Group and aggregate metrics like average duration, call counts, or peak hours.
 */
export declare const AggregateHistoryCallBody: any;
export declare const AggregateHistoryCallResponse: any;
/**
 * @summary CreateCallAnnotation adds a text note to a specific timeframe of a historical call.
 */
export declare const CreateCallAnnotationParams: any;
export declare const CreateCallAnnotationBody: any;
export declare const CreateCallAnnotationResponse: any;
/**
 * @summary DeleteCallAnnotation removes an annotation from a historical call.
 */
export declare const DeleteCallAnnotationParams: any;
export declare const DeleteCallAnnotationResponse: any;
/**
 * @summary UpdateCallAnnotation modifies an existing call note.
 */
export declare const UpdateCallAnnotationParams: any;
export declare const UpdateCallAnnotationBody: any;
export declare const UpdateCallAnnotationResponse: any;
/**
 * @summary RedialCall quickly initiates a new call using data from a previous history record.
 */
export declare const RedialCallParams: any;
export declare const RedialCallBody: any;
export declare const RedialCallResponse: any;
/**
 * @summary PatchHistoryCall updates metadata for a completed call (e.g., variables or visibility).
 */
export declare const PatchHistoryCallParams: any;
export declare const PatchHistoryCallBody: any;
export declare const patchHistoryCallResponseFilesItemTypeDefault = "file_type_empty";
export declare const patchHistoryCallResponseFilesJobItemActionDefault = "undefined";
export declare const patchHistoryCallResponseFilesJobItemStateDefault = "idle";
export declare const PatchHistoryCallResponse: any;
