import { FilterInitParams } from '../../../../types/Filters.types';

/**
 * Hangup causes to filter
 * @enum
 * @readonly
 */
export const HangupCauseOptions: Array<FilterInitParams> = [
  {
    name: 'UNSPECIFIED',
    value: 'UNSPECIFIED',
  },
  {
    name: 'UNALLOCATED_NUMBER',
    value: 'UNALLOCATED_NUMBER',
  },
  {
    name: 'NO_ROUTE_TRANSIT_NET',
    value: 'NO_ROUTE_TRANSIT_NET',
  },
  {
    name: 'NO_ROUTE_DESTINATION',
    value: 'NO_ROUTE_DESTINATION',
  },
  {
    name: 'CHANNEL_UNACCEPTABLE',
    value: 'CHANNEL_UNACCEPTABLE',
  },
  {
    name: 'CALL_AWARDED_DELIVERED',
    value: 'CALL_AWARDED_DELIVERED',
  },
  {
    name: 'NORMAL_CLEARING',
    value: 'NORMAL_CLEARING',
  },
  {
    name: 'USER_BUSY',
    value: 'USER_BUSY',
  },
  {
    name: 'NO_USER_RESPONSE',
    value: 'NO_USER_RESPONSE',
  },
  {
    name: 'NO_ANSWER',
    value: 'NO_ANSWER',
  },
  {
    name: 'SUBSCRIBER_ABSENT',
    value: 'SUBSCRIBER_ABSENT',
  },
  {
    name: 'CALL_REJECTED',
    value: 'CALL_REJECTED',
  },
  {
    name: 'NUMBER_CHANGED',
    value: 'NUMBER_CHANGED',
  },
  {
    name: 'REDIRECTION_TO_NEW_DESTINATION',
    value: 'REDIRECTION_TO_NEW_DESTINATION',
  },
  {
    name: 'EXCHANGE_ROUTING_ERROR',
    value: 'EXCHANGE_ROUTING_ERROR',
  },
  {
    name: 'DESTINATION_OUT_OF_ORDER',
    value: 'DESTINATION_OUT_OF_ORDER',
  },
  {
    name: 'INVALID_NUMBER_FORMAT',
    value: 'INVALID_NUMBER_FORMAT',
  },
  {
    name: 'FACILITY_REJECTED',
    value: 'FACILITY_REJECTED',
  },
  {
    name: 'RESPONSE_TO_STATUS_ENQUIRY',
    value: 'RESPONSE_TO_STATUS_ENQUIRY',
  },
  {
    name: 'NORMAL_UNSPECIFIED',
    value: 'NORMAL_UNSPECIFIED',
  },
  {
    name: 'NORMAL_CIRCUIT_CONGESTION',
    value: 'NORMAL_CIRCUIT_CONGESTION',
  },
  {
    name: 'NETWORK_OUT_OF_ORDER',
    value: 'NETWORK_OUT_OF_ORDER',
  },
  {
    name: 'NORMAL_TEMPORARY_FAILURE',
    value: 'NORMAL_TEMPORARY_FAILURE',
  },
  {
    name: 'SWITCH_CONGESTION',
    value: 'SWITCH_CONGESTION',
  },
  {
    name: 'ACCESS_INFO_DISCARDED',
    value: 'ACCESS_INFO_DISCARDED',
  },
  {
    name: 'REQUESTED_CHAN_UNAVAIL',
    value: 'REQUESTED_CHAN_UNAVAIL',
  },
  {
    name: 'PRE_EMPTED',
    value: 'PRE_EMPTED',
  },
  {
    name: 'FACILITY_NOT_SUBSCRIBED',
    value: 'FACILITY_NOT_SUBSCRIBED',
  },
  {
    name: 'OUTGOING_CALL_BARRED',
    value: 'OUTGOING_CALL_BARRED',
  },
  {
    name: 'INCOMING_CALL_BARRED',
    value: 'INCOMING_CALL_BARRED',
  },
  {
    name: 'BEARERCAPABILITY_NOTAUTH',
    value: 'BEARERCAPABILITY_NOTAUTH',
  },
  {
    name: 'BEARERCAPABILITY_NOTAVAIL',
    value: 'BEARERCAPABILITY_NOTAVAIL',
  },
  {
    name: 'SERVICE_UNAVAILABLE',
    value: 'SERVICE_UNAVAILABLE',
  },
  {
    name: 'BEARERCAPABILITY_NOTIMPL',
    value: 'BEARERCAPABILITY_NOTIMPL',
  },
  {
    name: 'CHAN_NOT_IMPLEMENTED',
    value: 'CHAN_NOT_IMPLEMENTED',
  },
  {
    name: 'FACILITY_NOT_IMPLEMENTED',
    value: 'FACILITY_NOT_IMPLEMENTED',
  },
  {
    name: 'SERVICE_NOT_IMPLEMENTED',
    value: 'SERVICE_NOT_IMPLEMENTED',
  },
  {
    name: 'INVALID_CALL_REFERENCE',
    value: 'INVALID_CALL_REFERENCE',
  },
  {
    name: 'INCOMPATIBLE_DESTINATION',
    value: 'INCOMPATIBLE_DESTINATION',
  },
  {
    name: 'INVALID_MSG_UNSPECIFIED',
    value: 'INVALID_MSG_UNSPECIFIED',
  },
  {
    name: 'MANDATORY_IE_MISSING',
    value: 'MANDATORY_IE_MISSING',
  },
  {
    name: 'MESSAGE_TYPE_NONEXIST',
    value: 'MESSAGE_TYPE_NONEXIST',
  },
  {
    name: 'WRONG_MESSAGE',
    value: 'WRONG_MESSAGE',
  },
  {
    name: 'IE_NONEXIST',
    value: 'IE_NONEXIST',
  },
  {
    name: 'INVALID_IE_CONTENTS',
    value: 'INVALID_IE_CONTENTS',
  },
  {
    name: 'WRONG_CALL_STATE',
    value: 'WRONG_CALL_STATE',
  },
  {
    name: 'RECOVERY_ON_TIMER_EXPIRE',
    value: 'RECOVERY_ON_TIMER_EXPIRE',
  },
  {
    name: 'MANDATORY_IE_LENGTH_ERROR',
    value: 'MANDATORY_IE_LENGTH_ERROR',
  },
  {
    name: 'PROTOCOL_ERROR',
    value: 'PROTOCOL_ERROR',
  },
  {
    name: 'INTERWORKING',
    value: 'INTERWORKING',
  },
  {
    name: 'ORIGINATOR_CANCEL',
    value: 'ORIGINATOR_CANCEL',
  },
  {
    name: 'CRASH',
    value: 'CRASH',
  },
  {
    name: 'SYSTEM_SHUTDOWN',
    value: 'SYSTEM_SHUTDOWN',
  },
  {
    name: 'LOSE_RACE',
    value: 'LOSE_RACE',
  },
  {
    name: 'MANAGER_REQUEST',
    value: 'MANAGER_REQUEST',
  },
  {
    name: 'BLIND_TRANSFER',
    value: 'BLIND_TRANSFER',
  },
  {
    name: 'ATTENDED_TRANSFER',
    value: 'ATTENDED_TRANSFER',
  },
  {
    name: 'ALLOTTED_TIMEOUT',
    value: 'ALLOTTED_TIMEOUT',
  },
  {
    name: 'USER_CHALLENGE',
    value: 'USER_CHALLENGE',
  },
  {
    name: 'MEDIA_TIMEOUT',
    value: 'MEDIA_TIMEOUT',
  },
  {
    name: 'PICKED_OFF',
    value: 'PICKED_OFF',
  },
  {
    name: 'USER_NOT_REGISTERED',
    value: 'USER_NOT_REGISTERED',
  },
  {
    name: 'PROGRESS_TIMEOUT',
    value: 'PROGRESS_TIMEOUT',
  },
  {
    name: 'GATEWAY_DOWN',
    value: 'GATEWAY_DOWN',
  },
] as const;
