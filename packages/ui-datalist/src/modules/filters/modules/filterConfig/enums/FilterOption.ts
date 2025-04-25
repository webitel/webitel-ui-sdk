export const FilterOption = {
  Agent: 'agent',
  AmdResult: 'amdResult',
  Contact: 'contact',
  CallDirection: 'direction',
  Rated: 'rated',
  Gateway: 'gateway',
  Grantee: 'grantee',
  HangupCause: 'cause',
  Queue: 'queue',
  RatedBy: 'ratedBy',
  HasFile: 'hasFile',
  Score: 'score',
  Tag: 'tag',
  TalkDuration: 'talkDuration',
  Team: 'team',
  TotalDuration: 'totalDuration',
  HasTranscription: 'hasTranscription',
  User: 'user',
  Variable: 'variable',
  CreatedAt: 'createdAt',
  CaseStatus: 'status',
  CaseSource: 'source',
  CaseService: 'service',
  CaseAuthor: 'author',
  CaseReporter: 'reporter',
  CaseImpacted: 'impacted',
  CaseAssignee: 'assignee',
  ContactGroup: 'contactGroup',
  ContactLabel: 'label',
  ContactOwner: 'owner',
  CasePriority: 'priority',
  CaseCloseReasonGroups: 'closeReasonGroups',
  Rating: 'rating',
  CaseSla: 'sla',
  CaseSlaCondition: 'slaCondition',
  CaseReactionTime: 'reactionTime',
  CaseResolutionTime: 'resolutionTime',
  CaseActualReactionTime: 'actualReactionTime',
  CaseActualResolutionTime: 'actualResolutionTime',
  HasAttachment: 'hasAttachment',
  HasUser: 'hasUser',
} as const;

/**
 *
 * @description
 * any custom lookup fields or type extensions
 */
export type CustomFilterOption = string;

export type FilterOption =
  | (typeof FilterOption)[keyof typeof FilterOption]
  | CustomFilterOption;
