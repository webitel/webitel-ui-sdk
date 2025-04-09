import type { FilterName } from '../types/Filter';

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
  CreatedAtFrom: 'createdAtFrom',
  CreatedAtTo: 'createdAtTo',
  CaseStatus: 'status',
  CaseSource: 'source',
  CaseService: 'service',
  CaseAuthor: 'author',
  CaseReporter: 'reporter',
  CaseImpacted: 'impacted',
  CaseAssignee: 'assignee',
  ContactGroup: 'contactGroup',
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
} as const satisfies FilterName;

export type FilterOptionName = (typeof FilterOption)[keyof typeof FilterOption];

type ExtendedFilterOption = {
  name: FilterOption;
  notDeletable?: boolean;
};

export type FilterOption = FilterOptionName | ExtendedFilterOption;
